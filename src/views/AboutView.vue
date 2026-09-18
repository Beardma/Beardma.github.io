<template>
    <section class="prose">
        <h1>About</h1>
        <p>
            I'm Marshall Beard. I write here about the things I build and the
            problems I run into along the way.
        </p>
    </section>
</template>

<script setup lang="ts">
    import {
        useHead,
    } from '@unhead/vue';

    useHead({
        title: 'About — Marshall Beard',
    });
</script>
