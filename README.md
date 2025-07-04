# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).



# 创建项目

vite官网地址

https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project

**创建vue3+vite的项目**

要求：

~~~js
Vite 需要 Node.js 版本 18+ 
~~~

创建命令：

~~~js
# yarn
yarn create vite peizhen --template vue

~~~

下载依赖

~~~js
# yarn
yarn install
~~~

启动项目

~~~js
yarn dev
~~~



~~~
import './style.css'
~~~


~~~js
<script setup>
    
</script>

<template>

</template>

<style scoped>

</style>
~~~


~~~js
yarn add less

yarn add vue-router

yarn add element-plus

yarn add @element-plus/icons-vue


在vite.config.js下

~~~js
export default defineConfig({
  plugins: [vue()],
  //这个resolve是添加的别名
  resolve:{
    alias:[
      {
        find: "@", replacement: "/src" 
      }
    ]
  }
})
~~~

引入重置样式文件和图片资源

把课件中的less文件夹和images文件夹，都放到src下的assets中

在main.js中引入

~~~js
import '@/assets/less/index.less'
~~~



#路由的创建

1.在src下创建router文件夹，在其中创建index.js文件

~~~js
//引入两个方法，第一个创建路由器对象，第二个是开启hash模式的方法
import { createRouter, createWebHashHistory } from 'vue-router'

//路由规则
const routes = [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue')
    }
  ]

const router = createRouter({
    //history设置路由模式
    history: createWebHashHistory(),
    routes
})

//把路由器暴露出去
export default  router
~~~

2.在src下创建views文件夹，并在其中创建Main.vue(组件需要默认的代码，不然会报错)

~~~js
<template>
<div>
	我是main组件
</div>
</template>

<script setup>
</script>

<style lang="less" scoped >
</style>
~~~

3.在main.js中 使用路由，这里我们把createApp(App)用一个变量接收

~~~js
import router from './router'

const app =createApp(App)
app.use(router).mount('#app')

~~~

4.在app.vue组件中放置路由出口

~~~js
<template>
  <router-view />      
</template>

//这个是app的样式，设置全屏展示，防止滚动条的出现
//注意，style上不要使用scoped
<style>
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
~~~



#整体布局的实现

引入element-plus和@element-plus/icons-vue

文档：

element-plus：https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5

@element-plus/icons-vue：https://element-plus.org/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87

~~~js
//这里ElementPlus我们使用完整引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//注册@element-plus/icons-vue图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
~~~

1.main组件的实现



2.创建菜单和头部组件


# 菜单组件的实现


~~~js

const list =ref([
      	{
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 'house',
          url: 'Home'
      	},
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User'
        },
        {
            path: 'other',
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'Page1'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'Page2'
                }
            ]
        }
])
const noChildren = computed(() => list.value.filter(item => !item.children))
const hasChildren =computed(() => list.value.filter(item => item.children))

const clickMenu=(item)=>{
    router.push(item.path)
}
</script>
~~~

样式

~~~less
<style lang="less" scoped >



</style>
~~~

# 编写header页面

在components下的CommonHeader.vue中

html

<template>

    <div class="header">
        
      <div class="l-content">
          
        <!-- 这个点击事件是控制菜单组件的收缩的-->
        <el-button size="small" @click="handleCollapse">
          <!-- 图标的展示,这里我们使用动态组件来展示图标-->
         <component class="icons" is="menu"></component>
        </el-button>
			
            <!-- 面包屑，separator是分隔符-->
        <el-breadcrumb separator="/" class="bread">
          <!-- 首页是一定存在的所以直接写死 -->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- if判断一定要加-->
          <el-breadcrumb-item v-if="current" :to="current.path" >{{
            current.label
          }}</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
      
        <!--右侧用户头像-->
      <div class="r-content">
        <el-dropdown>
          <span>
              <!--我们定义一个URl对象地址，这里是传入图片的名称-->
            <img :src="getImageUrl('user')"  class="user" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

    </div>

  </template>
~~~



样式

