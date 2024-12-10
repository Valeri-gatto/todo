<script lang="ts">
	import { v4 as uuid } from 'uuid';
	import Form from '../lib/components/Form.svelte';
	import TasksList from '../lib/components/TasksList.svelte';
	import type { Filter, Items } from '$lib/Types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let items = data.items;

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

	function addTask(newTask: string) {
		items.push({
			id: uuid(),
			// можно сделать id через: crypto.randomUUID();
			text: newTask,
			done: false
		});
	}

	function removeTask(id: string) {
		const index = items.findIndex((t) => t.id === id);
		items.splice(index, 1);
	}

	function toggleDone(task: Items) {
		task.done = !task.done;
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
		<Form {addTask} />
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
		<TasksList items={filteredTasks} {toggleDone} {removeTask} />
	</main>
</div>

<style>
	.container {
		min-height: 100vh;
		place-items: center;
		margin: 0 auto;
		text-align: center;
	}
	main {
		padding: 2rem;
		max-width: 1280px;
		min-width: 320px;
	}
	.text {
		text-shadow: 1px 1px gainsboro;
		font-style: italic;
	}
	.button-container {
		display: flex;
		justify-content: start;
		gap: 0.5em;
		margin-bottom: 1em;
	}
	.secondary {
		border: 3px double darkslateblue;
		color: rgb(36, 31, 71);
	}
	.secondary:active,
	.secondary:focus {
		outline: 2px auto black;
	}
	.contrast {
		background-color: rgba(211, 211, 211, 1);
	}
	.filterButton {
		text-transform: capitalize;
	}
	:global(button) {
		border-radius: 8px;
		border: 2px solid transparent;
		padding: 0.5em 1.2em;
		font-size: 1em;
		font-weight: 500;
		font-family: inherit;
		background-color: #1a1a1a;
		cursor: pointer;
		transition: border-color 0.25s;
	}

	:global(button):hover {
		border-color: #646cff;
	}

	:global(button):active,
	:global(button):focus {
		outline: 2px auto #646cff;
	}
	@media (prefers-color-scheme: light) {
		:global(button) {
			background-color: #f9f9f9;
		}
	}
</style>
