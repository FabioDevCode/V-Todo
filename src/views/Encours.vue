<template>

    <SubTitle v-if="all_list.length > 1" title="Listes en cours" />
    <SubTitle v-else title="Liste en cours" />

    <ul id="list">
        <li :key="all_list.indexOf(list)" v-for="list in all_list" @click="showList(list.name)">
            <div>
                {{ list.tasks.length}}
            </div>
            <h3>
                {{ list.name }}
            </h3>
            <div>
                {{ perCenth(list) + ' %' }}
            </div>
        </li>
    </ul>

    <div id="all_btns">
        <HomeBtn class="home_btn" />
        <ArchiveBtn class="archive_add" />
    </div>

</template>

<!-- Template / Script -->
<script>
	import Button from '@/components/Button.vue'
    import HomeBtn from '@/components/HomeBtn.vue'
    import SubTitle from "@/components/SubTitle.vue"
    import ArchiveBtn from '@/components/ArchiveBtn.vue'
    import { useListStore } from '@/stores/list.js'

	export default {
		name: 'Encours',
		components: {
            Button,
            HomeBtn,
            SubTitle,
            ArchiveBtn,
		},
		data() {
			return {
                all_list: [],
			}
		},
        mounted() {
            const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            this.all_list = all_data.list;
        },
		methods: {
            showList(name_list) {
                const storeList = useListStore();
                storeList.list = name_list;
                localStorage.setItem('f-devcode_actual-list', name_list);
                this.$router.push('/V-Todo/List');
            },
            perCenth(list) {
                const arr_finished_tasks = []
                list.tasks?.map(el => {
                    if(el.status === "ended") {
                        arr_finished_tasks.push(el)
                    }
                });

                let result;

                if(!arr_finished_tasks?.length && !list.tasks?.length) {
                    result = 0
                } else {
                    result = arr_finished_tasks.length/list.tasks.length*100;
                }

                return result.toFixed(0);
            }
		}
	}
</script>
<!-- Script / Style -->
<style scoped>
    #list {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    li {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        height: 80px;
        margin-bottom: 5px;
        background-color: var(--color-blue);
        border-radius: 16px 0 16px 16px;
        overflow: hidden;
    }

    li div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 20%;
        font-size: 1.4em;
        font-weight: 600;
    }

    li div:nth-child(3) {
        width: 25%;
        font-size: 1.2em;
    }

    li h3 {
        font-size: 1.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55%;
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