import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import List from '@/views/List.vue';
import Encours from '@/views/Encours.vue';

const routes = [
	{
		path: '/V-Todo/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/V-Todo/List',
		name: 'List',
		component: List
	},
	{
		path: '/V-Todo/En_cours',
		name: 'Encours',
		component: Encours
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;