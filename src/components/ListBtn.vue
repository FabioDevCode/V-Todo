<template>
    <button>
        <router-link to="/V-Todo/En_cours">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
        </router-link>
    </button>
</template>

<script>
    export default {
        name: 'ListBtn',
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
        overflow: hidden;
        font-family: 'Raleway', sans-serif;
        background-color: var(--color-blue);
        color: var(--color-white);
        font-weight: 600;
        width: 60px;
        height: 60px;
        font-size: 16px;
        margin: 0;
        font-size: 1.2em;
        box-shadow: 0 0 8px rgba(33, 33, 33, .9);
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