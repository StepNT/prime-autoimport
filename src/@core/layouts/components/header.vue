<script setup lang="ts">
import router from '@core/router'

const { mobile } = useDisplay()
const { logOut, user } = useAuthStore()
const { VITE_APP_NAME } = useEnv()
const layoutStore = useLayoutStore()
const iconDrawer = computed(() => {
    if (!mobile.value) {
        return layoutStore.state.rail ? 'mdi-menu-open' : 'mdi-menu-close'
    }
    else {
        return layoutStore.state.drawer ? 'mdi-menu-open' : 'mdi-menu-close'
    }
})
</script>

<template>
    <v-app-bar elevation="0" height="60" class="px-sm-4">
        <v-btn
            color="secondary"
            icon
            aria-label="sidebar button"
            :ripple="false"
            variant="plain"
            @click="layoutStore.toggleDrawer"
        >
            <v-icon class="animate-head-shake animate-duration-6s animate-count-infinite" :icon="iconDrawer" />
        </v-btn>
        <v-app-bar-title>
            <v-chip color="primary" @click="router.push('/')">
                {{ VITE_APP_NAME }}
            </v-chip>
        </v-app-bar-title>
        <v-spacer />
        <v-avatar size="32" class="ml-2">
            <img src="@/assets/images/favicon.ico" alt="avatar">
        </v-avatar>
        <v-card-subtitle>
            <div>
                <span>ชื่อผู้ใช้ : </span>
                ({{ user?.profile?.employee_code }}) {{ user?.profile?.name_th }}
            </div>
            <v-divider />
            <span>สาขา : </span>
            {{ user?.profile?.branch_name }} ({{ user?.profile?.branch_code }})
        </v-card-subtitle>
        <template #append>
            <v-btn
                font-semibold
                color="error"
                hover="animate-head-shake animate-count-infinite animate-duration-4s"
                :ripple="false"
                variant="plain"
                prepend-icon="mdi-logout"
                @click="logOut"
            >
                Logout
            </v-btn>
        </template>
    </v-app-bar>
</template>
