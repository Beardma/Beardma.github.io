<template>
    <article v-if="post" class="post">
        <h1>{{ post.title }}</h1>
        <time :datetime="post.date">{{ post.date }}</time>

        <!-- Safe: the markdown is ours, compiled at build time. -->
        <div class="prose" v-html="post.html" />
    </article>

    <p v-else>Post not found.</p>

    <p class="back">
        <RouterLink to="/">&larr; All posts</RouterLink>
    </p>
</template>

<script setup lang="ts">
    import {
        useHead,
    } from '@unhead/vue';
    import {
        computed,
    } from 'vue';
    import {
        getPost,
    } from '../posts';

    const props = defineProps<{ slug: string }>();
    const post = computed(() => {
        return getPost(props.slug);
    });

    // useHead rather than document.title, so crawlers see it in the static HTML.
    useHead({
        meta: [
            {
                content: computed(() => {
                    return post.value?.description ?? '';
                }),
                name: 'description',
            },
        ],
        title: computed(() => {
            if (!post.value) {
                return 'Not found';
            }

            return `${post.value.title} — Marshall Beard`;
        }),
    });
</script>
