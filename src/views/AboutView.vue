<template>
    <section class="prose">
        <h1>About</h1>
        <p>
            I'm Marshall Beard. I wanted a place to record my thoughts and
            share my ideas. I mostly want to write about work culture and
            programming, but I also like video games like Team Fortress 2,
            War Thunder, and Overwatch. I read manga and tech article. Really
            breaking the programmer mold, aren't I?
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
