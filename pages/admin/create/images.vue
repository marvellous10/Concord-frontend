<script lang="ts" setup>
import { ref } from 'vue';
import { useAdminVoteSession } from '../../../stores/adminvotesession.store'
import { useRouter, useRoute } from 'vue-router'

const adminvotesession = useAdminVoteSession()
const router = useRouter()

useSeoMeta({
  title: 'Concord | Admin Create Positions'
})

definePageMeta({
    layout: 'adminnavigation',
    //middleware: 'adminauth'
})
</script>

<template>
    <div class="images-container">
        <div class="header">
            <span>Add images</span>
        </div>
        <div class="subheader">
            <span>You can only upload .png, .jpg and .webp images</span>
        </div>
        <div class="position-container">
            <div class="position-header">
                <span>President</span>
            </div>
            <div class="position-candidates">
                <div class="candidates-name"></div>
                <div class="picture-input-container">
                    <span>Please click here to upload a picture</span>
                    <input type="file" class="candidate-picture" accept=".png, .jpg, .webp">
                </div>
            </div>
        </div>
        <button>
            <span>Continue</span>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.images-container {
    
}
</style>