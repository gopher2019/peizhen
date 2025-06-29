<template>
    <template v-for="(item, index) in props.menuData">
        <el-menu-item
            v-if="!item.children || item.children.length == 0"
            :index="`${props.index}-${item.meta.id}`"
            :key="index"
            @click="handleClick(item, `${props.index}-${item.meta.id}`)"
        >
            <el-icon size="20">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>
        <el-sub-menu
            v-else
            :index="`${props.index}-${item.meta.id}`"
            :key="index + 1"
        >
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- 这里必须要用span包裹，要不然有bug -->
                <span>{{ item.meta.name }}</span>
            </template>
            <tree-menu
                :index="`${props.index}-${item.meta.id}`"
                :menuData="item.children"
            />
        </el-sub-menu>
    </template>
</template>
<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const props = defineProps(["index", "menuData"]);
const store = useStore();
const router = useRouter();
// 点击菜单
const handleClick = (item, active) => {
    store.commit("addMenu", item.meta);
    store.commit("updateMenuActive", active);

    router.push(item.meta.path);
};
</script>
<style lang="less" scoped>
// .el-menu-item {
//   min-width: 225px;
// }
</style>
