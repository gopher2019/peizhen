<template>
    <el-menu
        :style="{width:'230px'}"
        active-text-color="#ffd04b"
        background-color="#545c64"
        default-active="2"
        class="aside-container"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
        <p class="logo-lg">SaHi Agent</p>

        <TreeMenu :menuData="menuData" :index="1" />

    </el-menu>
</template>

<script setup>
import TreeMenu from "./treeMenu.vue";
import {useRouter} from "vue-router";
import {reactive} from "vue";

const handleOpen = () => {}
const handleClose = () => {}

const router = useRouter()

const menuData = reactive(router.options.routes[0].children)

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