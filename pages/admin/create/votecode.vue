<script lang="ts" setup>
useSeoMeta({
  title: 'Concord | Admin Create Vote code'
})

definePageMeta({
  layout: 'adminnavigation',
  //middleware: 'adminauth'
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

var allowed_numbers_list = ref<String>('')
var load_check = ref('false')
//const new_list: String[] = allowed_numbers_list.value.split(/, /).map((item: string) => item.trim())
//08051390091, 09049195356
var error = ref(false)
var message = ref('')

var new_list: String[];

const checkNumbers = async() => {
  load_check.value = 'true'
  new_list = allowed_numbers_list.value.split(/, /).map((item: string) => item.trim())
  console.log(new_list)

  if (new_list.length < 1) {
    error.value = true
    message.value = 'Fill in all fields'
    load_check.value = 'false'
    return
  }

  const voting_session_dict = {
    "session_name": adminvotesession.session_name,
    "code": votecode.value,
    "open_session": false,
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
    }else {
      const data = await response.json()
      if (data.status === 'Failed') {
        load_check.value = 'false'
        error.value = true
        message.value = data.message
      }
    }
  }
  catch(errors) {
    console.log(errors)
  }
  load_check.value = 'false'
}

const selectfile = () => {
  (document.getElementById('file-input') as HTMLInputElement).click();
}

import mammoth from 'mammoth';
import * as xlsx from 'xlsx';

var selectedfile = ref<File | null>(null);

const handlefiles = async (event:Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const acceptedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!acceptedTypes.includes(file.type)) {
      error.value = true
      message.value = 'Wrong document format'
      input.value = '';
      return
    }
    selectedfile.value = file
    await readfiles(file)
  }
}

const readfiles = async (file: File): Promise<void> => {
  const filetype = file.type
  if (filetype ===  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    await readExcelFile(file)
  }
  else if (filetype === 'application/msword') {
    await readDocFile(file)
  }
  else if (filetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    await readDocFile(file)
  } 
}

const readDocFile = async (file: File): Promise<void> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    allowed_numbers_list.value = result.value
  } catch (error) {
    console.error('Error reading Word file:', error);
  }
}
const readExcelFile = (file: File): Promise<void> => {
  return new Promise((resolve: () => void, reject: (this: FileReader, ev: ProgressEvent<FileReader>) => any) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = xlsx.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      var worksheet = ""
      allowed_numbers_list.value = ''

      for (let i = 2; i<Object.keys(workbook.Sheets[sheetName]).length-1; i++) {
        const letter = i;
        const letter_cell = "A" + letter;
        worksheet = "0" + workbook.Sheets[sheetName][letter_cell]['w']
        if (i+1 === Object.keys(workbook.Sheets[sheetName]).length-1) {
          allowed_numbers_list.value += worksheet;
        }else {
          allowed_numbers_list.value += worksheet + ', ';
        }
      }
      //const json = xlsx.utils.sheet_to_json(worksheet)
      //console.log('Excel file content: ', worksheet)
      resolve();
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

const removefile = (event:Event) => {
  (document.getElementById('file-input') as HTMLInputElement).value = ''
  selectedfile.value = null
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
      <div class="upload-files">
        <span class="upload-main-text">Upload your number file</span>
        <div class="upload-container">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="#121212" class="size-6 upload-svg-icon">
            <g>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </g>
          </svg>
          <span class="upload-text">Upload your files containing numbers</span>
          <input type="file" class="fileInput" id="file-input" @change="handlefiles" name="files" accept=".xlsx, .doc, .docx">
          <button class="upload-button" @click="selectfile"><span>Choose files</span></button>
        </div>
        <span class="upload-sub-text">Only .xlsx and .doc or .docx files are allowed, 5mb size.</span>
        <ul class="file-list" id="fileList" v-if="selectedfile !== null">
          <div v-if="selectedfile !== null">
            <span>{{ selectedfile.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="#121212" class="size-6 close" @click="removefile">
              <g>
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </g>
            </svg>
          </div>
        </ul>
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
    <div class="error-message" v-if="error == true">
      <span>{{ message }}</span>
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
        font-family: 'Orbit';
        font-size: 16px;
        color: #121212;
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
    .upload-files {
      width: 360px;
      display: grid;
      row-gap: 10px;
      .upload-main-text {
        font-family: 'Orbit';
        font-size: 16px;
        color: #121212;
      }
      .upload-container {
        border: 1.5px solid #121212;
        border-radius: 10px;
        width: 360px;
        height: 110px;
        display: grid;
        align-content: center;
        justify-items: center;
        row-gap: 10px;
        padding: 10px 0px 15px 0px;
        svg {
          display: flex;
          height: 38px;
          width: 30px;
        }
        .upload-text {
          font-family: 'Orbit';
          font-size: 16px;
        }
        input {
          display: grid;
          font-family: 'Orbit';
          font-size: 16px;
          margin: 0 auto;
          border: 1px solid black;
          width: 210px;
        }
        input[type="file"] {
          display: none;
        }
        .upload-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          padding: 2px 10px 2px 10px;
          height: 28px;
          border: 1.5px solid #121212;
          border-radius: 50px;
          background-color: transparent;
          transition: background 0.1s ease-in;
          span {
            font-family: 'Orbit';
            font-size: 16px;
            margin-top: -3px;
          }
        }
        .upload-button:active {
          background: #121212;
          span {
            color: #FFFAFA;
          }
        }
      }
      .upload-sub-text {
        font-family: 'Orbit';
        font-size: 16px;
        color: #121212;
        opacity: 0.8;
      }
      .file-list {
        border: 1.5px solid #121212;
        border-radius: 10px;
        width: 350px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 5px 2px 5px;
        transition: 0.2s ease-in-out;
        div {
          display: flex;
          align-items: center;
          width: 340px;
          height: 32px;
          justify-content: space-between;
          transition: 0.2s ease-in-out;
          span {
            font-family: 'Orbit';
            font-size: 16px;
            color: #121212;
          }
          svg {
            margin-top: 1px;
            width: 16px;
            height: 16px;
            display: flex;
            cursor: pointer;
          }
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
  .error-message {
    display: grid;
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