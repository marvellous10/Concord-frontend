<script lang="ts" setup>
import { ref } from 'vue';
import { useAdminVoteSession } from '../../../stores/adminvotesession.store'
import { useRouter, useRoute } from 'vue-router'

import { uploadFileToS3, getFileUrl } from '../../../utils/s3';

const adminvotesession = useAdminVoteSession()
const router = useRouter()

useSeoMeta({
  title: 'Concord | Admin Create Positions'
})

definePageMeta({
    layout: 'adminnavigation',
    middleware: 'adminauth'
})

const load = ref(false)

const clickInput = (candidates_id: string) => {
    (document.getElementById('file-input-'+candidates_id) as HTMLInputElement).click()
}

var positions_list = adminvotesession.vote_positions

var position_check_list = ref<Map<string, any>[]>([])


for (let i=0; i<positions_list.length; i++) {
    var position_check_dict = {
        "name": "",
        "candidates": []
    }

    position_check_dict['name'] = positions_list[i]["name"]

    for (let j=0; j<positions_list[i]["candidates"].length; j++) {
        var candidates_check_dict = {
            "id": "",
            "error": false,
            "file": null as File | null,
            "preview": false
        }
        candidates_check_dict["id"] = positions_list[i]["candidates"][j]["id"]

        position_check_dict["candidates"].push(candidates_check_dict)
    }
    position_check_list.value.push(position_check_dict)
}



var error = ref(false)
var message = ref("")

const checkSize = (input: HTMLInputElement, file: File, index, candidate_id) => {
    const position_candidate_list = position_check_list.value[index]
    var candidate_index = 0;
    for (let i=0; i<position_candidate_list["candidates"].length; i++) {
        if (candidate_id === position_candidate_list["candidates"][i]["id"]) {
            candidate_index = i
            const file_size = file.size / 1024000
            if (file_size >= 5) {
                position_candidate_list["candidates"][i]["error"] = true
            } else {
                position_candidate_list["candidates"][i]["error"] = false
            }
        }
    }

    if (position_candidate_list["candidates"][candidate_index]["error"] == true) {
        message.value = 'The file is too large, it should be below 5mb'
        input.value = ''
    }
    return position_candidate_list["candidates"][candidate_index]["error"]
}

const handleFiles = async (event: Event, index: number, candidate_id: string) => {
    const input = event.target as HTMLInputElement;
    const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/webp', 'image/png']
    if (input.files) {
        const imageFile = input.files[0]
        if (!acceptedTypes.includes(imageFile.type)) {
            error.value = true
            message.value = 'Wrong document format'
            input.value = '';
            return
        }
        var size_check = checkSize(input, imageFile, index, candidate_id)

        if (size_check === true) {
            input.value = ''
            return
        }

        const imageFilename = imageFile.name
        const url = URL.createObjectURL(imageFile)

        searchandChangePictureUrl(index, candidate_id, imageFilename, url, imageFile)

        changePreview(index, candidate_id)

        input.value = ''

    }
}

const changePreview = (index: number, candidate_id: string) => {
    const position = position_check_list.value[index]
    for (let i=0; i<position["candidates"].length; i++) {
        if (position["candidates"][i]["id"] === candidate_id) {
            position["candidates"][i]["preview"] = true
        }
    }
}

const searchandChangePictureUrl = (index: number, candidate_id: string, file_name: string, file_path: string, file: File) => {
    const position_candidates = positions_list[index]["candidates"]
    for (let j=0; j<position_candidates.length; j++) {
        if (position_candidates[j]["id"] === candidate_id) {
            position_candidates[j]["picture_url"]["name"] = file_name
            position_candidates[j]["picture_url"]["url"] = file_path
            position_check_list.value[index]["candidates"][j]["file"] = file
        }
    }
}

const removefiles = (index: number, candidate_id: string) => {
    const position_candidates = positions_list[index]["candidates"]
    for (let i=0; i<position_candidates.length; i++) {
        if (position_candidates[i]["id"] === candidate_id) {
            position_candidates[i]["picture_url"]["name"] = ""
            position_candidates[i]["picture_url"]["url"] = ""
            position_check_list.value[index]["candidates"][i]["preview"] = false
        }
    }
}

const uploadFiles = async () => {
    const bucketName = "concordvotebucket"
    for (let i=0; i<position_check_list.value.length; i++) {
        for (let j=0; j<position_check_list.value[i]["candidates"].length; j++) {
            const upload_file = position_check_list.value[i]["candidates"][j]["file"]
            const key = `${adminvotesession.session_name}/${upload_file.name}`

            try {
                await uploadFileToS3(upload_file, bucketName, key)
                const url = await getFileUrl(bucketName, key)
                positions_list[i]["candidates"][j]["picture_url"]["url"] = url
            }catch (err) {
                console.error('Error uploading file: ', err)
            }
        }
    }
}


