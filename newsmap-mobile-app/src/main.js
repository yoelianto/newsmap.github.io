import InitApp from './InitApp.svelte';

const app = new InitApp({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;