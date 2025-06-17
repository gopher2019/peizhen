<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        class="aside-container"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
        <p class="logo-lg">Agent</p>

        <TreeMenu />

    </el-menu>
</template>

<script setup>
import TreeMenu from "./treeMenu.vue";


const handleOpen = () => {}
const handleClose = () => {}



</script>


<style lang="less" scoped>
.aside-container {
    height: 100%;
    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>