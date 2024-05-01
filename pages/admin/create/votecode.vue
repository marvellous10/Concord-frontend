<script lang="ts" setup>
useSeoMeta({
  title: 'Concord | Admin Create Vote code'
})

definePageMeta({
  layout: 'adminnavigation',
  middleware: 'adminauth'
})


import { ref } from 'vue'
import { useAdminVoteSession } from '../../../stores/adminvotesession.store'
import { useAdminUserStore } from '../../../stores/adminuser.store';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const adminvotesession = useAdminVoteSession()
const adminuserstore = useAdminUserStore()
const config = useRuntimeConfig()

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

var votecode = ref<String>('')

const generateCode = () => {
  const character_length = characters.length

  let chars = ''

  for (let i=0; i<6; i++) {
    chars += characters.charAt(Math.floor(Math.random() * character_length))
  }

  votecode.value = chars

}

var allowed_numbers_list = ref('')
var load_check = ref('false')
//const new_list: String[] = allowed_numbers_list.value.split(/, /).map((item: string) => item.trim())
//08051390091, 09049195356

const checkNumbers = async() => {
  load_check.value = 'true'
  const new_list: String[] = allowed_numbers_list.value.split(/, /).map((item: string) => item.trim())
  const voting_session_dict = {
    "session_name": adminvotesession.session_name,
    "code": votecode.value,
    "allowed_phone_numbers": new_list,
    "candidates_voted": [],
    "positions": adminvotesession.vote_positions
  }
  adminvotesession.setVoteSession(voting_session_dict)

  const vote_data = {
    "access_token": adminuserstore.access_token,
    "voting_data": voting_session_dict
  }
  try {
    const response = await fetch(`${config.public.LOCAL_ADMIN_VOTE}`, {
      method: 'POST',
      body: JSON.stringify(vote_data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.ok) {
      const data = await response.json()
      if (data.status === 'Passed') {
        router.push('../../code')
        load_check.value = 'false'
      }
    }
    load_check.value = 'false'
  }
  catch(error) {
    console.log(error)
  }
  load_check.value = 'false'
}

</script>


<template>
  <div class="voting-code-page">
    <div class="vc-title">
      <span>Add numbers and create voting code</span>
    </div>
    <div class="form">
      <div class="form-label-input">
        <label for="allowed-numbers">Numbers allowed to vote</label>
        <textarea class="candidates-textarea" name="allowed-numbers" v-model="allowed_numbers_list"></textarea>
      </div>
      <div class="form-label-input">
        <label for="votingcode">Voting code</label>
        <div class="votingcode" name="votingcode">
          <span>{{ votecode }}</span>
        </div>
      </div>
      <button class="generatecode-btn" @click="generateCode">
        <span>Generate voting code</span>
      </button>
    </div>
    <button class="continue-btn" @click="checkNumbers">
      <span v-if="load_check === 'false'">Continue</span>
      <Load v-if="load_check === 'true'" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.voting-code-page {
  width: 360px;
  margin: 0 auto;
  display: grid;
  row-gap: 30px;
  padding-bottom: 100px;
  .vc-title {
    display: flex;
    width: 360px;
    justify-content: center;
    align-items: center;
    text-align: center;
    span {
      font-family: 'Orbit';
      font-size: 36px;
      color: #121212;
    }
  }
  .form {
    display: grid;
    row-gap: 20px;
    width: 360px;
    .form-label-input {
      display: grid;
      row-gap: 10px;
      label {
        font-family: 'Orbit';
        font-size: 16px;
        color: #121212;
      }
      textarea {
        width: 340px;
        height: 62px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        outline: 0;
        border: 1.5px solid #121212;
        border-radius: 10px;
        resize: none;
      }
      .votingcode {
        border: 1.5px solid #121212;
        border-radius: 50px;
        width: 350px;
        padding-left: 10px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: left;
        span {
          display: flex;
          margin-top: -2px;
          font-family: 'Orbit';
          font-size: 16px;
        }
      }
    }
    .generatecode-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 360px;
      height: 32px;
      outline: 0;
      border: 0;
      border-radius: 50px;
      background-color: #121212;
      span {
        font-family: 'Orbit';
        font-size: 16px;
        display: flex;
        margin-top: -5px;
        color: #FFFAFA;
      }
    }
  }
  .continue-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 360px;
    height: 32px;
    outline: 0;
    border: 0;
    border-radius: 50px;
    background-color: #121212;
    span {
      font-family: 'Orbit';
      font-size: 16px;
      display: flex;
      margin-top: -5px;
      color: #FFFAFA;
    }
  }
}
</style>