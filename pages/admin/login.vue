<script lang="ts" setup>

useSeoMeta({
  title: 'Concord | Admin Login'
})


definePageMeta({
    layout: 'adminauthentication'
})
</script>

<template>
    <div class="loginpage">
        <div class="page-title">
            <span>Log in to create a session</span>
        </div>
        <div class="form">
            <div class="form-label-input">
                <label for="phone-number">Phone number</label>
                <input type="tel" name="phone-number">
            </div>
            <div class="form-label-input">
                <label for="password">Password</label>
                <input type="password" name="password">
            </div>
            <button>
                <span>Log in</span>
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