<script steup lang="ts">
</script>


<template>
    <div class="page-container">
        <nav>
            <NuxtLink to="/" class="logo-text-placeholder">
                <span>Concord</span>
            </NuxtLink>
            <div class="admin">
                <NuxtLink to="/admin" class="admin-text">
                    <span>Admin</span>
                </NuxtLink>
            </div>
            
            <NuxtLink to="/login" class="login-username-button-container">
                <div class="login-username-button">
                    <span>Log in</span>
                </div>
            </NuxtLink>
        </nav>
        <div class="body">
            <slot />
        </div>
    </div>
</template>


<style lang="scss">
.page-container {
    display: grid;
    justify-items: center;
    width: 98.5vw;
    position: relative;
    padding-bottom: 30px;
    nav {
        position: relative;
        top: 50px;
        margin: 0 auto;
        display: flex;
        border: 1.5px solid #121212;
        border-radius: 25px;
        width: 352px;
        height: 42px;
        justify-content: space-between;
        align-items: center;
        padding-left: 5px;
        padding-right: 4px;
        .logo-text-placeholder {
            display: flex;
            text-decoration: none;
            margin-top: -2px;
            span {
                display: flex;
                //margin-top: -2px;
                font-family: 'Orbit';
                font-size: 24px;
                color: #121212;
            }
        }
        .admin {
            display: flex;
            .admin-text {
                text-decoration: none;
                span {
                    font-family: 'Orbit';
                    font-size: 16px;
                    color: #121212;
                }
            }
            .router-link-active {
                text-decoration: underline;
                text-decoration-color: #121212;
            }
        }
        .login-username-button-container {
            width: fit-content;
            text-decoration: none;
            height: fit-content;
            .login-username-button {
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 86px;
                padding: 5px;
                height: 22px;
                border: 1.5px solid #121212;
                background-color: #121212;
                border-radius: 20px;
                span {
                    color: #FFFAFA;
                    font-family: 'Orbit';
                    font-size: 16px;
                    margin-top: -3px;
                }
            }
        }
    }
    .body {
        position: relative;
        top: 142px;
    }
}

@media only screen and (max-width: 460px) {
    .page-container {
        width: 100vw;
        justify-items: center;
        .body {
            display: flex;
            height: fit-content;
            width: 100%;
        }
    }
}
</style>