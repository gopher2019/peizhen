const state = localStorage.getItem('v3pz') ? localStorage.getItem('v3pz').menu : {
    isCollapse: false,
    selectMenu: [],
    routerList: [],
    menuActive:'1-1'
}

const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload) {
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    updateMenuActive(state, value) {
        state.menuActive = value
    },
    closeMenu(state, item) {
        const index = state.selectMenu.findIndex(val => val.name === item.name)
        state.selectMenu.splice(index, 1)
    },
    dynamicMenu(state, payload) {
        const modules= import.meta.glob('../views/**/**/*.vue')
        function routerSet(router) {
            router.forEach(route => {
                // 判断没有子菜单，拼接路由数据
                if (!route.children) {
                    const url = `../views${route.meta.path}/index.vue`;
                    route.component = modules[url]
                } else {
                    routerSet(route.children)
                }
            })
        }
        routerSet(payload)
        state.routerList = payload
    }
}

export default {
    state,
    mutations
}