~~~css
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #333;
}
.icons{
    width: 20px;
    height: 20px;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
~~~

# 使用pinia

pinia官网：https://pinia.vuejs.org/zh/core-concepts/

下载

~~~js
yarn add pinia
~~~

在main.js中使用

~~~js
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
~~~

在src下创建stores文件夹，在其中创建index.js

~~~js
import { defineStore } from 'pinia'
import { ref } from 'vue'

//初始化state数据，这里我们使用一个函数来返回
function initState(){
  return {
    
  }
}
//第一个参数要求是一个独一无二的名字
//第二个参数可接受两类值：Setup 函数或 Option 对象。
export const useAllDataStore = defineStore('allData', (a) => {
   	  //在 Setup Store 中：
      //ref() 就是 state 属性
	  //computed() 就是 getters
	  //function() 就是 actions	
      const state=ref(initState())



      //需要把所有定义的state，getters，actions返回出去
      return {
        state
      }
})
~~~

# 菜单组件和头部组件联动

components下的CommonAside.vue

html中



js中

~~~js

~~~

在pinia中定义属性和方法

~~~js

~~~

components下的CommonHeader.vue

js

~~~js

~~~

# 首页

1添加路由

打开路由文件

~~~js

  
~~~

2.在views下创建Home.vue

3.在Main.vue中放置路由出口

~~~vue

~~~

4.编写Home.vue

html，左侧的用户卡片和table表格

~~~vue
<template>

  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
        
      <el-card shadow="hover">
        <div class="user">
          <img :src="getImageUrl('user')"  class="user" />
          <div class="user-info">
            <p>Admin</p>
            <p>超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2022-7-11</span></p>
          <p>上次登录的地点:<span>北京</span></p>
        </div>
      </el-card>
        
      <el-card shadow="hover" class="table" >
          
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
          
      </el-card>

    </el-col>
   
      
  </el-row>
</template>
~~~

js

~~~js
<script setup>

//这个tableData是假数据，等会我们使用axios请求mock数据
const tableData = ref([
    {
      name: "Java",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    },
    {
      name: "Python",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    }
])

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})




</script>
~~~

样式

~~~less
<style lang="less" scoped >

.home {
    height: 100%;
    overflow: hidden;
    .user {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .table{
    margin-top: 20px;
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .top-echart{
    height: 280px
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
      height: 260px;
    }
  }
}

</style>
~~~

# 封装axios

axios官网：https://www.axios-http.cn/docs/intro

下载

~~~js
yarn add axios
~~~

1.配置环境地址

在src下创建config文件夹，在其中创建index.js

~~~js
/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */


// 当前的环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  development: {
    baseApi: '/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
  pro: {
    baseApi: '//future.com/api',
    mockApi: 'https://mock.apifox.cn/m1/4068509-0-default/api',
  },
}

export default {
  env,
  mock:false,
  ...EnvConfig[env]
}
~~~

2.在src下创建api文件夹，在其中创建request.js

~~~js

~~~

3.定义请求方法

在api文件夹下创建api.js文件

~~~js
/**
 * 整个项目api的管理
 * 
 */
 import request from "./request"

 export default {
   // home组件 左侧表格数据获取
   getTableData() {
     return request({
       url: '/home/getTableData',
       method: 'get',
     })
   }
  
 }
~~~

4.设置全局可用的请求对象

在main.js中

~~~js
import api from '@/api/api'

app.config.globalProperties.$api = api
~~~



#mock拦截请求

mockjs官网：http://mockjs.com/

下载

~~~js
yarn add mockjs
~~~

1.在api文件夹下创建mock.js

Mock.mock官网介绍：https://github.com/nuysoft/Mock/wiki/Mock.mock()

~~~js
import Mock from 'mockjs'
import homeApi from './mockData/home'

// 拦截请求  第一个参数，是拦截的地址（这种是正则写法） 第二个是请求的方法 第三个是处理请求的方法
Mock.mock(/home\/getTableData/, "get",homeApi.getTableData)
~~~

2.定义处理请求的方法

在api文件夹下创建mockData文件夹，在其中创建home.js

~~~js
export default {
  getTableData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: "苹果",
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: "小米",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "三星",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "魅族",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ],
      },
    }
  }

}

~~~

3.使用mock

在main.js中

~~~
import '@/api/mock.js'
~~~



# 动态请求home页的table数据

在home页中

js

~~~js
import {onMounted,getCurrentInstance} from 'vue'
//这个proxy相当于组件对象        //getCurrentInstance它的作用是获取当前组件的实例对象。
const { proxy } = getCurrentInstance()

//请求tabledata数据的方法
const getTableData=async ()=>{
  const data = await proxy.$api.getTableData()
  tableData.value=data.tableData
}

onMounted(()=>{
    getTableData()
})
~~~

# 右侧订单统计卡片

在home页中

~~~

js

~~~js
const countData = ref([])
~~~

1.定义请求方法

在api下的api.js中



2.mock拦截



3.定义处理请求的方法

在api下的home.js中

~~~js
//也是在之前的 export default中添加
getCountData: () => {
    return {
      code: 200,
      data: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "SuccessFilled",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "StarFilled",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "GoodsFilled",
          color: "#5ab1ef",
        },
      ],
    };
  }
~~~

回到home.vue中

js

~~~js
const getCountData=async ()=>{
  const data = await proxy.$api.getCountData()
  countData.value=data
}
onMounted(()=>{
    getCountData()
})
~~~

# 三个echarts图表的展示

echarts官网https://echarts.apache.org/handbook/zh/get-started/

