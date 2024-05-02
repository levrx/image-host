import { createRouter, createWebHistory } from "vue-router"
import Home from "./pages/Home.vue"
import Block from "./pages/Block.vue"

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', name: 'Home', component: Home, meta: {
                title: 'Front Page'
            }
        },
        {
            path: '/block', name: 'Block', component: Block, meta: {
                title: 'Violating pictures'
            }
        },
        { path: '/:pathMatch(.*)*', redirect: '/' },
    ],
})

router.beforeEach((to, from, next) => {
    const { meta } = to
    if (meta && meta.title) {
        document.title = `${meta.title} | Telegraph-Image-Pages`
    }
    next()
})

