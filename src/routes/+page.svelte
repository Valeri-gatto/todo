<script lang="ts">
	import Form from '../lib/components/Form.svelte';
	import TasksList from '../lib/components/TasksList.svelte';
	import type { Filter, Item } from '$lib/Types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let items = $state(data.items);
	let currentFilter = $state<Filter>('all');
	let totalDone = $derived(items.reduce((total, item) => total + Number(item.done), 0));
	let filteredTasks = $derived.by(() => {
		switch (currentFilter) {
			case 'all': {
				return items;
			}
			case 'done': {
				return items.filter((t) => t.done);
			}
			case 'todo': {
				return items.filter((t) => !t.done);
			}
		}
	});

	function toggleDone(task: Item) {
		task.done = !task.done;
		fetch('/api/setTaskState', {
			method: 'POST',
			body: JSON.stringify({ id: task.id, done: task.done })
		});
	}
</script>

{#snippet filterButton(filter: Filter)}
	<button
		onclick={() => (currentFilter = filter)}
		class:contrast={currentFilter === filter}
		class="secondary filterButton">{filter}</button
	>
{/snippet}

<div class="container">
	<main>
		<form class="menu" method="POST" action="?/deleteCookies">
			<input type="hidden" />
			<button class="logout">Log out </button>
		</form>
		<Form />
		<p class="text">
			{#if items.length}
				{totalDone} / {items.length} tasks completed
			{:else}
				Add a task to get started.
			{/if}
		</p>
		{#if items.length}
			<div class="button-container">
				{@render filterButton('all')}
				{@render filterButton('todo')}
				{@render filterButton('done')}
			</div>
		{/if}
		<TasksList items={filteredTasks} {toggleDone} />
	</main>
</div>

<style>
	.container {
		min-height: 100vh;
		place-items: center;
		margin: 0 auto;
		text-align: center;
		background-color: lightskyblue;
		background-image: url('$lib/assets/bg.svg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	main {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
	.menu {
		display: flex;
		justify-content: end;
	}
	.logout {
		position: relative;
		padding-right: 2.5em;
		margin-bottom: 1em;
		background-color: oklch(50% 0.134 242.749);
		text-shadow: 1px 1px black;
		color: white;
	}
	.logout::after {
		content: '';
		position: absolute;
		right: 10px;
		top: calc(50% - 10px);
		background-image: url('$lib/assets/Logout.svg');
		background-position: center;
		width: 1.2em;
		aspect-ratio: 1;
	}
	.text {
		margin-block: 0;
		text-shadow: 1px 1px gainsboro;
		font-style: italic;
		font-weight: 600;
	}
	.button-container {
		display: flex;
		justify-content: start;
		gap: 0.5em;
	}
	.secondary {
		border: 3px double darkslateblue;
		color: rgb(36, 31, 71);
	}
	.secondary:active,
	.secondary:focus {
		outline: 2px auto oklch(39.1% 0.09 240.876);
	}
	.contrast {
		background-color: rgba(211, 211, 211, 1);
	}
	.filterButton {
		text-transform: capitalize;
	}
	:global(button) {
		border-radius: 8px;
		outline: 1px solid oklch(39.1% 0.09 240.876);
		padding: 0.5em 1em;
		font-weight: 500;
		font-size: inherit;
		font-family: inherit;
		background-color: inherit;
		cursor: pointer;
		transition: outline-width 0.15s ease-in-out;
	}

	:global(button):hover {
		outline-width: 3px;
	}

	:global(button):active,
	:global(button):focus {
		outline-width: 2px;
	}
	@media (prefers-color-scheme: light) {
		:global(button) {
			background-color: #f9f9f9;
		}
	}
</style>
