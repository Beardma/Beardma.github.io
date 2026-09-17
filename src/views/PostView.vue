
<template>
  <article v-if="post">
    <h1>{{ post.title }}</h1>
    <time :datetime="post.date">{{ post.date }}</time>
    <!-- safe: content is your own markdown, compiled at build time -->
    <div v-html="post.html" />
  </article>
  <p v-else>Post not found.</p>
</template>

<script setup lang="ts">
    import { 
        computed, 
        watchEffect,
    } from 'vue';
    import { 
        getPost,
    } from '../posts';

    const post = computed(() => {
        return getPost(props.slug);
    });
    const props = defineProps<{ slug: string }>()

    watchEffect(() => {
        return document.title = post.value ? `${post.value.title} — Marshall Beard` : 'Not found';
    })
</script>