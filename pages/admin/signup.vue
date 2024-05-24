<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'Concord | Admin Sign up'
})


definePageMeta({
    layout: 'adminauthentication'
})

const name = ref<String>('')
const email = ref<String>('')
const phone_number = ref<String>('')
const password = ref<String>('')
var load_check = ref('false')
const error = ref(false)
const message = ref('')

const signUp = async() => {
    load_check.value = 'true'
    if (name.value.length == 0 || email.value.length == 0 || phone_number.value.length == 0 || password.value.length == 0) {
        error.value = true
        message.value = 'Please fill in all fields'
        load_check.value = 'false'
        return
    }

    if (password.value.length <=7 ) {
        error.value = true
        message.value = 'Password should be at least 8 characters'
        load_check.value = 'false'
        return
    }

    const symbols = ['!', '@', '(', ')', '%', '&'];
    var symbol_check = null as Boolean | null;
    for (let i=0; i<symbols.length; i++) {
        for (let j=0; j<password.value.length; j++) {
            if (symbols[i] == password.value[j]) {
                symbol_check = true
                break
            }
            else {
                symbol_check = false
            }
        }
        if (symbol_check === true) {
            break
        }
    }
    if (symbol_check != true) {
        error.value = true
        message.value = 'Include a symbol: !, @, (, ), %, & in password'
        load_check.value = 'false'
        return
    }
    const user_data = {
        "name": name.value,
        "email": email.value,
        "phone_number": phone_number.value,
        "password": password.value
    }
    try {
        const response = await fetch(`${config.public.LOCAL_ADMIN_SIGNUP}`, {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            if (data.status === 'Passed') {
                router.push('login')
                load_check.value = 'false'
            }
        }else {
            const data = await response.json()
            if (data.status === 'Failed') {
                error.value = true
                message.value = data.message
                load_check.value = 'false'
            }
        }
    }
    catch(err) {
        console.log(err)
        error.value = true
        message.value = 'An error occurred, please try again'
        load_check.value = 'false'
    }
}
</script>

<template>
    <div class="signuppage">
        <div class="page-title">
            <span>Sign up to create a session</span>
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
            <div class="error-message" v-if="error == true">
                <span>{{ message }}</span>
            </div>
            <button :disabled="load_check === 'true'" @click="signUp">
                <span v-if="load_check === 'false'">Sign up</span>
                <Load v-if="load_check === 'true'" />
            </button>
        </div>
        <div class="question">
            <span>Already have an account? <NuxtLink to="/admin/login" class="action-link">Log in Here</NuxtLink></span>
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
        .error-message {
            background-color: rgb(255,0,56, 0.1);
            margin-top: 10px;
            border: 1.5px solid #fe2712;
            border-radius: 50px;
            height: 32px;
            justify-items: center;
            align-content: center;
            span {
                margin-top: -3px;
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