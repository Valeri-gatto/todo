<script lang="ts">
	let newTask = $state('');
	let title = 'Enter what do you want to do';
	let buttonText = 'Add todo';
	let { addTask }: { addTask: (newTask: string) => void } = $props();

	function formSubmitted(ev: SubmitEvent) {
		ev.preventDefault();
		if (newTask !== '') {
			addTask(newTask);
			newTask = '';
		}
	}
</script>

<form class="main-container" onsubmit={formSubmitted} method="POST" action="?/addTask">
	<label
		>{title}
		<input name="newTask" class="todo-input" bind:value={newTask} type="text" />
	</label>
	<button>{buttonText}</button>
</form>

<style>
	.main-container {
		background-color: lightskyblue;
		border: 1px solid royalblue;
		border-radius: 16px;
		padding: 1em;
	}

	label {
		color: white;
		text-shadow:
			1px 1px 2px black,
			0 0 0.8em blue,
			0 0 0.2em royalblue;
	}

	.todo-input {
		width: 80%;
		margin-block: 1em;
		border-radius: 5px;
		padding: 0.3em;
		font-size: inherit;
	}
</style>
