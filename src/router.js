import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import List from '@/views/List.vue';

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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;