<script lang="ts" setup>
function alertInfo() {
    _alert.Info({
        header: 'Title info',
        message: 'sub title info',
    })
}

function alertSuccess() {
    _alert.Success({
        header: 'Title success',
        message: 'sub title success',
    })
}

function alertWarning() {
    _alert.Warning({
        header: 'Title warning',
        message: 'sub title warning',
    })
}

function alertError() {
    _alert.Err({
        header: 'Title error',
        message: 'sub title error',
        url: 'https://www.google.com',
    })
}
</script>

<template>
    <Card>
        <template #content>
            <div flex gap-4>
                <Button label="Info" severity="info" @click="alertInfo()" />
                <Button label="Success" severity="success" @click="alertSuccess()" />
                <Button label="Warning" severity="warn" @click="alertWarning()" />
                <Button label="Danger" severity="danger" @click="alertError()" />
            </div>
        </template>
    </Card>
</template>
