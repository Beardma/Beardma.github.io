<template>
    <header class="site-header">
        <RouterLink class="site-title" to="/">Marshall Beard</RouterLink>

        <nav class="site-nav">
            <RouterLink to="/">Posts</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>

    <main class="site-main">
        <RouterView />
    </main>

    <footer class="site-footer">
        <p>&copy; {{ year }} Marshall Beard</p>

        <!-- a static file, not a route, so a plain anchor rather than RouterLink -->
        <a href="/feed.xml">RSS</a>
    </footer>
</template>

<script setup lang="ts">
    const year = new Date().getFullYear();
</script>
