import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
    if(to.name === 'login'){
        next()
    } else {
        if(store.state.token){
            next()
        } else {
            next('/login')
        }
    }
})