下载

~~~js
yarn add echarts
~~~



在home.vue中


1.定义请求方法，拿到图标的数据

在api下的api.js

~~~js
getChartData() {
     return request({
       url: '/home/getChartData',
       method: 'get',
     })
   },
~~~

2.mock拦截

~~~js
Mock.mock(/home\/getChartData/,"get", homeApi.getChartData)
~~~

3.定义处理请求方法

在api下的mockData下的home.js

~~~js
 getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            "2019-10-01",
            "2019-10-02",
            "2019-10-03",
            "2019-10-04",
            "2019-10-05",
            "2019-10-06",
            "2019-10-07",
          ],
          data: [
            {
              苹果: 3839,
              小米: 1423,
              华为: 4965,
              oppo: 3334,
              vivo: 2820,
              一加: 4751,
            },
            {
              苹果: 3560,
              小米: 2099,
              华为: 3192,
              oppo: 4210,
              vivo: 1283,
              一加: 1613,
            },
            {
              苹果: 1864,
              小米: 4598,
              华为: 4202,
              oppo: 4377,
              vivo: 4123,
              一加: 4750,
            },
            {
              苹果: 2634,
              小米: 1458,
              华为: 4155,
              oppo: 2847,
              vivo: 2551,
              一加: 1733,
            },
            {
              苹果: 3622,
              小米: 3990,
              华为: 2860,
              oppo: 3870,
              vivo: 1852,
              一加: 1712,
            },
            {
              苹果: 2004,
              小米: 1864,
              华为: 1395,
              oppo: 1315,
              vivo: 4051,
              一加: 2293,
            },
            {
              苹果: 3797,
              小米: 3936,
              华为: 3642,
              oppo: 4408,
              vivo: 3374,
              一加: 3874,
            },
          ],
        },
        videoData: [
          { name: "小米", value: 2999 },
          { name: "苹果", value: 5999 },
          { name: "vivo", value: 1500 },
          { name: "oppo", value: 1999 },
          { name: "魅族", value: 2200 },
          { name: "三星", value: 4500 },
        ],
        userData: [
          { date: "周一", new: 5, active: 200 },
          { date: "周二", new: 10, active: 500 },
          { date: "周三", new: 12, active: 550 },
          { date: "周四", new: 60, active: 800 },
          { date: "周五", new: 65, active: 550 },
          { date: "周六", new: 53, active: 770 },
          { date: "周日", new: 33, active: 170 },
        ],
      },
    };
  }
~~~

回到home.vue中

js

~~~js
import * as echarts from "echarts";
import {reactive} from 'vue'


//observer 接收观察器实例对象
const observer = ref(null)

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
})

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
})

//请求图表数据并渲染的方法
const getChartData = async () => {
    const {orderData,userData,videoData} = await proxy.$api.getChartData()
    //对第一个图表的xAxis和series赋值
    xOptions.xAxis.data=orderData.date
    xOptions.series = Object.keys(orderData.data[0]).map(val=>({
      name:val,
      data:orderData.data.map(item=>item[val]),
      type: "line"
    })
    )
    //one               echarts.init方法初始化ECharts实例，需要传入dom对象
    const OneEcharts = echarts.init(proxy.$refs["echart"])
    //setOption方法应用配置对象
    OneEcharts.setOption(xOptions)
    
	//对第二个图表的xAxis和series赋值
    xOptions.xAxis.data = userData.map((item) => item.date)
    xOptions.series = [
        {
          name: "新增用户",
          data: userData.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userData.map((item) => item.active),
          type: "bar",
        }
      ]
    //two
    const TwoEcharts = echarts.init(proxy.$refs["userEchart"])
    TwoEcharts.setOption(xOptions)
    
	//对第三个图表的series赋值
    pieOptions.series = [
        {
          data: videoData,
          type: "pie",
        },
      ]
    //three
    const ThreeEcharts = echarts.init(proxy.$refs["videoEchart"])
    ThreeEcharts.setOption(pieOptions);

    //ResizeObserver 如果监视的容器大小变化，如果改变会执行传递的回调
    observer.value = new ResizeObserver(entries => {
        OneEcharts.resize()
        TwoEcharts.resize()
        ThreeEcharts.resize()
    })
    //如果这个容器存在
    if (proxy.$refs["echart"]) {
        //则调用监视器的observe方法，监视这个容器的大小
      observer.value.observe(proxy.$refs["echart"]);
    }
}
~~~

js

~~~js
onMounted(()=>{
    getChartData()
})
~~~

!!!如果在展示图表后，控制台报了下面这个警告（**页面中的echarts图表缩放后在控制台就会出现以下提醒**）

这个错误就是因为打开控制台造成了缩放

