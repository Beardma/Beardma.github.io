<template>
    <section>
        <h1>404</h1>
        <p>That page doesn't exist.</p>
        <RouterLink to="/">Back to the blog</RouterLink>
    </section>
</template>

<script setup lang="ts">
    import {
        useHead,
    } from '@unhead/vue';

    useHead({
        title: 'Not found — Marshall Beard',
    });
</script>
