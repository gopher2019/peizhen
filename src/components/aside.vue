<template>
    <el-menu
        :style="{ width: !isCollapse ? '230px' : '64px' }"
        :default-active="active"
        class="aside-container"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
    >
        <p class="logo-lg">{{ isCollapse ? "SaHi" : "SaHi Agent" }}</p>
        <tree-menu :index="1" :menuData="menuData" />
    </el-menu>
</template>
<script setup>
import { reactive, computed } from "vue";
// import { useRouter } from 'vue-router'
import TreeMenu from "./treeMenu.vue";
import { useStore } from "vuex";

// const router = useRouter()
// const menuData = reactive(router.options.routes[0].children)
const menuData = computed(() => store.state.menu.routerList);
console.log(menuData, 'menuData')
const store = useStore();
const isCollapse = computed(() => store.state.menu.isCollapse);
const active = computed(() => store.state.menu.menuActive);
console.log(active);

const handleOpen = (key, keyPath) => {
    console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
    console.log(key, keyPath);
};
</script>
<style lang="less" scoped>
.aside-container {
    // min-width: 230px;
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