~~~js
[Violation] Added non-passive event listener to a scroll-blocking <某些> 事件. Consider marking event handler as 'passive' to make the page more responsive. See <URL>
~~~



# 用户管理

1.创建路由

在router.js下的index.js中

~~~js
const routes = [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children:[
        {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
        },
        //添加用户管理
       {
        path: 'user',
        name: 'user',
        component: () => import('@/views/User.vue')
        }
       
      ]
    }
  ]
~~~

2.在views下创建User.vue

html

顶部的新增和搜索框

~~~js
<template>
      <div class="user-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="请输入">
            <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSerch">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

</template>
~~~

js

~~~js
<script setup>
import {reactive} from "vue";

const formInline = reactive({
  keyword: "",
})

const handleAdd = () => {
}

const handleSerch = () => {
}

</script>
~~~

css，这个是use页全部的样式

~~~less
<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}

.table {
  position: relative;
  height: 520px;
  .pager {
    position: absolute;
    right: 10px;
    bottom: 30px;
  }
  .el-table {
    width: 100%;
    height: 500px;
  }
}
.select-clearn{
    display:flex;
}
</style>
~~~

# 用户页的表格和分页器



~~~vue
  <div class="table">
      
    <el-table :data="list">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      
    <el-pagination
      size="small"
      background
      layout="prev, pager, next"
      :total="config.total"//数据总条数
      @current-change="changePage" //当页数改变时触发
      class="pager"
    />
      
  </div>
~~~

js

~~~js
import { ref } from "vue";

const list = ref([])
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 400,
  },
])
//其中total是数据总条数，page是当前的页数，设置name根据name进行条件搜索
const config = reactive({
  total: 0,
  page: 1,
  name: "",
})
const handleDelete =  (val) => {
}
const handleEdit =  (val) => {
}
const changePage =  (page) => {
}
~~~

1.定义用户数据请求接口

在api下的api.js

~~~js
getUserData(params) {
    return request({
      url: '/user/getUserData',
      method: 'get',
      data: params
    })
  },
~~~

2.mock拦截

~~~js
import userApi from './mockData/user'

Mock.mock(/user\/getUserData/,"get", userApi.getUserList)
~~~

3.在mockData下创建user.js

~~~js
import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 200
//模拟200条用户数据
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })
  )
}


export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList: config => {
      					  //limit默认是10，因为分页器默认也是一页10个
    const { name, page = 1, limit = 10 } = param2Obj(config.url)
   
    const mockList = List.filter(user => {
        //如果name存在会，根据name筛选数据
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
     //分页
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        list: pageList,
        count: mockList.length, //数据总条数需要返回
      }
    }
  },

}
~~~


~~~js

~~~

# 实现切换分页

User.vue中

js

~~~js
//这个方法之前定义过
const changePage = (page) => {
    //把点击的页数赋值给config.page，再重新请求用户数据
  config.page = page;
  getUserData();
}
~~~



# 用户搜索实现

User.vue中

js

~~~js
//这个方法之前定义过
const handleSerch = () => {
  //这里我们把搜索框的值赋值给config.name，再重新请求用数据
  config.name = formInline.keyword;
  getUserData();
}
~~~

# 用户删除实现

1.创建请求方法

在api下的api.js中

~~~js
deleteUser(params) {
    return request({
      url: '/user/deleteUser',
      method: 'get',
      data: params
    })
  },
~~~

2.mock拦截

~~~js
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser)
~~~

3.定义处理请求的方法

在mockData下的use.js中

