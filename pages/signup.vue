<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

useSeoMeta({
  title: 'Concord | Candidate Sign up'
})

definePageMeta({
    layout: 'authentication'
})
const router = useRouter()
const config = useRuntimeConfig()

var name = ref<String>('')
var email = ref<String>('')
var password = ref<String>('')
var phone_number = ref<String>('')
var load_check = ref('false')

const sendData = async() => {
    load_check.value = 'true'
    const user_data = {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "phone_number": phone_number.value
    }
    try{
        const response = await fetch(`${config.public.LOCAL_CANDIDATE_SIGNUP}`, {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            if (data.status === 'Passed') {
                console.log('Registered Successfully')
            } else{
                console.log(data.message)
            }
            load_check.value = 'false'
        }
        load_check.value = 'false'
    }
    catch(error:any) {
        console.log(error)
        load_check.value = 'false'
    }
}
</script>

<template>
    <div class="signuppage">
        <div class="page-title">
            <span>Sign up to start voting</span>
        </div>
        <div class="form">
            <div class="form-label-input">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="form-label-input">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email">
            </div>
            <div class="form-label-input">
                <label for="phone-number">Phone number</label>
                <input type="tel" name="phone-number" v-model="phone_number">
            </div>
            <div class="form-label-input">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <button @click="sendData" :disabled="load_check === 'true'">
                <span v-if="load_check === 'false'">Sign up</span>
                <Load v-if="load_check === 'true'" />
            </button>
        </div>
        <div class="question">
            <span>Already have an account? <NuxtLink to="/login" class="action-link">Log in Here</NuxtLink></span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.signuppage {
    display: grid;
    row-gap: 30px;
    margin: 0 auto;
    padding-bottom: 40px;
    .page-title {
        width: 330px;
        span {
            font-family: 'Orbit';
            font-size: 36px;
            color: #121212;
        }
    }
    .form {
        display: grid;
        row-gap: 20px;
        width: 330px;
        div {
            display: grid;
            row-gap: 10px;
            justify-items: left;
            align-content: start;
            label {
                font-family: 'Orbit';
                font-size: 16px;
                color: #121212;
            }
            input {
                border: 1.5px solid #121212;
                height: 22px;
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 10px;
                padding-right: 10px;
                width: 305px;
                outline: 0;
                border-radius: 50px;
                font-family: 'Orbit';
                font-size: 16px;
            }
        }
        button {
            margin-top: 10px;
            height: 32px;
            padding: 5px;
            width: 325px;
            background-color: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
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
    .question {
        display: flex;
        width: 330px;
        align-items: center;
        justify-content: center;
        span {
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
            .action-link {
                text-decoration-color: #121212;
                color: #121212;
            }
        }
    }
}
</style>