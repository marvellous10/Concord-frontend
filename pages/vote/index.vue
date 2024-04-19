<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const pageContinue = async () => {
    router.push('/vote/123')
}

</script>

<template>
    <div class="vote-link-start-page">
        <div class="vote-start-title">
            <span>Click continue to start voting</span>
        </div>
        <div class="voting-info">
            <span>Voting session name for 2024</span>
        </div>
        <div class="vote-continue-button">
            <button @click="pageContinue">
                <span>Continue</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.vote-link-start-page {
    width: 360px;
    display: grid;
    align-content: start;
    row-gap: 20px;
    justify-items: center;
    .vote-start-title {
        display: flex;
        width: 330px;
        text-align: center;
        justify-content: center;
        span {
            font-family: 'Orbit';
            font-size: 32px;
            color: #121212;
        }
    }
    .voting-info {
        border: 1.5px solid #121212;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 42px;
        border-radius: 50px;
        span {
            display: flex;
            margin-top: -5px;
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
        }
    }
    .vote-continue-button {
        button {
            width: 360px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #121212;
            border: 0;
            outline:0;
            border-radius: 50px; 
            span {
                margin-top: -2px;
                font-family: 'Orbit';
                font-size: 16px;
                color: #FFFAFA;
            }
        }
    }
}
@media only screen and (max-width: 460px) {
    .vote-link-start-page {
        position: relative;
        top: 20vh;
        margin: 0 auto;
    }
}
</style>