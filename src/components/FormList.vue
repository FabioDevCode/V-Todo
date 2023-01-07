<template>
    <form id="formlist" @submit.prevent>
        <input v-model="inputNewList" placeholder="Nom de la liste">
        <Button class="btns" name="Créer une liste" type="btn_green" @click="createNewList()" />
    </form>
</template>
<!-- Template/Script -->
<script>
    import Toastify from 'toastify-js'
	import Button from '@/components/Button.vue'

    export default {
		name: 'FormList',
		components: {
			Button
		},
		data() {
			return {
                inputNewList: '',
                actualData: {}
			}
		},
        mounted() {
            if(!localStorage.getItem('f-devcode_v-todo')) {
                const all_data = {
                    list_name: [],
                    list_archive: [],
                    status : {
                        list: ["archive", "going"],
                        task: ["ended","todo"]
                    },
                    list: []
                };

                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));
                this.actualData = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            } else {
                this.actualData = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            }
        },
		methods: {
            addNewList(mewList) {
                this.actualData.list_name.push(this.inputNewList);
                this.actualData.list.push(mewList);
                localStorage.setItem('f-devcode_v-todo', JSON.stringify(this.actualData));
                this.actualData = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            },
            createNewList() {
                const mewList = {
                    name: this.inputNewList,
                    status: 1,
                    tasks: []
                }

                if(!this.actualData.list_name.includes(this.inputNewList)) {
                    this.addNewList(mewList);
                    this.inputNewList = '';

                    this.$router.push('/V-Todo/List');
                } else {
                    Toastify({
                        text: "Une liste avec ce nom existe déjà.",
                        duration: 3000,
                        newWindow: true,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            fontWeight: 600,
                            background: "#AB2346",
                            color: "#FAFAFA",
                        }
                    }).showToast();
                }
            }
		}
	}
</script>
<!-- Script/Style -->
<style>
    #formlist {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    #formlist input {
        color: var(--color-black);
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin-bottom: 16px;
        height: 60px;
        padding: 8px 16px;
        border-radius: 16px;
        border: 3px solid transparent;
        outline: none;
        font-size: 1.1em;
        font-weight: 400;
    }
    #formlist input::placeholder {
        font-size: 1em;
        font-style: italic;
    }
    #formlist input:focus {
        border: 3px solid var(--color-green);
    }


</style>