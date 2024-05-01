<script lang="ts" setup>
import { ref } from 'vue'
import { useAdminUserStore } from '../../../stores/adminuser.store';
import { useOverviewStore } from '../../../stores/overview.store'
import { useRouter } from 'vue-router'

const overviewstore = useOverviewStore()
const adminuserstore = useAdminUserStore()
const router = useRouter()
const config = useRuntimeConfig()


useSeoMeta({
  title: 'Concord | Admin Overview Code'
})

definePageMeta({
    layout: 'adminnavigation',
    middleware: 'adminauth'
})

var voting_code = ref('')
var load_check = ref('false')

const getOverview = async () => {
    load_check.value = 'true'
    const user_data = {
        "access_token": adminuserstore.access_token,
        "voting_code": voting_code.value
    }
    try {
        const response = await fetch(`${config.public.LOCAL_ADMIN_OVERVIEW}`, {
            method: 'POST',
            body: JSON.stringify(user_data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            const data = await response.json()
            if(data.status === 'Passed') {
                overviewstore.saveOverviewData(data.session_name, data.voting_code, data.position_count, data.votes_count, data.positions, data.position_winners)
                load_check.value = 'false'
                router.push('details/overview')
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
    <div class="code-page">
        <div class="code-page-title">
            <span >Enter voting code</span>
        </div>
        <div class="form">
            <input v-model="voting_code" type="text" name="voting-code">
            <button @click="getOverview">
                <span v-if="load_check == 'false'">Enter overview</span>
                <Load v-if="load_check == 'true'" />
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
        text-decoration: none;
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