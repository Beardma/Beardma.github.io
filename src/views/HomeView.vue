<template>
    <ul class="post-list">
        <li v-for="post in posts" :key="post.slug">
            <RouterLink :to="`/posts/${post.slug}`">{{ post.title }}</RouterLink>
            <time :datetime="post.date">{{ post.date }}</time>
            <p>{{ post.description }}</p>
        </li>
    </ul>
</template>

<script setup lang="ts">
    import { 
        posts,
    } from '../posts'
</script>