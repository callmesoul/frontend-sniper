<template>
    <div class="main-left flex flex-v">
        <nav class="flex1">
            <a class="logo">
                <i class="logo-icon iconfont icon-frontend-sniper"></i>
                <span class="logo-text">
                    <div>Frontend</div>
                    <div>Sniper</div>
                </span>
            </a>
            <a-menu
                :defaultSelectedKeys="[$route.name]"
                :defaultOpenKeys="['sub1']"
                mode="inline"
                theme="dark"
                :inlineCollapsed="collapsed"
                >
                <template v-for="(route) in routers" >
                    <a-menu-item v-if="!route.children" :key="route.name" @click="menuClick(route)">
                        <a-icon :type="route.meta.icon" />
                        <span>{{route.meta.title}}</span>
                    </a-menu-item>
                    <a-sub-menu :key="route.name" v-else>
                        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
                        <a-menu-item key="5">Option 5</a-menu-item>
                        <a-menu-item key="6">Option 6</a-menu-item>
                        <a-menu-item key="7">Option 7</a-menu-item>
                        <a-menu-item key="8">Option 8</a-menu-item>
                    </a-sub-menu>
                </template>
            </a-menu>
        </nav>
    </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue'
export default {
    data(){
        return {
            routers: []
        }
    },
    components:{
        [Menu.name]: Menu,
        [Menu.Item.name]: Menu.Item,
        [Menu.SubMenu.name]: Menu.SubMenu,
        [Icon.name]: Icon
    },
    created(){
        this.routers = this.$router.options.routes[0].children;
    },
    methods:{
        menuClick(route){
            this.$router.push(route.name);
        }
    }
}
</script>
<style lang="scss" scoped src="./menu.scss"></style>