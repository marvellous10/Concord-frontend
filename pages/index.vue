<script setup lang="ts">
import { useUserStore } from '../stores/user.store'
import { useRouter } from 'vue-router'
import { useAdminUserStore } from '../stores/adminuser.store'

const userstore = useUserStore()
const adminuserstore = useAdminUserStore()
const router = useRouter()

if (adminuserstore.access_token !== null) {
    adminuserstore.removeAdminUserSession()
    router.push('/')
}

const is_authenticated = computed(()=> userstore.access_token !== null)

useSeoMeta({
  title: 'Concord | Homepage'
})
</script>


<template>
    <div class="homepage-container">
        <div class="main-title">
            <span>Vote for your preferred candidate</span>
        </div>
        <div class="main-hero-icon">
            <svg viewBox="0 0 604 443" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="m462.42 412.74c-18.327-14.933 6.505-16.686 21.212-15.696v9.757l35.212 8.909c-11.172 5.233-38.097 11.964-56.424-2.97z" fill="#121212" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m558.72 403.84c-11.878 1.357-15.414-3.96-15.697-6.788h25.455c1.697 1.697 2.121 5.43-9.758 6.788z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m532 362.68c-13.151 0-20.363-0.849-30.969-1.697" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m542.18 367.78v40.726" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m511.63 369.9-28-2.121" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m524.78 374.14v41.151" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m524.36 416.14 17.818-7.212" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m500.6 360.99-16.97 6.788" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m483.21 368.2v39.03" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m482.78 406.8 41.575 9.334" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m532 363.53v-11.878" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m568.9 396.62v-41.151" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m588.84 341.9v45.818" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m568.9 397.47 19.939-9.757" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m588.84 341.47-44.969-1.697" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m532 351.66 11.879-11.879" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m568.9 355.05 19.515-12.727" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m568.9 396.62h-25.03" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m532.42 351.66 24.182 0.848" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m193.42 430.6c0.425-11.878 47.939-8.06 50.909-7.636v7.636l14.424 10.182c-21.919 0.565-65.672-0.679-65.333-10.182z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m311.36 429.33v-43.272" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m274.46 440.36v-47.514" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m243.91 429.33v-47.514" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m243.91 381.82 33.515-8.485" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m311.36 385.63-36.908 6.787" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m274.46 440.78 36.908-11.031" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m311.36 385.63-33.939-12.303" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m243.91 382.24 30.97 10.181" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m352.72 428.48c-7.806-13.575 17.111-15.555 30.545-14.848v9.758l43.696 5.09c-21.494 5.657-66.435 13.576-74.241 0z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m448.6 410.24-16.545 16.97" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m428.24 375.45-42.848-2.97" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m402.78 361.45 45.817 2.121" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m384.54 372.48-2.121 49.212" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m448.6 364.42v44.969" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m432.05 391.15v36.06" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m384.54 372.48 18.242-11.03" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m432.05 427.21-50.06-5.091" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m343.88 110.53c1.839-0.566 6.703-1.103 11.455 1.273" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m331.34 126.22c0 2.785-2.083 4.863-4.439 4.863s-4.439-2.078-4.439-4.863 2.083-4.864 4.439-4.864 4.439 2.079 4.439 4.864z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m379.71 134.71c0 2.785-2.084 4.863-4.44 4.863s-4.439-2.078-4.439-4.863c0-2.786 2.083-4.864 4.439-4.864s4.44 2.078 4.44 4.864z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m312.48 116.04c0.424-2.687 3.054-7.806 10.182-6.788" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m366.78 115.19c3.394-2.97 11.878-7.128 18.666 0" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m348.54 122.4c3.96 6.505 9.503 20.448 0 24.181l-4.667 1.697" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m332.42 161.44c0.99 2.687 4.751 7.127 11.879 3.394" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m278.1 128.03c0.675 5.101 2.087 12.385 4.868 19.87 2.747 7.396 6.865 15.08 13.009 21.03-12.729 2.171-36.753 7.887-54.395 18.356-10.313-5.481-24.592-16.202-34.742-30.999-10.367-15.116-16.385-34.41-9.59-56.784 6.836-22.51 19.74-34.941 33.022-41.405 13.338-6.4914 27.139-7.0004 35.706-5.4925l0.967 0.1702 0.543-0.8186c8.677-13.086 24.568-30.788 43.971-41.374 19.342-10.554 42.02-13.981 64.675 1.0677l0.765 0.5081 0.8-0.4502c6.58-3.7009 17.35-7.0971 28.211-5.321 10.738 1.7561 21.785 8.5998 29.066 25.81 7.22 17.066 2.931 30.624-5.369 40.762-8.33 10.175-20.722 16.901-29.657 19.974l-8.399 1.1453c-2.152-2.2726-5.814-4.7162-10.553-5.4766-5.07-0.8138-11.214 0.3251-17.861 5.3668-4.966-1.9542-12.148-5.6217-18.413-10.616-6.638-5.2911-11.994-11.869-12.938-19.264l-0.715-5.6007-2.159 5.2171c-0.826 1.9955-2.322 5.175-4.104 8.1757-1.729 2.9114-3.596 5.4264-5.258 6.6594-3.608 0.5478-8.699 2.54-12.957 6.8023-4.102 4.1058-7.37 10.256-7.854 19.07l-18.264-8.2003c-0.808-1.4888-1.887-3.0703-3.181-4.4234-1.421-1.4856-3.197-2.7938-5.252-3.2913-2.13-0.5157-4.392-0.117-6.586 1.5154-2.135 1.5894-4.173 4.317-6.092 8.4172-2.445 5.2244-2.994 9.8954-2.208 13.934 0.784 4.033 2.876 7.312 5.506 9.799 2.621 2.479 5.799 4.193 8.838 5.123 2.287 0.701 4.603 0.987 6.6 0.742z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m299.76 107.13-20.364-10.606" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m343.45 106.28c0 14.632-10.001 25.878-21.637 25.878s-21.636-11.246-21.636-25.878c0-14.633 10-25.879 21.636-25.879s21.637 11.246 21.637 25.879z" stroke="#121212" stroke-width="3"/>
                    <path d="m399.45 115.62c0 14.632-10.001 25.878-21.637 25.878s-21.636-11.246-21.636-25.878c0-14.633 10-25.879 21.636-25.879s21.637 11.246 21.637 25.879z" stroke="#121212" stroke-width="3"/>
                    <path d="m381.29 180.52-0.103-0.082-0.117-0.062-9.427-5.05c8.481-5.267 22.829-20.368 29.909-50.677 6.17 7.297 12.792 18.444 14.79 30.681 2.146 13.138-1.011 27.609-16.058 40.142l-18.994-14.952z" fill="#121212" stroke="#121212" stroke-width="3"/>
                    <path d="m281.94 106.28c-0.707-7.7784-9.758-26.303-19.515-8.9094-4.243 7.9184-7.297 24.86 14.424 29.272" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m274.72 103.31c-1.98 1.697-4.922 6.109-0.849 10.182" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m397.76 125.37c-2.376 13.576-7.637 25.873-13.152 33.515-3.449 4.779-9.036 10.811-16.16 16.069" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m278.97 126.65c-0.283 17.252 6.449 42.848 37.334 56.424 4.75 2.088 9.421 3.286 13.961 3.769" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m365.51 203.86c-6.788-1.697-13.292 3.819-15.697 6.788-1.273 2.687-1.867 7.976 5.939 7.636 9.758-0.424 12.727-14.424 24.182 8.061 9.163 17.988 9.757 53.312 8.909 68.727" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="m343.3 199.19c-2.213 4.808-4.011 13.83 6.511 11.454" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="m347.4 182.65c-5.94 2.546-14.553 11.709-11.159 17.819 0.424 0.706 1.697 2.036 3.394 1.696 0.743-0.148 1.954-1.442 3.671-2.969 3.183-2.833 8.105-6.469 14.995-5.091" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="m466.12 328.32c4.243-20.787 0.11-69.566-51.817-116.4l-34.363-30.121-21.637-11.454-4.241-0.849-16.121 3.818-1.698 1.697-5.515 10.182c-0.849 2.121 2.801 4.582 8.91 2.545" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="m298.06 171.62c-27.575 3.677-99.161 19.484-142.54 83.575-40.886 60.403 5.356 85.858 39.719 87.13" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="m2 350.81 191.33-9.333" stroke="#121212" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    <path d="M245.513 339.352L602 323.82" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m213.73 342.97c0.524 1.626 0.138 2.796-1.905 2.971-6.047 0.519-13.228-8.855-16.062-13.607" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m213.72 324.56c3.018 4.822 8.281 12.252 12.895 16.467-0.421 3.239-3.586 8.164-12.88 1.944-1.415-4.39-9.463-12.107-9.463-12.58" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m221.91 320.03c5.774 6.371 16.252 20.021 11.969 23.649-0.759 0.643-1.727 0.705-2.835 0.329-1.318-0.449-2.834-1.521-4.427-2.976-4.614-4.215-9.877-11.645-12.895-16.467" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m174.44 336.63c9.659-12.095 40.533-38.311 58.17-22.436 7.034 7.02 15.8 19.707 10.761 24.89-2.52 1.944-7.974-0.648-11.491-5.831" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                    <path d="m208.85 267.66c-6.081 4.809-15.612 17.309-5.091 28.849" stroke="#121212" stroke-linecap="round" stroke-width="3"/>
                </g>
            </svg>
        </div>
        <NuxtLink to="/login" class="login-container" v-if="is_authenticated == false">
            <div class="login">
                <span>Log in</span>
            </div>
        </NuxtLink>
        <NuxtLink to="/vote" class="login-container" v-else>
            <div class="login">
                <span>Go to vote Session</span>
            </div>
        </NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.homepage-container {
    display: grid;
    padding-bottom: 100px;
    width: 600px;
    margin: 0 auto;
    row-gap: 20px;
    text-align: center;
    justify-items: center;
    align-content: start;
    .main-title {
        width: 360px;
        margin: 0 auto;
        span {
            font-family: 'Orbit';
            font-size: 36px;
            color: #121212;
        }
    }
    .main-hero-icon {
        display: flex;
        width: 600px;
        height: 443px;
        svg {
            height: 100%;
            width: 100%;
        }
    }
    .login-container {
        display: flex;
        margin-top: 10px;
        text-decoration: none;
        div {
            display: flex;
            height: 48px;
            width: 290px;
            align-items: center;
            justify-content: center;
            background-color: #121212;
            border-radius: 50px;
            span {
                display: flex;
                font-family: 'Orbit';
                font-size: 20px;
                color: #FFFAFA;
                margin-top: -5px;
            }
        }
    }
}
@media only screen and (max-width: 460px) {
    .homepage-container {
        width: 100vw;
        margin: 0;
        padding: 0;
        .main-hero-icon {
            width: 100%;
            height: 315px;
        }
    }
}
</style>