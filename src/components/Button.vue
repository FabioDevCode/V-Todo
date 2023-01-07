<template>
    <button :class="type">
        {{ name }}
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            name: String,
            type: String,
        },
        data() {
            return {
            }
        }
    }
</script>

<style>
    .btn_green, .btn_blue, .btn_red {
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        height: 60px;
        font-size: 16px;
        margin: 0 auto;
    }

    .btn_green {
        background: var(--color-green);
        color: var(--color-white);
    }

    .btn_blue {
        background: var(--color-blue);
        color: var(--color-white);
    }

    .btn_red {
        background: var(--color-red);
        color: var(--color-white);
    }
</style>