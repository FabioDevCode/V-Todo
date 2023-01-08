<template>
    <SubTitle :title="actualList.name" v-if="hideList" />
    <SubTitle :title="'Ajout de tâche à '+ actualList.name" v-if="showModal" />

    <ul id="list" v-if="hideList">
        <li @click="endedTask(actualList.tasks.indexOf(task), task.title)"  :key="task.name" v-for="task in actualList.tasks" :class="'task ' + task.status">
            <div class="text">
                <h3>
                    {{ task.title }}
                </h3>
                <p>
                    {{ task.desc }}
                </p>
            </div>
            <div class="trash">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </div>
        </li>
    </ul>

    <Button @click="showModalAddTask()" class="btn_addtask" v-if="hideList" name="Ajouter une tâche" type="btn_green" />

    <div id="back_modal" v-if="showModal">
        <form @submit.prevent>
            <input v-model="modalTitle" placeholder="Titre de la tâche">
            <textarea v-model="modalDesc" placeholder="Description de la tâche"></textarea>

            <Button class="btn_addtask" name="Ajouter" type="btn_green" @click="addNewTaskIntoList()" />
            <button @submit.prevent class="btn_backlist" @click="showModalAddTask()">
                Annuler
            </button>
        </form>
    </div>

    <div id="bottom_btndel" @click="deleteList()" v-if="hideList">
		<button>
            Supprimer la liste
        </button>
    </div>

    <div id="all_btns">
        <HomeBtn />
        <ListBtn />
        <ArchiveAdd />
    </div>

</template>
<!-- Template/Script -->
<script>
    import Toastify from 'toastify-js'
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
    import SubTitle from "@/components/SubTitle.vue"
	import Button from '@/components/Button.vue'
    import HomeBtn from '@/components/HomeBtn.vue'
    import ArchiveAdd from '@/components/ArchiveAdd.vue'
    import ListBtn from '@/components/ListBtn.vue'
    import { useListStore } from '@/stores/list.js'

	export default {
		name: 'List',
		components: {
			Header,
			Footer,
            SubTitle,
            Button,
            HomeBtn,
            ArchiveAdd,
            ListBtn,
		},
		data() {
			return {
                list_name: useListStore().list,
                actualList: {},
                todoTasks: [],
                endedTasks: [],

                modalTitle: '',
                modalDesc: '',

                showModal: false,
                hideList: true,
			}
		},
        mounted() {
            if(useListStore().list.length > 0) {
                this.list_name = useListStore().list;
            } else {
                this.list_name = localStorage.getItem('f-devcode_actual-list');;
            }

            const newTodo = [];
            const newEnded = [];

            const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            all_data.list.map(el => {
                if(el.name === this.list_name) {
                    this.actualList = el;

                    el.tasks.map(el => {
                        if(el.status === 'todo') {
                            newTodo.push(el);
                        } else if(el.status === 'ended') {
                            newEnded.push(el);
                        }
                    })
                }
            });

            useListStore().length = this.actualList.tasks.length;
            useListStore().todo = newTodo;
            useListStore().ended = newEnded;
            this.todoTasks = newTodo;
            this.endedTasks = newEnded;
        },
		methods: {
            showModalAddTask() {
                this.hideList = !this.hideList;
                this.showModal = !this.showModal;
            },
            addNewTaskIntoList() {
                if(this.modalTitle.length < 2) {
                    Toastify({
                        text: "Nom de tâche trop court.",
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
                    return;
                };

                const myTask = {
                    status: 'todo',
                    title: this.modalTitle,
                    desc: this.modalDesc
                };

                const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
                all_data.list.map(el => {
                    if(el.name === this.actualList.name) {
                        el.tasks.push(myTask);
                        this.actualList.tasks.push(myTask);
                        this.todoTasks.push(myTask);
                    }
                });
                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));

                this.modalTitle = '';
                this.modalDesc = '';

                Toastify({
                        text: "Tâche ajoutée !",
                        duration: 3000,
                        newWindow: true,
                        gravity: "top", // `top` or `bottom`
                        position: "center", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            fontWeight: 600,
                            background: "#58BC82",
                            color: "#FAFAFA",
                        }
                    }).showToast();
            },
            endedTask(indexTask, titleTask) {
                const allTasks = document.querySelectorAll('.task')[indexTask];
                allTasks.classList.toggle('todo');
                allTasks.classList.toggle('ended');

                const dataForUpdateList = JSON.parse(JSON.stringify(this.actualList));
                const newTasks = [];
                dataForUpdateList.tasks.map(el => {
                    if(el.title === titleTask) {
                        if(el.status === 'todo') {
                            el.status = 'ended';
                        } else {
                            el.status = 'todo';
                        }
                    };
                    newTasks.push(el);
                })

                this.actualList.tasks = newTasks;

                const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
                all_data.list.map(el => {
                    if(el.name === this.list_name){
                        el.tasks = newTasks
                    }
                    return el
                });

                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));;
            },
            deleteList() {
                const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
                all_data.list.splice(all_data.list.indexOf(this.list_name), 1);
                all_data.list_name.splice(all_data.list_name.indexOf(this.list_name), 1);
                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));
                localStorage.removeItem('f-devcode_actual-list');

                this.$router.push('/V-Todo/');
            }
		}
	}
