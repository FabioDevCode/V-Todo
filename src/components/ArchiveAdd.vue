<template>
    <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H448c35.3 0 64 28.7 64 64V416zM232 376c0 13.3 10.7 24 24 24s24-10.7 24-24V312h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H280V200c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H168c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z"/></svg>
    </button>
</template>

<script>
    export default {
        name: 'ArchiveAdd',
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