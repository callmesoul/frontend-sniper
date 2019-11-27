<template>
    <div class="main flex">
        <div class="main-left">
            <Menu></Menu>
        </div>
        <div class="main-body flex1 flex flex-v">
            <div class="main-body-warp flex1">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import Menu from '@/components/menu/menu.vue'
import { Dropdown, Menu as menu } from 'ant-design-vue'
export default {
    name: 'DefaultLayout',
    components: {
        Menu,
        [Dropdown.name]: Dropdown,
        [menu.name]: menu,
        [menu.Item.name]: menu.Item
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    .main{
        height: 100%;
        .main-left{
            
        }
        .main-body{
            border-left: 1px solid #404761;
            .main-body-header{
                border-bottom: 1px solid #404761;
                padding-left: 0.3rem;
                line-height: 0.6rem;
                background: #000000;
                .page-title{
                    font-weight: bold;
                    font-size: 0.18rem;
                }
                .user{
                    .ant-dropdown-link{
                        padding: 0 0.15rem;
                        display: block;
                        height: 0.6rem;
                        background: #ffffff;
                        color: #000;
                    }
                }
            }
            .main-body-warp{
                padding: 0.3rem;
            }
        }
    }
</style>