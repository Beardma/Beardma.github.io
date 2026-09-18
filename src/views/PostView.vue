<template>
    <article v-if="post" class="post">
        <h1>{{ post.title }}</h1>
        <time :datetime="post.date">{{ post.date }}</time>

        <!-- safe: content is your own markdown, compiled at build time -->
        <div class="prose" v-html="post.html" />
    </article>

    <p v-else>Post not found.</p>

    <p class="back">
        <RouterLink to="/">&larr; All posts</RouterLink>
    </p>
</template>

<script setup lang="ts">
    import { 
        computed, 
        watchEffect,
    } from 'vue';
    import { 
        getPost,
    } from '../posts';

    const props = defineProps<{ slug: string }>();
    const post = computed(() => {
        return getPost(props.slug);
    });

    watchEffect(() => {
        document.title = post.value ? `${post.value.title} — Marshall Beard` : 'Not found';
    });
</script>
