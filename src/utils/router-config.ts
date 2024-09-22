import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts(routes),
    scrollBehavior() { return { top: 0 } },
})
/// Use AAA login ///
router.beforeEach(async (_to, _from, next) => {
    // const { user, isAccess } = useAuthStore()

    // if (!user && to.name === '/signin-oidc') {
    //     await authService.signInCallback()
    //     return next({ path: '/' })
    // }

    // if (user) {
    //     if (!isAccess(to.path) && to.name !== '/error403page')
    //         return next({ name: '/error403page' })

    //     return next()
    // }

    // await authService.signIn()

    return next()
})

// router.afterEach(() => {
//     const appStore = useAppStore()
//     appStore.isProgressLoading = false
// })

export default router
