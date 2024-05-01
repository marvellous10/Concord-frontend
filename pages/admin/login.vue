<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminUserStore } from '../../stores/adminuser.store';
import { useUserStore } from '../../stores/user.store';

const userstore = useUserStore()
const adminuserstore = useAdminUserStore()
const router = useRouter()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Concord | Admin Login'
})


definePageMeta({
    layout: 'adminauthentication'
})

const phone_number = ref<String>('')
const password = ref<String>('')
var load_check = ref('false')
const Login = async() => {
    load_check.value = 'true'
    const user_data = {
        "phone_number": phone_number.value,
        "password": password.value
    }
    try {
        const response = await fetch(`${config.public.LOCAL_ADMIN_LOGIN}`, {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            if (data.status === 'Passed') {
                adminuserstore.setAdminUserSession(data.message, data.display_name)
                load_check.value = 'false'
                router.push('/admin/details')
            }
        }
        load_check.value = 'false'
    }
    catch(error) {
        console.log(error)
        load_check.value = 'false'
    }
}
</script>

<template>
    <div class="loginpage">
        <div class="page-title">
            <span>Log in to create a session</span>
        </div>
        <div class="form">
            <div class="form-label-input">
                <label for="phone-number">Phone number</label>
                <input type="tel" name="phone-number" v-model="phone_number">
            </div>
            <div class="form-label-input">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <button @click="Login">
                <span v-if="load_check === 'false'">Log in</span>
                <Load v-if="load_check === 'true'" />
            </button>
        </div>
        <div class="question">
            <span>Don't have an account? <NuxtLink to="/admin/signup" class="action-link">Register Here</NuxtLink></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loginpage {
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