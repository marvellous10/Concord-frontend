<script lang="ts" setup>
import { ref } from 'vue'

useSeoMeta({
  title: 'Concord | Admin Overview Code'
})

definePageMeta({
    layout: 'adminnavigation'
})

var voting_code = ref('')

</script>

<template>
    <div class="code-page">
        <div class="code-page-title">
            <span >Enter voting code</span>
        </div>
        <div class="form">
            <input v-model="voting_code" type="text" name="voting-code">
            <button>
                <span>Enter overview</span>
            </button>
        </div>
        <NuxtLink class="c-voting-session" to="create/positions">
            <span>Create Voting Session</span>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.code-page {
    margin: 0 auto;
    width: 360px;
    display: grid;
    row-gap: 30px;
    .code-page-title {
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
    .form {
        width: 360px;
        display: grid;
        row-gap: 20px;
        justify-items: center;
        input {
            display: flex;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 5px;
            padding-bottom: 5px;
            width: 340px;
            height: 22px;
            align-content: center;
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
            border: 1.5px solid #121212;
            outline: 0;
            border-radius: 50px;
        }
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #121212;
            border: 0;
            outline: 0;
            border-radius: 50px;
            width: 360px;
            height: 32px;
            span {
                display: flex;
                margin-top: -3px;
                font-family: 'Orbit';
                font-size: 16px;
                color: #FFFAFA;
            }
        }
    }
    .c-voting-session {
        border: 0;
        outline: 0;
        width: 360px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #121212;
        border-radius: 50px;
        span {
            display: flex;
            margin-top: -3px;
            font-family: 'Orbit';
            font-size: 16px;
            color: #FFFAFA;
        }
    }
}
@media only screen and (max-width: 460px)  {
    .code-page {
        position: relative;
        top: 20vh;
    }
}
</style>