</script>
<!-- Script/Style -->
<style scoped>
    #list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 15px;
    }

    #list li {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        height: 80px;
        margin-bottom: 5px;
        background-color: var(--color-white);
        border-radius: 16px 0 16px 16px;
    }
    #list li:active {
        transform: scale(.99);
    }

    #list li div {
        height: 100%;
    }

    #list li .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        color: var(--color-black);
        width: 80%;
        padding-left: 15px;
    }
    #list li .text h3 {
        display: flex;
        justify-content: center;
        align-items: center;
        display: inline-block;
        width: 100%;
        font-size: 1.2em;
        line-height: 1em;
        padding: 5px 0;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    #list li .text p {
        margin: 0;
        position: relative;
        overflow: hidden;
        height: 80%;
        display: inline-block;
        font-size: .9em;
        line-height: 1.15em;
        font-weight: 400;
        background-color: transparent;
    }
    #list li .text p::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, var(--color-white) 30%, transparent 100%);
        height: 25px;
    }
    #list li .trash {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
    }
    #list li .trash svg {
        fill: var(--color-red);
        height: 25px;
        width: 25px;
    }

    #list li.ended {
        background-color: #a4a4a4;
    }
    #list li.ended .text h3, #list li.ended .text p {
        text-decoration: line-through;
        color: rgba(45, 49, 66, .7);
    }
    #list li.ended .text p::after {
        background: linear-gradient(to top, #a4a4a4 30%, transparent 100%) ;
    }

    #list li.ended .trash svg {
        fill: rgba(45, 49, 66, .7);
    }

    #bottom_btndel {
        position: relative;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin: 0 auto;
    }

    #bottom_btndel button {
        outline: none;
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        width: 100%;
        height: 60px;
        font-size: 16px;
        margin: 0 auto;
        font-size: 1.2em;
        background-color: transparent;
        color: var(--color-red);
        border: 2px solid var(--color-red);
    }

    .btn_addtask {
        background-color: crimson;
        margin: 0 auto 15px auto !important;
    }

    /* Modal add task */
    #back_modal {
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        /* background-color: rgba(45, 49, 66, .8); */
        /* position: absolute; */
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 50px auto;
        /* top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
    }

    #back_modal form {
        display: flex;
        flex-direction: column;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
    }

    #back_modal form input {
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
        font-family: 'Raleway', sans-serif;;
        font-size: 1.1em;
        font-weight: 400;
    }
    #back_modal form input::placeholder {
        font-size: 1em;
        font-style: italic;
    }
    #back_modal form input:focus {
        border: 3px solid var(--color-green);
    }

    #back_modal form textarea {
        color: var(--color-black);
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin-bottom: 16px;
        height: 140px;
        padding: 8px 16px;
        border-radius: 20px;
        border: 3px solid transparent;
        outline: none;
        font-family: 'Raleway', sans-serif;
        font-size: 1em;
        font-weight: 400;
    }

    #back_modal form .btn_addtask {
        margin-bottom: 10px;
    }

    #back_modal form .btn_backlist {
        outline: none;
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        height: 60px;
        font-size: 16px;
        margin: 0 auto;
        font-size: 1.2em;
        background-color: var(--color-black);
        border: 2px solid var(--color-red);
        color: var(--color-red);
    }

    #all_btns {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin: 50px auto;
    }

</style>