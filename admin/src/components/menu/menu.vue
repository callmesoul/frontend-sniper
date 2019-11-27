<template>
    <div class="main-left flex flex-v">
        
        <div class="user">
            <div class="avatar">
                <a-dropdown :trigger="['click']">
                    <a-avatar class="ant-dropdown-link" href="#" :size="60" :style="{backgroundColor: '#000', verticalAlign: 'middle'}">
                        CallMeSoul
                    </a-avatar>
                        <a-menu slot="overlay">
                        <a-menu-item>
                            <a href="javascript:;" @click="logout">Log Out</a>
                        </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                
            </div>
        </div>
        <nav class="flex1 flex flex-v">
            <a-menu class="flex1"
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
        <a class="logo">
                <img src="../../assets/logo.svg" />
            </a>
    </div>
</template>

<script>
import { Menu, Icon, Avatar, Dropdown } from 'ant-design-vue'
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
        [Icon.name]: Icon,
        [Avatar.name]: Avatar,
        [Dropdown.name]: Dropdown
    },
    created(){
        this.routers = this.$router.options.routes[0].children;
    },
    methods:{
        menuClick(route){
            this.$router.push(route.name);
        },
        logout(){
            this.$store.commit('LOG_OUT');
            this.$router.replace({name: 'login'})
        }
    }
}
</script>
<style lang="scss" scoped src="./menu.scss"></style>