<script lang="ts">
	import type { Item } from '$lib/Types';
	import { fade } from 'svelte/transition';

	let {
		items,
		toggleDone
	}: {
		items: Item[];
		toggleDone: (task: Item) => void;
	} = $props();
</script>

<div class="items">
	{#each items as task (task.id)}
		<section class="todo-item-container" transition:fade={{ delay: 100, duration: 300 }}>
			<div class="task-inner">
				<input
					id={task.id}
					name="task-content"
					checked={task.done}
					onchange={() => toggleDone(task)}
					type="checkbox"
				/>
				<label for={task.id} class:done={task.done}>{task.text}</label>
			</div>
			<form method="POST" action="?/removeTask">
				<input type="hidden" name="taskId" value={task.id} />
				<button class="remove-button">Remove</button>
			</form>
		</section>
	{/each}
</div>

<style>
	.items {
		max-height: 40vh;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: royalblue oklch(95.1% 0.026 236.824);
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}
	.todo-item-container {
		margin-block: 5px;
		display: flex;
		gap: min(2em, 5vw);
		justify-content: space-between;
		border-radius: 5px;
		align-items: center;
		padding: 0.5em 1rem;
		background-color: oklch(95.1% 0.026 236.824);
		border: 1px solid oklch(50% 0.134 242.749);
		color: black;
	}
	.task-inner {
		display: flex;
		gap: min(2vw, 1em);
	}
	input {
		margin: 0;
		cursor: pointer;
	}
	.remove-button {
		color: white;
		background-color: oklch(50% 0.134 242.749);
		font-weight: bold;
		font-size: 0.8em;
	}
	.remove-button:hover {
		background-color: maroon;
	}
	.done {
		text-decoration: line-through;
	}
</style>
