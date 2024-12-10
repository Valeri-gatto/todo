<script lang="ts">
	import type { Items } from '$lib/Types';
	import { fade } from 'svelte/transition';

	let {
		items,
		toggleDone,
		removeTask
	}: {
		items: Items[];
		toggleDone: (task: Items) => void;
		removeTask: (id: string) => void;
	} = $props();
</script>

{#each items as task (task.id)}
	<section class="todo-item-container" transition:fade>
		<label>
			<input checked={task.done} onchange={() => toggleDone(task)} type="checkbox" />
			<span class:done={task.done}>{task.text}</span>
		</label>
		<button class="remove-button" onclick={() => removeTask(task.id)}>Remove</button>
	</section>
{/each}

<style>
	.todo-item-container {
		margin-block: 5px;
		display: flex;
		justify-content: space-between;
		height: 50px;
		border-radius: 5px;
		align-items: center;
		padding-inline: 1rem;
		background-color: wheat;
		border: 1px solid burlywood;
		color: black;
	}
	input {
		margin: 0;
		margin-right: 20px;
		cursor: pointer;
	}
	.remove-button {
		color: maroon;
		font-weight: bold;
		font-size: 0.8em;
	}

	.done {
		text-decoration: line-through;
	}
</style>
