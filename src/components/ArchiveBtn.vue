<template>
    <button>
        <router-link to="/V-Todo/Archive">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z"/></svg>
        </router-link>
    </button>
</template>

<script>
    export default {
        name: 'ArchiveBtn',
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        font-family: 'Raleway', sans-serif;
        background-color: var(--color-red);
        color: var(--color-white);
        font-weight: 600;
        width: 60px;
        height: 60px;
        font-size: 16px;
        margin: 0;
        font-size: 1.2em;
        box-shadow: 0 0 12px rgba(33, 33, 33, .6);
    }
    button a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    }
    button svg {
        height: 26px;
        width: 26px;
        fill: var(--color-white);
    }
</style>