const continueToNextPage = async () => {
    load.value = true
    const session_name = adminvotesession.session_name

    try {
        await uploadFiles()
        adminvotesession.setPartialVoteSession(session_name, positions_list)
        router.push('../create/votecode')
        load.value = false
    }catch (err) {
        console.error("An error occurred: ", err)
        load.value = false
    }
}

</script>

<template>
    <div class="images-container">
        <div class="header">
            <span>Add images</span>
        </div>
        <div class="subheader">
            <span>You can only upload .png, .jpg, .jpeg and .webp images</span>
        </div>
        <div class="position-container" v-for="(position, index) in positions_list" :key="index">
            <div class="position-header">
                <span>{{ position["name"] }}</span>
            </div>
            <div class="position-candidates" v-for="(candidates, cindex) in position.candidates" :key="cindex">
                <div class="candidates-name"><span>{{ candidates.name }}</span></div>
                <div class="picture-input-container" @click="clickInput(candidates.id)" v-if="position_check_list[index].candidates[cindex].preview == false || position_check_list[index].candidates[cindex].error == true">
                    <span>Please click here to upload a picture</span>
                    <input type="file" :id="`file-input-${candidates.id}`" class="candidate-picture" name="fileinput" @change="handleFiles($event, index, candidates.id)" accept=".png, .jpeg, .jpg, .webp">
                </div>
                <div class="error" v-if="position_check_list[index].candidates[cindex].error == true"><span>{{ message }}</span></div>
                <div class="picture-preview" v-if="position_check_list[index].candidates[cindex].preview == true && position_check_list[index].candidates[cindex].error == false">
                        <NuxtImg class="picture" quality="80" :src="candidates.picture_url.url" densities="x1 x2" />
                        <div class="picture-text">
                            <span>{{ candidates.picture_url.name }}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#121212" class="size-6 close" @click="removefiles(index, candidates.id)">
                                <g>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </g>
                            </svg>
                        </div>
                </div>
            </div>
        </div>
        <button class="continue-btn" @click="continueToNextPage">
            <span v-if="load == false">Continue</span>
            <Load v-if="load == true" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.images-container {
    width: 360px;
    display: grid;
    align-content: start;
    justify-items: center;
    row-gap: 10px;
    margin: 0 auto;
    margin-top: -30px;
    padding-bottom: 30px;
    .header {
        text-align: center;
        span {
            font-family: 'Orbit';
            font-size: 32px;
            color: #121212;
        }
    }
    .subheader {
        text-align: center;
        span {
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
        }
    }
    .position-container {
        margin-top: 20px;
        display: grid;
        align-content: start;
        justify-items: left;
        row-gap: 10px;
        .position-header {
            span {
                font-family: 'Orbit';
                font-size: 22px;
                color: #121212;
            }
        }
        .position-candidates {
            display: grid;
            row-gap: 10px;
            width: 360px;
            align-content: start;
            justify-items: left;
            .candidates-name {
                span {
                    font-family: 'Orbit';
                    font-size: 16px;
                    color: #121212;
                }
            }
            .error {
                width: 360px;
                display: flex;
                align-content: center;
                transition: display 0.2s ease-in;
                span {
                    font-family: 'Orbit';
                    font-size: 16px;
                    margin-top: -5px;
                    color: #Cc0202
                }
            }
            .picture-input-container {
                border: 1.5px solid #121212;
                border-radius: 10px;
                width: 340px;
                padding: 0px 10px 0px 10px;
                min-height: 32px;
                display: flex;
                align-items: center;
                justify-content: left;
                transition: display 0.2s ease-in;
                cursor: pointer;
                input[type="file"] {
                    display: none;
                }
                span {
                    font-family: 'Orbit';
                    font-size: 16px;
                    color: #121212;
                    margin-top: -2px;
                }
            }
            .picture-preview {
                position: relative;
                border: 1.5px solid #121212;
                width: 355px;
                overflow: hidden;
                height: 200px;
                border-radius: 10px;
                display: flex;
                align-items: end;
                justify-content: center;
                transition: display 0.2s ease-in;
                .picture {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    max-height: 100%;
                    max-width: 100%;
                    object-fit: cover;
                    display: flex;
                    border-radius: 0px;
                }
                .picture-text {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 1.5px solid #121212;
                    background-color: #FFFAFA;
                    border-radius: 5px;
                    width: 345px;
                    height: 42px;
                    margin-bottom: 5px;
                    z-index: 10;
                    span {
                        font-family: 'Orbit';
                        font-size: 16px;
                        color: #121212;
                        width: 300px;
                        height: auto;
                        margin-left: 10px;
                        margin-top: -3px;
                    }
                    svg {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .continue-btn {
        margin-top: 20px;
        background-color: #121212;
        width: 360px;
        height: 32px;
        border: 0;
        outline: 0;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            color: #FFFAFA;
            font-family: 'Orbit';
            font-size: 16px;
            margin-top: -3px;
        }
    }
}
@media only screen and (max-width: 460px) {}
</style>