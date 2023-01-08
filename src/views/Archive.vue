<template>

    <SubTitle v-if="all_list_archive.length > 1" title="Listes archivées" />
    <SubTitle title="Liste archivée" />

    <ul id="list">
        <li :key="all_list_archive.indexOf(list)" v-for="list in all_list_archive">
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
        <ListBtn class="list_btn" />
    </div>

</template>
<!-- Template / Script -->
<script>
    import SubTitle from "@/components/SubTitle.vue"
    import HomeBtn from '@/components/HomeBtn.vue'
    import ListBtn from '@/components/ListBtn.vue'

	export default {
		name: 'Archive',
		components: {
            SubTitle,
            HomeBtn,
            ListBtn,
		},
		data() {
			return {
                all_list_archive: [],
			}
		},
        mounted() {
            const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            this.all_list_archive = all_data.list_archive;
        },
		methods: {
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
    #all_btns {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin: 50px auto;
    }

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
        background-color: var(--color-red);
        color: var(--color-white);
        border-radius: 16px 16px 16px 0;
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

</style>