~~~js
//在原来的export default 中添加

  /**
   * 删除用户
   * @param id
   * @return {*}
   */
  deleteUser: config => {
    const { id } = param2Obj(config.url)

    if (!id) {
      return {
        code: -999,
        message: '参数不正确'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },
~~~

回到User.vue中

~~~js
import {ElMessage,ElMessageBox} from "element-plus"

//这个方法之前定义过
const handleDelete =  (val) => {
    //如果选择确定，就会执行then中的方法
  ElMessageBox.confirm("你确定删除吗?").then(async ()=>{
      
    await proxy.$api.deleteUser({ id: val.id })
      //删除成功后弹出一个提示框
    ElMessage({
      showClose: true,
      message: "删除成功",
      type: "success",
    })
      //删除之后重新请求用户数据
    getUserData();

  })

}
~~~

# 用户新增

user.vue中

html

在class为table的容器下放置

~~~vue
<el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
       <!--需要注意的是设置了:inline="true"，
		会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn
		在css进行处理-->
    <el-form :inline="true"  :model="formUser" :rules="rules" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item class="select-clearn" label="性别" prop="sex">
            <el-select  v-model="formUser.sex" placeholder="请选择">
              <el-option label="男" value="1" />
              <el-option label="女" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item
          label="地址"
          prop="addr"
        >
          <el-input v-model="formUser.addr" placeholder="请输入地址" />
        </el-form-item>
      </el-row>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
~~~

js

~~~js
//控制对话框是否显示
const dialogVisible = ref(false)

//新增和编辑共用一个窗口，所以通过设置action区分
const action = ref("add")

const formUser = reactive({})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
  age: [
    { required: true, message: "年龄是必填项", trigger: "blur" },
    { type: "number", message: "年龄必须是数字" },
  ],
  sex: [{ required: true, message: "性别是必选项", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必选项" }],
  addr:[{ required: true, message: '地址是必填项' }]
})


//这个方法之前定义过
const handleAdd = () => {
    action.value="add"
    //打开对话窗
    dialogVisible.value=true
}

//对话框右上角的关闭事件
const handleClose = () => {
    //获取到表单dom，执行resetFields重置表单
    proxy.$refs["userForm"].resetFields()
    //关闭对话框
    dialogVisible.value=false
}

//对话框右下角的取消事件
const handleCancel = () => {
    proxy.$refs["userForm"].resetFields()
    dialogVisible.value=false
}
~~~

**确定新增用户**

1.新增用户请求方法

在api下的api.js

~~~js
addUser(params) {
    return request({
      url: '/user/addUser',
      method: 'post',
      data: params
    })
  },
~~~

2.mock拦截

~~~js
Mock.mock(/user\/addUser/,"post", userApi.createUser)
~~~

3.添加处理请求方法

在mockData下的use.js

~~~js
/**
   * 增加用户
   * @param name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  createUser: config => {
    const { name, addr, age, birth, sex } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      name: name,
      addr: addr,
      age: age,
      birth: birth,
      sex: sex
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },
~~~

user.vue中

js

~~~js
//格式化日期，格式化为：1997-01-02这种
const timeFormat = (time) => {
    var time = new Date(time);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    function add(m) {
        return m < 10 ? "0" + m : m;
    }
    return year + "-" + add(month) + "-" + add(date);
}

const onSubmit = () => {
    //执行userForm表单的validate进行规则校验，传入一个回调函数，回调函数会接受到一个是否校验通过的变量
    proxy.$refs["userForm"].validate(async (valid)=>{
        
        //如果校验成功
        if (valid) {
                //res用于接收添加用户或者编辑用户接口的返回值
                let res=null
                //这里无论是新增或者是编辑，我们都要对这个日期进行一个格式化
                //如果不是1997-01-02这种格式，使用timeFormat方法进行格式化
                formUser.birth=/^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth)
                //如果当前的操作是新增，则调用新增接口
                if (action.value == "add") {
                    res = await proxy.$api.addUser(formUser);
                }else if(action.value == "edit"){

                }
                //如果接口调用成功
                if(res){
                        //关闭对话框，重置表单，重新请求用户数据
                        dialogVisible.value = false;
                        proxy.$refs["userForm"].resetFields()
                        getUserData()
                }

		//如果校验失败
        }else {
          ElMessage({
            showClose: true,
            message: "请输入正确的内容",
            type: "error",
          })
        }

    })
}
~~~

# 用户编辑

1.用户编辑接口

在api下的api.js中

~~~js
editUser(params) {
    return request({
      url: '/user/editUser',
      method: 'post',
      data: params
    })
  },
~~~

2.mock拦截

~~~js
Mock.mock(/user\/editUser/, "post",userApi.updateUser)
~~~

3.处理请求方法

mockData下的user.js

~~~js
/**
   * 修改用户
   * @param id, name, addr, age, birth, sex
   * @return {{code: number, data: {message: string}}}
   */
  updateUser: config => {
    const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '编辑成功'
      }
    }
  }
~~~

user.vue中

js

~~~js
import {nextTick} from "vue";

const handleEdit =  (val) => {
    action.value="edit"
    dialogVisible.value=true
    
    nextTick(()=>{
        //因为在第一次显示弹窗的时候form组件没有加载出来，如果直接对formUser赋值，这个值会作为form表单的初始值
        //所以使用nextTick，赋值的操作在一个微任务中，这样就可以避免在from表单加载之前赋值
       
        Object.assign(formUser,{...val,sex:""+val.sex})
        //这里需要改变sex数据类型，是因为el-option的value有类型的校验
    })
}
//在之前的onSubmit方法中增加的代码
//如果是编辑
if(action.value == "edit"){
    res = await proxy.$api.editUser(formUser)
}
~~~

# 剩余页面的路由配置

路由

~~~js
const routes = [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children:[
        {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home.vue')
        },
       {
        path: 'user',
        name: 'user',
        component: () => import('@/views/User.vue')
        },
        //下面三个是新添加的路由
       {
          path: 'mall',
          name: 'mall',
           component: () => import('@/views/Mall.vue')
        },
        {
            path: 'page1',
            name: 'page1',
            component: () => import('@/views/Page1.vue')
        },
        {
            path: 'page2',
            name: 'page2',
            component: () => import('@/views/Page2.vue')
        }
          
      ]
    }
  ]
