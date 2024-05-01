<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAdminUserStore } from '../stores/adminuser.store';
import { useUserStore } from '../stores/user.store';

const userstore = useUserStore()
const adminuserstore = useAdminUserStore()
const router = useRouter()

if (adminuserstore.access_token !== null) {
    adminuserstore.removeAdminUserSession()
    router.push('/admin')
}
</script>

<template>
    <div class="auth-layout">
        <nav>
            <NuxtLink to="/" class="home-pointer">
                <div class="hero-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6">
                        <g>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </g>
                    </svg>
                </div>
                <div class="text">
                    <span>Concord</span>
                </div>
            </NuxtLink>
        </nav>
        <div class="body">
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.auth-layout {
    position: relative;
    display: grid;
    width: 98.5vw;
    justify-items: center;
    margin: 0 auto;
    nav {
        position: relative;
        top: 101px;
        display: flex;
        width: 350px;
        align-items: center;
        justify-content: left;
        .home-pointer {
            display: flex;
            column-gap: 10px;
            width: fit-content;
            height: fit-content;
            text-decoration: none;
            .hero-icon {
                height: 20px;
                width: 20px;
                svg {
                    width: 100%;
                    height: 100%;
                    stroke: #121212;
                }
            }
            .text {
                display: flex;
                span {
                    display: flex;
                    font-family: 'Orbit';
                    font-size: 24px;
                    margin-top: -5px;
                    color: #121212;
                }
            }

        }
    }
    .body {
        position: relative;
        top: 131px;
    }
}
@media only screen and (max-width: 460px) {
    .auth-layout {
        width: 100vw;
        .nav {
            top: 5vh;
        }
        .body {
            top: 20vh;
        }
    }
}
</style>