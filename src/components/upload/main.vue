<script setup lang="ts">
import type { FileUploadSelectEvent } from 'primevue'

const func = {
    onHandleFile: (event: FileUploadSelectEvent) => {
        console.log(event.files)
    },
}
</script>

<template>
    <div>
        <Card>
            <template #title>
                <div>
                    <Button severity="info" variant="text" label="Upload">
                        <template #icon>
                            <div i-carbon:fetch-upload-cloud animate-loop animate-header />
                        </template>
                    </Button>
                </div>
            </template>
            <template #subtitle>
                <FileUpload
                    url=""
                    accept=".xlsx, .xls"
                    :cancel-button-props="{ severity: 'secondary', label: 'Cancel' }"
                    :upload-button-props="{ severity: 'success', label: 'Upload' }"
                    :choose-button-props="{ severity: 'primary', label: 'Choose' }"
                    @select="func.onHandleFile"
                >
                    <template #content="{ files, uploadedFiles }">
                        <div v-if="files.length > 0">
                            <h5>Pending</h5>
                            <Message v-for="file in files" :key="file.name">
                                {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
                                <template #icon>
                                    <i class="pi pi-file" />
                                </template>
                            </Message>
                        </div>
                        <div v-if="uploadedFiles.length > 0">
                            <h5>Completed</h5>
                            <Message v-for="file in uploadedFiles" :key="file.name" severity="success">
                                {{ file.name }} - {{ (file.size / 1024).toFixed(2) }} KB
                                <template #icon>
                                    <i class="pi pi-file" />
                                </template>
                            </Message>
                        </div>
                    </template>
                    <template #empty>
                        <div class="flex flex-col items-center justify-center">
                            <i class="pi pi-cloud-upload !text-muted-color !border-2 !rounded-full !p-8 !text-4xl" />
                            <p class="mb-0 mt-6">
                                Drag and drop files to here to upload.
                            </p>
                        </div>
                    </template>
                </FileUpload>
            </template>
            <template #content />

            <template #footer />
        </Card>
    </div>
</template>