~~~

在views下创建Mall.vue,Page1.vue,Page2.vue



# Tag 标签组件

1.在components下创建CommonTab.vue

2.在components下的index.js进行暴露

~~~js
export {default as CommonTab} from "./CommonTab.vue"
~~~

3.在Main.vue中放置

~~~js
 <el-header>
     <common-header />
 </el-header>

<!--在el-header下，el-main上放置-->
<common-tab />

<el-main class="right-main">
      <router-view />
</el-main>


<script setup>
    						//引入CommonTab
import {CommonAside,CommonHeader,CommonTab} from "@/components"

</script>
~~~

CommonTab.vue中

html

~~~vue
<template>
    <div class="tags">
        <!--closable是否有关闭按钮,hoem标签不能关闭所以为false
			effect主题，找到当前路由对应的tab，设置'dark'高亮主题
		-->
      <el-tag
        :key="tag.name"
        v-for="(tag, index) in tags"
        :closable="tag.name !== 'home'"
        :effect="route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag, index)"
      >
        {{ tag.label }}
      </el-tag>
    </div>
  </template>
~~~

js

~~~js
<script setup>

import {computed} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import { useAllDataStore } from '@/stores'

const store=useAllDataStore()
const route =useRoute()
const router =useRouter()

const tags=computed(()=>{
         //这个在下面配置
    return store.state.tags
})

const changeMenu=(tag)=>{
    //单击tab时，联动面包屑
  store.selectMenu(tag)
    //跳转对应页面
  router.push(tag.name)
}

//关闭tab时触发
const handleClose=(tag,index)=>{
   
}

</script>
~~~

css

~~~less
<style lang="less" scoped>
.tags{
  margin: 20px 0 0 20px;
}
.el-tag{
  margin-right: 10px;
}
</style>
~~~

4.在pinia中定义tags

~~~js
//在初始化对象中添加tags
function initState(){
  return {
      //tags固定有一个home标签
    tags:[
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ]
  }
}
~~~

5.菜单联动tag标签

在store下的index.js中

```js
//在之前定义的selectMenu方法中
function selectMenu(val){
    if (val.name == 'home') {
      state.value.currentMenu = null
    }else {
      state.value.currentMenu = val
        
       //这里添加如果点击的不是home时，先找一下tags中是否存在点击的菜单
      let index=state.value.tags.findIndex(item => item.name === val.name)
       //如果不存在则添加到tags中
      index===-1?state.value.tags.push(val):""
    }
  }
```

6.完善关闭tab方法

在CommonTab.vue中

~~~js
//关闭tab时触发
const handleClose=(tag,index)=>{
    //这里执行pinia中的updateTags方法，把这个tab删除掉
  store.updateTags(tag)
    //只有当关闭的tab对应当前页面的时候，才需要做一些操作
  if(tag.name!==route.name) return

    //tags.length，这个长度是点击之前的tabs数量-1，因为上面我们删除了一个tab
    //如果关闭的是最后一个
  if(index===store.state.tags.length){
      //联动面包屑
    store.selectMenu(tags.value[index-1])
      //跳转到前一个tab
    router.push(tags.value[index-1].name)
  }else{
      //如果不是最后一个，则让删除后处于这个索引的tab进行联动
    store.selectMenu(tags.value[index])
    router.push(tags.value[index].name)
  }
}
~~~

7.在pinia中定义updateTags方法

~~~js
export const useAllDataStore = defineStore('allData', (a) => {
  
      function updateTags(tag){
              //找到要删除的tab索引，使用splice方法删除
            let index = state.value.tags.findIndex(item => item.name === tag.name)
            state.value.tags.splice(index, 1)
          }

      return {
        updateTags
      }
    
})
~~~

# 登录页

1.创建路由

~~~js
const routes = [
    //注意这个是一级路由，不是放到之前的children中
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    }
  ]
~~~

2.在views下创建Login.vue

html

~~~vue
<template>
    <el-form :model="loginForm" class="login-container">
      <h3>系统登录</h3>
        
      <el-form-item>
        <el-input
          type="input"
          placeholder="请输入账号"
          v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
        
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
        
      <el-form-item>
        <el-button type="primary" @click="login"> 登录 </el-button>
      </el-form-item>
        
    </el-form>
   
</template>
~~~

js

~~~js
<script setup>

import {reactive,getCurrentInstance} from 'vue'
import { useRouter } from 'vue-router';

const { proxy } = getCurrentInstance();
const router=useRouter()
const loginForm = reactive({
  username: 'admin',
  password: 'admin',
});

