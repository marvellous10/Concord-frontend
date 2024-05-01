<script lang="ts" setup>

</script>

<template>
  <div class="load-component">
    <span class="loader"></span>
  </div>
</template>


<style lang="scss" scoped>
.load-component {
    .loader {
        width: 20px;
        height: 20px;
        border: 2px solid #FFFAFA;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
}
</style>