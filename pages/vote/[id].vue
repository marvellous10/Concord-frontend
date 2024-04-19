<script setup lang="ts">
import { ref, reactive } from 'vue';

const valueread = ref(null)

const printValue = (id) => {
    if (valueread.value === id) {
        valueread.value = null
    }else {
        valueread.value = id
    }
    console.log(valueread.value)
}

</script>

<template>
    <div class="voting-page">
        <div class="voting-page-title">
            <span>Select your preferred candidate for president</span>
        </div>
        <div class="choices">
            <div class="option" value="One" @click="printValue('1')" :class="{ 'selected': valueread === '1'}">
                <span>Candidate One</span>
            </div>
            <div class="option" value="Two" @click="printValue('2')" :class="{ 'selected': valueread === '2'}">
                <span>Candidate Two</span>
            </div>
        </div>
        <div class="back-next-buttons">
            <button>
                <span>Back</span>
            </button>
            <button>
                <span>Next</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.selected {
    background-color: #121212;
    span {
        color: #FFFAFA;
    }
}
.voting-page {
    width: 360px;
    display: grid;
    justify-items: center;
    align-content: start;
    row-gap: 20px;
    .voting-page-title {
        display: flex;
        width: 330px;
        justify-content: center;
        text-align: center;
        span {
            font-family: 'Orbit';
            font-size: 28px;
            color: #121212;
        }
    }
    .choices {
        display: grid;
        row-gap: 20px;
        div {
            cursor: pointer;
            border: 1.5px solid #121212;
            width: 350px;
            padding-left: 10px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: left;
            border-radius: 50px;
            span {
                display: flex;
                font-family: 'Orbit';
                font-size: 16px;
                margin-top: -5px;
            }

        }
    }
    .back-next-buttons {
        width: 360px;
        display: flex;
        justify-content: space-between;
        button {
            width: 175px;
            height: 32px;
            background-color: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            outline: 0;
            border-radius: 50px;
            span {
                display: flex;
                color: #FFFAFA;
                font-family: 'Orbit';
                font-size: 16px;
                margin-top: -5px;
            }
        }
    }
}
@media only screen and (max-width: 460px) {
    .voting-page {
        margin: 0 auto;
        position: relative;
        top: 15vh;
    }
}
</style>