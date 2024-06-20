<script lang="ts" setup>
import { ref } from "vue"
import { useOverviewStore } from "../../../stores/overview.store";
import { useAdminUserStore } from '../../../stores/adminuser.store';

const adminuserstore = useAdminUserStore()
const overviewstore = useOverviewStore()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Concord | Admin Overview'
})

definePageMeta({
    layout: 'adminnavigation',
    middleware: 'adminauth'
})

var load_check = ref(false)

var opensession = ref(overviewstore.open_session)
var isActive = ref<Boolean>()

if (opensession.value === true) {
    isActive.value = true
}else if(opensession.value === false) {
    isActive.value = false
}

const votecode = overviewstore.voting_code

const getOverviewDetails = async () => {
    const user_data = {
        "access_token": adminuserstore.access_token,
        "voting_code": votecode
    }
    try {
        const response = await fetch(`${config.public.LOCAL_ADMIN_OVERVIEW}`, {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            if(data.status === 'Passed') {
                overviewstore.saveOverviewData(data.session_name, data.open_session, data.voting_code, data.position_count, data.voters_count, data.positions, data.position_winners)
            }
        }
    }catch(errors) {
        console.log(errors)
    }
}

getOverviewDetails()

var message = ref<String|null>()

const togglesession = async () => {
    load_check.value = true
    if (isActive.value === true) {
        /*const admin_user_data = {
            "access_token": adminuserstore.access_token,
            "status": !isActive.value,
            "voting_code": overviewstore.voting_code
        }
        try {
            const response = await fetch(`${config.public.LOCAL_ADMIN_CHANGESTATUS}`, {
                method: 'POST',
                body: JSON.stringify(admin_user_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                if(data.status === 'Passed') {
                    message.value = 'Session is now closed'
                    isActive.value = false
                    load_check.value = false
                    getOverviewDetails()
                }else {
                    const data = await response.json()
                    if (data.status === 'Failed') {
                        load_check.value = false
                        return
                    }
                }
            }
        }catch(errors) {
            console.log(errors)
            load_check.value = false
        }*/
       return
    }else if (isActive.value === false) {
        const admin_user_data = {
            "access_token": adminuserstore.access_token,
            "status": !isActive.value,
            "voting_code": overviewstore.voting_code
        }
        try {
            const response = await fetch(`${config.public.LOCAL_ADMIN_CHANGESTATUS}`, {
                method: 'POST',
                body: JSON.stringify(admin_user_data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const data = await response.json()
                if(data.status === 'Passed') {
                    message.value = 'Session is now open'
                    isActive.value = true
                    load_check.value = false
                    getOverviewDetails()
                }
            }else {
                const data = await response.json()
                if (data.status === 'Failed') {
                    load_check.value = false
                    return
                }
            }
        }catch(errors) {
            load_check.value = false
            console.log(errors)
        }
    }
}

const copyText = () => {
    navigator.clipboard.writeText(votecode)
        .then(
            () => console.log('Copied'),
            err => console.error('Cannot copy:', err)
        )
}

var positions = overviewstore.positions
var position_winners = overviewstore.position_winners
const position_count = overviewstore.position_count
const voters_count = overviewstore.voters_count


</script>

<template>
    <div class="overview-page">
        <div class="detail-container-wrapper">
            <div class="container">
                <span>{{ position_count }} Positions</span>
            </div>
            <div class="container">
                <span>{{ voters_count }} Voters</span>
            </div>
        </div>
        <div class="code-container">
            <span>{{ votecode }}</span>
            <button class="copy" @click="copyText">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <g>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </g>
                </svg>
            </button>
        </div>
        <div class="toggle-session">
            <span>Turn the session on or off.</span>
            <button @click="togglesession" :disabled="load_check==true" :class="{'active': isActive}" class="toggle-button">
                <span class="toggle-switch">
                </span>
            </button>
        </div>
        <div class="winners">
            <span>Winners</span>
        </div>
        <div class="candidate-wrappers" v-for="(position, index) in positions" :key="position.id">
            <label for="candidate">{{ position.name }}</label>
            <div class="candidates-container">
                <div class="candidate" name="candidate" v-for="winner in position_winners[index]" :key="winner.id">
                    <span>{{ winner.name }}</span>
                    <span>{{ winner.voters_number }}</span>
                </div>
            </div>
        </div>
        <button class="cp-btn">
            <span>Copy Winners</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.overview-page {
    margin: 0 auto;
    width: 360px;
    display: grid;
    row-gap: 20px;
    .detail-container-wrapper {
        display: flex;
        width: 360px;
        justify-content: space-between;
        align-items: center;
        .container {
            width: 170px;
            height: 48px;
            border: 1.5px solid #121212;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                display: flex;
                font-family: 'Orbit';
                font-size: 16px;
                color: #121212;
            }
        }
    }
    .code-container {
        border: 1.5px solid #121212;
        border-radius: 50px;
        width: 340px;
        height: 32px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            font-family: 'Orbit';
            font-size: 16px;
            display: flex;
            color: #121212;
            margin-top: -2px;
        }
        button {
            border: 0;
            outline: 0;
            width: fit-content;
            height: fit-content;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
    .toggle-session {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            font-family: 'Orbit';
            font-size: 18px;
            color: #121212;
            margin-top: -3px;
        }

        .toggle-button {
            position: relative;
            padding: 2px;
            width: 60px;
            height: 28px;
            border: 1.5px solid #121212;
            background-color: transparent;
            border-radius: 50px;
            cursor: pointer;
            outline: none;
            transition: background-color 0.3s ease-in-out; 
            span {
                position: absolute;
                top: 3.5px;
                left: 1.5px;
                background-color: #121212;
                width: 24px;
                height: 24px;
                border-radius: 52px;
                transition: left 0.3s ease-in-out;
            }
        }
        .active {
            border: 0;
            outline: 0;
            background-color: #121212;
            transition: background-color 0.3s ease-in-out;
            span {
                background-color: #FFFAFA;
                right: 3px;
                top: 5px;
                left: calc(100% - 26px);
            }
        }
    }
    .winners {
        display: flex;
        width: 360px;
        justify-content: center;
        align-content: center;
        span {
            font-family: 'Orbit';
            font-size: 24px;
        }
    }
    .candidate-wrappers {
        display: grid;
        width: 360px;
        row-gap: 10px;
        label {
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
        }
        .candidates-container {
            display: grid;
            row-gap: 10px;
        }
        .candidate {
            display: flex;
            padding-right: 10px;
            padding-left: 10px;
            width: 340px;
            height: 32px;
            justify-content: space-between;
            align-items: center;
            border: 1.5px solid #121212;
            border-radius: 50px;
            span {
                display: flex;
                font-family: 'Orbit';
                font-size: 16px;
                color: #121212;
                margin-top: -3px;
            }
        }
    }
    .cp-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 360px;
        height: 32px;
        background-color: #121212;
        border: 0;
        outline: 0;
        border-radius: 50px;
        span {
            display: flex;
            font-family: 'Orbit';
            font-size: 16px;
            color: #FFFAFA;
            margin-top: -3px;
        }
    }
}
</style>