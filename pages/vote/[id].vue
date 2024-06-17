<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user.store'
import { useSelected } from '../../stores/selected.store'


definePageMeta({
    middleware: 'candidateauth'
})


const userstore = useUserStore()
const selected = useSelected()
const router = useRouter()
const route = useRoute()

const id = route.params.id

var candidates_list = []
var positions_list:[] = userstore.voting_details['positions']
var positions = '' as String
var page_index = ref(selected.page_index)
const length_positions = positions_list.length

for (let i=0; i<positions_list.length; i++) {
    if (id === positions_list[i]['id']) {
        positions = positions_list[i]['name']
        break
    }else {
        continue
    }
}

useSeoMeta({
  title: `Concord | ${positions}`
})

for (let i=1; i<positions_list.length;i++) {
    selected.addPagelist(positions_list[i]['id'])
}
var id_check
for (let i=0; i<positions_list.length;i++) {
    if (id === positions_list[i]['id']) {
        id_check = id
        for (let j=0; j<positions_list[i]['candidates'].length; j++) {
            const cand_dict = {
                "id": "",
                "name": "",
                "picture_url": "",
            }
            cand_dict['id'] = positions_list[i]['candidates'][j]['id']
            cand_dict['name'] = positions_list[i]['candidates'][j]['name']
            cand_dict['picture_url'] = positions_list[i]['candidates'][j]['picture_url']['url']
            candidates_list.push(cand_dict)
        }
        break
    }else {
        continue
    }
}
if (id_check !== id) {
    router.push('/')
}



const valueread = ref<String|null>(null)

if (selected.selected.length > selected.page_index) {
    valueread.value = selected.selected[selected.page_index]
}

const printValue = (id) => {
    valueread.value = id
    if (selected.selected.length > selected.page_index) {
        selected.addSelectionWithIndex(valueread.value, selected.page_index)
    }else if (selected.selected.length <= selected.page_index) {
        selected.addSelection(valueread.value)
    }
}

const nextButton = () => {
    if (selected.selected.length > selected.page_index) {
        selected.addIndex()
        page_index.value = selected.page_index
        const index_id = positions_list[page_index.value]['id']
        router.push(`/vote/${index_id}`)
    }
}
const backButton = () => {
    selected.reduceIndex()
    page_index.value = selected.page_index
    const index_id = positions_list[page_index.value]['id']
    router.push(`/vote/${index_id}`)
}
const continueButton = () => {
    router.push('/closingpage')
}
</script>

<template>
    <div class="voting-page">
        <div class="voting-page-title">
            <span>Select your preferred candidate for {{ positions }}</span>
        </div>
        <div class="choices">
            <div class="option" value="One" v-for="(candidate, index) in candidates_list" :key="candidate.id" @click="printValue(candidate.id)">
                <NuxtImg class="image" :src="candidate.picture_url" quality="80" />
                <div class="c-name" :class="{ 'selected': valueread === candidate.id}">
                    <span>{{ candidate.name }}</span>
                </div>
            </div>
        </div>
        <div class="back-next-buttons">
            <button :disabled="page_index == 0" @click="backButton">
                <span>Back</span>
            </button>
            <button :disabled="page_index == length_positions-1" @click="nextButton">
                <span>Next</span>
            </button>
        </div>
        <button v-if="page_index == length_positions-1" @click="continueButton" class="con-btn">
            <span>Continue</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.voting-page {
    width: 360px;
    display: grid;
    justify-items: center;
    align-content: start;
    row-gap: 20px;
    padding-bottom: 30px;
    .voting-page-title {
        display: flex;
        width: 330px;
        justify-content: center;
        text-align: center;
        span {
            font-family: 'Orbit';
            font-size: 28px;
            color: #121212;
        }
    }
    .choices {
        display: grid;
        row-gap: 20px;
        div {
            cursor: pointer;
            position: relative;
            border: 1.5px solid #121212;
            width: 355px;
            height: 200px;
            display: flex;
            border-radius: 10px;
            overflow: hidden;
            align-items: end;
            justify-content: center;
            .image {
                position: absolute;
                height: 100%;
                width: 100%;
                max-height: 100%;
                max-width: 100%;
                object-fit: cover;
                display: flex;
                border-radius: 0px;
            }
            .c-name {
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
                transition: background-color 0.2s ease-in;
                span {
                    font-family: 'Orbit';
                    font-size: 16px;
                    color: #121212;
                    width: 300px;
                    height: auto;
                    margin-left: 10px;
                    margin-top: -3px;
                }
            }

        }
    }
    .back-next-buttons {
        width: 360px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        button {
            width: 175px;
            height: 32px;
            background-color: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            outline: 0;
            border-radius: 50px;
            span {
                display: flex;
                color: #FFFAFA;
                font-family: 'Orbit';
                font-size: 16px;
                margin-top: -5px;
            }
        }
    }
    .con-btn {
        border: 0;
        outline: 0;
        background-color: #121212;
        border-radius: 50px;
        height: 32px;
        width: 360px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            display: flex;
            margin-top: -3px;
            font-family: 'Orbit';
            font-size: 16px;
            color: #FFFAFA;
        }
    }
}
@media only screen and (max-width: 460px) {
    .voting-page {
        margin: 0 auto;
        position: relative;
        top: 1vh;
    }
}

.selected {
    background-color: #121212 !important;
    border: 1.5px solid #FFFAFA !important;
    transition: background-color 0.2s ease-in;
    span {
        color: #FFFAFA !important;
    }
}
</style>