<script lang="ts" setup>
import { ref } from 'vue';
import { useAdminVoteSession } from '../../../stores/adminvotesession.store'
import { useRouter, useRoute } from 'vue-router'

const adminvotesession = useAdminVoteSession()
const router = useRouter()

useSeoMeta({
  title: 'Concord | Admin Create Positions'
})

definePageMeta({
    layout: 'adminnavigation',
    middleware: 'adminauth'
})

var position_list = ref(['President'])
var session_name = ref<String>('')
var list_counter = ref(1)
var candidates = ref<String>('')
var candidates_list = ref<Array<[]>>([['Candidate One', 'Candidate Two']])


const addPosition = () => {
    if (position_list.value.length == list_counter.value) {
        position_list.value.push('')
        list_counter.value++
    }
}

const removePosition = (index:number) => {
    if (position_list.value.length > 1) {
        position_list.value.splice(index, 1)
        list_counter.value--
    }
}

const generateId = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var id_string = ref('')
    const character_length = characters.length

    let chars = ''

    for (let i=0; i<6; i++) {
        chars += characters.charAt(Math.floor(Math.random() * character_length))
    }

    id_string.value = chars

    return id_string.value

}


var positions: { name: string; id: string; candidates: any[]; }[] = []


const checkCandidates = async () => {
    const key = 'positions'
    for(let i=0; i<position_list.value.length;i++) {
        var position_dict = {
            "name": "",
            "id": "",
            "candidates": []
        }
        position_dict['name'] = position_list.value[i]
        position_dict['id'] = generateId()
        const new_list: String[] = candidates_list.value[i].split(/, /).map((item: string) => item.trim())
        var id_list: String[] = []
        for (let j=0; j<new_list.length; j++) {
            var candidates_dict = {
                "id": "",
                "name": "" as String,
                "voters": []
            }
            candidates_dict['id'] = generateId()
            if (candidates_dict['id'] in id_list) {
                candidates_dict['id'] = generateId()
            }else{
                id_list.push(candidates_dict['id'])
            }
            candidates_dict['name'] = new_list[j]

            position_dict['candidates'].push(candidates_dict)
        }
        positions.push(position_dict)
    }
    await adminvotesession.setPartialVoteSession(session_name.value, positions)
    router.push('votecode/')
}

</script>


<template>
    <div class="positions-page">
        <div class="positions-page-title">
            <span>Add positions</span>
        </div>
        <div class="form">
            <div class="form-label-input">
                <label for="session-name">Session Name</label>
                <input type="text" name="session-name" v-model="session_name">
            </div>
            <div class="position-wrapper" v-for="(position, index) in position_list" :key="index">
                <div class="form-label-input">
                    <label for="position">Position</label>
                    <input type="text" v-model="position_list[index]" name="position">
                </div>
                <div class="form-label-input">
                    <label for="candidates">Candidates for {{ position_list[index] }}</label>
                    <textarea class="candidates-textarea" v-model="candidates_list[index]"></textarea>
                </div>
                <button class="add-position-btn" @click="removePosition(index)">
                <span>Remove position</span>
            </button>
            </div>
            <button class="add-position-btn" @click="addPosition">
                <span>Add position</span>
            </button>
        </div>
        <button class="continue-btn" @click="checkCandidates">
            <span>Continue</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.positions-page {
    margin: 0 auto;
    width: 360px;
    display: grid;
    row-gap: 30px;
    padding-bottom: 100px;
    .positions-page-title {
        margin: 0 auto;
        width: 360px;
        display: flex;
        justify-content: center;
        span {
            font-family: 'Orbit';
            font-size: 36px;
            color: #121212;
        }
    }
    .form {
        width: 360px;
        display: grid;
        row-gap: 20px;
        .form-label-input {
            display: grid;
            row-gap: 10px;
            label {
                font-family: 'Orbit';
                font-size: 16px;
                color: #121212;
            }
            input {
                width: 340px;
                height: 22px;
                display: flex;
                border: 1.5px solid #121212;
                border-radius: 50px;
                outline: 0;
                font-family: 'Orbit';
                font-size: 16px;
                color: #121212;
                padding-left: 10px;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-right: 10px;
            }
        }
        .position-wrapper {
            display: grid;
            row-gap: 10px;
            .form-label-input {
                textarea {
                    min-height: 62px;
                    resize: none;
                    width: 340px;
                    padding-left: 10px;
                    padding-right: 10px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                    outline: 0;
                    border: 1.5px solid #121212;
                    border-radius: 10px;
                    font-family: 'Orbit';
                    font-size: 16px;
                }
            }
        }
        button {
            width: 360px;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #121212;
            border-radius: 50px;
            outline: 0;
            border: 0;
            span {
                display: flex;
                margin-top: -5px;
                font-family: 'Orbit';
                font-size: 16px;
                color: #FFFAFA;
            }
        }
    }
    .continue-btn {
        display: flex;
        width: 360px;
        height: 32px;
        align-items: center;
        justify-content: center;
        background-color: #121212;
        border: 0;
        outline: 0;
        border-radius: 50px;
        span {
            display: flex;
            font-family: 'Orbit';
            font-size: 16px;
            color: #FFFAFA;
            margin-top: -5px;
        }
    }
}
</style>