<template>
    <SubTitle :title="actualList.name" v-if="hideList" />
    <SubTitle :title="'Ajout de tâche à '+ actualList.name" v-if="showModal" />

    <ul id="list" v-if="hideList">
        <li :key="actualList.tasks.indexOf(task)" :id="'task'+actualList.tasks.indexOf(task)" v-for="task in actualList.tasks" :class="'task ' + task.status">
            <div class="text" @click="endedTask(actualList.tasks.indexOf(task), task.title)">
                <h3>
                    {{ task.title }}
                </h3>
                <p>
                    {{ task.desc }}
                </p>
            </div>
            <div class="trash" @click="supprTask(actualList.tasks.indexOf(task))">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"/></svg>
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
            supprTask(indexTask) {
                const newTasksUpdated = JSON.parse(JSON.stringify(this.actualList.tasks));
                newTasksUpdated.splice(indexTask ,1);

                this.actualList.tasks = newTasksUpdated;

                const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
                all_data.list.map(el => {
                    if(el.name === this.list_name){
                        el.tasks = newTasksUpdated
                    }
                    return el
                });

                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));


                // Delete task on list
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

                localStorage.setItem('f-devcode_v-todo', JSON.stringify(all_data));
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
        transition: all 200ms ease-in-out;
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
        padding: 0 0 5px 0;
        border-bottom: 3px solid transparent;
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
        border-radius: 16px 16px 16px 0;
        transition: all 200ms ease-in-out;
    }

    #list li.ended .text h3, #list li.ended .text p {
        text-decoration: line-through;
        color: rgba(45, 49, 66, .7);
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
        margin: 0 auto 15px auto !important;
    }

    /* Modal add task */
    #back_modal {
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto 50px auto;
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

    .none {
        display: none !important;
        visibility: hidden !important;
    }

</style>