<template>
    <section class="intro">
        <h1>Marshall Beard</h1>
        <p>Notes on software, data, and whatever I happen to be building.</p>
    </section>

    <ul class="post-list">
        <li v-for="post in posts" :key="post.slug">
            <RouterLink class="post-title" :to="`/posts/${post.slug}`">
                {{ post.title }}
            </RouterLink>
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <p v-if="post.description">{{ post.description }}</p>
        </li>
    </ul>

    <p v-if="!posts.length" class="empty">No posts yet.</p>
</template>

<script setup lang="ts">
    import {
        useHead,
    } from '@unhead/vue';
    import {
        posts,
    } from '../posts';

    function formatDate(date: string): string {
        if (!date) {
            return '';
        }

        // Parsed as UTC, or the date displays a day early west of Greenwich.
        return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            timeZone: 'UTC',
            year: 'numeric',
        });
    }

    useHead({
        meta: [
            {
                content: 'Notes on software, data, and whatever I happen to be building.',
                name: 'description',
            },
        ],
        title: 'Marshall Beard',
    });
</script>
