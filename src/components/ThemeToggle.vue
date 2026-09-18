<template>
    <button
        aria-label="Toggle light and dark mode"
        class="theme-toggle"
        type="button"
        @click="toggle"
    ></button>
</template>

<script setup lang="ts">
    const STORAGE_KEY = 'theme';

    function resolvedTheme(): string {
        const chosen = document.documentElement.dataset.theme;

        if (chosen) {
            return chosen;
        }

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    function toggle(): void {
        let next = 'dark';

        if (resolvedTheme() === 'dark') {
            next = 'light';
        }

        document.documentElement.dataset.theme = next;

        try {
            localStorage.setItem(STORAGE_KEY, next);
        }
        catch {
            // Private browsing rejects writes; the toggle still works for this page.
        }
    }
</script>