const login=async ()=>{
    const res = await proxy.$api.getMenu(loginForm);
    if(res){
      router.push("/home")
    }
}
</script>

~~~

css

~~~less
<style lang="less" scoped>
.login-container {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 180px auto;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
~~~

3.定义请求方法

在api的api.js中

~~~js
getMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      data: params
    })
}
~~~

4.mock拦截

~~~js
import permissionApi from './mockData/permission'

Mock.mock(/permission\/getMenu/, "post",permissionApi.getMenu)
~~~

5.创建拦截方法

在mockData下创建permission.js

~~~js
import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    //menuList用于后面做权限分配，也就是用户可以展示的菜单
    if (username === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User'
            },
            {
              path: 'other',
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'Page1'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'Page2'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          menuList: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'house',
              url: 'Home'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
              url: 'User'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
        
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
        
    }

  }
}
~~~

# 动态菜单和token

我们在用户登录成功后，根据用户权限的不同要展示不同的菜单

1.在pinia中定义menuList和修改方法以及token(**token比较简单就是一个字符串不需要格外的方法处理**)

~~~js
function initState(){
  return {
    menuList:[],
    token:""
  }
}

export const useAllDataStore = defineStore('allData', (a) => {
      function updateMenuList(val){
        state.value.menuList = val
  		}
    
         return {
            updateMenuList
          }
})

~~~

2.在登录成功后，修改menuList

Login.vue中

js

~~~js
import { useAllDataStore } from '@/stores'
const store=useAllDataStore()

const login=async ()=>{
    const res = await proxy.$api.getMenu(loginForm);
    if(res){
       //在这里执行updateMenuList，传入res.menuList
      store.updateMenuList(res.menuList)
      //直接修改token
      store.state.token=res.token
      router.push("/home")
    }
}
~~~

3.菜单组件，绑定动态菜单

CommonAside.vue中

~~~js
//把之前的list改成这样
const list =computed(()=>store.state.menuList)
~~~

4.这个时候我们可以发现一个问题，我登录了xiaoxiao这个用户，即使菜单中没有page1,但是我可以直接在地址栏中修改来进入这个路由。因为路由我们是写死的

下面我们用动态路由来解决这个问题

# 动态路由

对路由的添加通常是通过 `routes` 选项来完成的，但是在某些情况下，你可能想在应用程序已经运行的时候添加或删除路由

动态路由介绍：https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1

这里我们通过登录请求后返回的menuList做权限分配，添加动态路由

1.在pinia中添加 动态路由方法

其中我们使用了vite的最新版 动态导入：https://cn.vitejs.dev/guide/features.html#glob-import

~~~js
function initState(){
  return {
    routeList:[]
  }
}

export const useAllDataStore = defineStore('allData', (a) => {
		
                       //需要传递router对象进来
    	function addMenu(router){
            
            const menu=state.value.menuList
                        //这里**代表0或多个文件夹，*代表文件。就是把views下的文件全部导入
            const module =import.meta.glob('../views/**/*.vue')
            //这个是菜单格式化后的路由数组
            const routeArr=[]
            //格式化菜单路由
            menu.forEach(item => {
                   //如果菜单有children
                if(item.children){
                    		//把children遍历格式化
                    item.children.forEach(val => {
                        let url=`../views/${val.url}.vue`
                        				//这里通过url取出对应的组件
                        val.component=module[url]
                    })
               //需要注意的是我们只需要为item.children中的菜单添加路由，所以我们把它解构出来
                    routeArr.push(...item.children)
                }else{
                  let url=`../views/${item.url}.vue`
                  item.component=module[url]
                  routeArr.push(item)
                }
            })
            //遍历routeArr
            routeArr.forEach(item=>{
                //addRoute方法会返回一个函数，执行这个函数会把这个路由删除
                //这里我们把每一次router.addRoute添加路由的返回值收集起来，放到state中的routeList
                //addRoute第一个参数要添加子路由的路由name，第二个是一个路由记录
              state.value.routeList.push(router.addRoute("main",item))  
            })
            
          }
    
    
    	//return出去
         return {
            addMenu
          }
})

~~~

2.在login成功后执行动态路由方法

Login.vue中

~~~js
const login=async ()=>{
    const res = await proxy.$api.getMenu(loginForm);
    if(res){
      store.updateMenuList(res.menuList)
      store.state.token=res.token
      //在这里执行添加路由方法,并传入router
      store.addMenu(router)
      router.push("/home")
    }
}
~~~

3.删除掉之前写死的路由

~~~js
//只留下login和main
const routes = [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children:[
      ]
    }
  ]
~~~

# 持久化存储pinia中的数据，解决刷新后路由不存在。以及实现菜单，面包屑和tab刷新后不会改变状态

1.在pinia中持久化存储state的数据

