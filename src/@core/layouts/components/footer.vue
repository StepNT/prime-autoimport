<script setup lang="ts">
const { VITE_APP_Version } = useEnv()
</script>

<template>
    <v-footer class="footer px-0">
        <v-row justify="center" no-gutters>
            <v-col cols="6" />
            <v-col class="text-right" cols="6">
                <p class="text-caption mb-0">
                    ©TCRB version {{ VITE_APP_Version }}
                </p>
            </v-col>
        </v-row>
    </v-footer>
</template>
