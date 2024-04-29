<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminVoteSession } from '../../stores/adminvotesession.store'
import { useRouter, useRoute } from 'vue-router'

const adminvotesession = useAdminVoteSession()
const router = useRouter()

useSeoMeta({
  title: 'Concord | Voting code'
})

definePageMeta({
    layout: 'adminnavigation'
})

const session_code = adminvotesession.vote_session
const votecode = session_code["code"]


const copyText = () => {
    navigator.clipboard.writeText(votecode.value)
        .then(
            () => console.log('Copied'),
            err => console.error('Cannot copy:', err)
        )
}

const continueToNextPage = () => {
    router.push('details/')
}

</script>

<template>
    <div class="code-page">
        <div class="code-main-title">
            <span>You've successfully created a session</span>
        </div>
        <div class="code-sub-title">
            <span>Copy and share your voting code with others to allow them vote</span>
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
        <div class="code-reminder">
            <span>Only numbers submitted are allowed to vote</span>
        </div>
        <button class="continue-btn" @click="continueToNextPage">
            <span>Continue</span>
        </button>
    </div>
</template>


<style lang="scss" scoped>
.code-page {
    width: 360px;
    margin: 0 auto;
    display: grid;
    row-gap: 30px;
    .code-main-title {
        display: flex;
        width: 360px;
        justify-content: center;
        text-align: center;
        span {
            font-family: 'Orbit';
            font-size: 36px;
            color: #121212;
        }
    }
    .code-sub-title {
        display: flex;
        justify-content: center;
        text-align: center;
        width: 360px;
        span {
            font-family: 'Orbit';
            font-size: 24px;
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
    .code-reminder {
        display: flex;
        border: 1.5px solid #121212;
        border-radius: 50px;
        width: 360px;
        height: 32px;
        justify-content: center;
        align-items: center;
        span {
            font-family: 'Orbit';
            font-size: 16px;
            display: flex;
            margin-top: -5px;
            color: #121212;
        }
    }
    .continue-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 360px;
        height: 32px;
        outline: 0;
        border: 0;
        border-radius: 50px;
        background-color: #121212;
        span {
            font-family: 'Orbit';
            font-size: 16px;
            display: flex;
            margin-top: -5px;
            color: #FFFAFA;
        }
    }
}
</style>