~~~js
import { watch } from 'vue'


export const useAllDataStore = defineStore('allData', (a) => {
        
        //使用watch监听state
        watch(state, (newObj)=>{
 			//如果变化后的state中的token不存在，代表用户退出(一般退出后会清除token)，不需要持久化存储state了
            if(!newObj.token) return
                      //持久化存储state
            localStorage.setItem('store',JSON.stringify(newObj))
          },{ deep: true })//deep开启深度监听

         //在之前的代码上修改addMenu
         //加一个type参数判断是否是刷新
		function addMenu(router,type){
             //下面这段代码放到方法的最前面
            
             //如果是刷新的时候执行的，则从持久化中读取数据赋值给state
            if(type==="refresh"){
                //这个判断是看持久化数据是否存在，因为这个addMenu我们需要放到main.js中执行，第一次加载项目的时候，会执行但是因为没有持久化数据，所以不是刷新，直接return出去
              if(JSON.parse(localStorage.getItem('store'))){
                  //读取持久化数据，赋值给state
                state.value=JSON.parse(localStorage.getItem('store'))
                  //routeList保存的函数，存储的时候不能解析，其中的值就是null，这里重新赋值[]
                state.value.routeList=[]
              }else{
                return
              }
            }
    
        }
    
})
~~~

2.在main.js中执行

~~~js
import { useAllDataStore } from '@/stores'


app.use(pinia)

//这个动态路由的方法必须要在use(pinia)之后使用，因为这样才可以获取到pinia对象
//必须在use(router)之前使用，因为如果是刷新，useuse(router)后执行完会直接跳转路由，所以需要在他之前执行动态路由方法
const store=useAllDataStore()
store.addMenu(router,"refresh")

app.use(router).mount('#app')
~~~

# 解决菜单刷新后，选中菜单失去高亮样式

components中的CommonAside.vue

html

~~~vue
             //为el-menu添加一个默认高亮的属性，如某一个菜单的index和这个值一样就会高亮
<el-menu  :default-active="activeMenu">
</el-menu>
~~~

js

~~~js
import { useRoute } from 'vue-router'
const route=useRoute()
         				//获取到当前路由的path
const activeMenu =computed(() => route.path)
~~~

#解决退出登录后重新登陆后，菜单 tab还是之前退出登录的状态

1.在pinia中

~~~js
export const useAllDataStore = defineStore('allData', (a) => {
			
         //定义重置方法
        function clearn(){
             //把保存的删除路由方法都执行一遍
            state.value.routeList.forEach(item=>{
              if(item)item()
            })
            //重置state的数据
            state.value=initState()
            //删除本地缓存，因为这个clearn方法是用户退出执行的
            localStorage.removeItem('store')
          }
    
    //返回出去
    return {
        clearn
    }
})
~~~

2.在CommonHeader.vue头部组件中

js

~~~js
//之前定义过
const handleLoginOut=()=>{
  //执行重置方法
  store.clearn()
    
  router.push("/login")
}
~~~

# 路由守卫

如果不是在登录状态下，访问其他页面应该是重定向到login中

如果是在登录状态，访问不存在的页面应该定义到一个404页面

路由守卫官网：https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB

1.在main.js中

~~~js
 //getRoutes获得所有路由记录的完整列表。
 //这个方法判断要跳转的路由是否存在
function isRoute(to){
   return router.getRoutes().filter(item=>item.path===to.path).length>0
}

router.beforeEach((to, from) => {
     //如果要跳转的不是login,且token不存在(可以通过不存在token判断出用户未登录)
    if(to.path !== '/login'&&!store.state.token){
        //跳转到login
        return { name: 'login' }
    }
    //如果路由记录不存在
    if(!isRoute(to)){
        //跳转到404界面
        return {name: "404"}
    }
})
~~~

# 404页面

1.创建路由

~~~js
const routes = [
    //也是一级路由
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    }
  ]
~~~

2.在views下创建404.vue页面

~~~vue
<template>
    <div class="exception">
      <img :src="getImageUrl(404)" />
      <el-button class="btn-home" @click="goHome">回到上一个页面</el-button>
    </div>
</template>
  
<script setup>
import {useRouter} from 'vue-router'
const router =useRouter()

const getImageUrl = (img) => {
      return new URL(`../assets/images/${img}.png`, import.meta.url).href;
}

const goHome=()=>{
    //go方法：按指定方向访问历史。如果是正数则是路由记录向前跳转，如果是负数则是向后回退
    //这里我们回退两个页面到跳转前的页面
    router.go(-2)
}

</script>

<style lang="less">
.exception {
position: relative;
img {
    width: 100%;
    height: 100vh;
}
.btn-home {
    position: absolute;
    left: 50%;
    bottom: 100px;
    margin-left: -34px;
}
}
</style>
~~~





