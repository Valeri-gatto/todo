<script lang="ts">
	let newTask = $state('');
	let title = 'Enter what do you want to do';
	let buttonText = 'Add todo';
</script>

<form class="main-container" method="POST" action="?/addTask">
	<label>
		<div class="title">
			<p>{title}</p>
			<img class="note-img" src="/src/lib/components/note.svg" alt="note" />
		</div>
		<input name="newTask" class="todo-input" bind:value={newTask} type="text" />
	</label>
	<button class="add-button">{buttonText}</button>
</form>

<style>
	.main-container {
		background-color: oklch(58.8% 0.158 241.966);
		border: 3px solid oklch(50% 0.134 242.749);
		border-radius: 16px;
		padding: 0.5em 2em;
		font-size: 1.3em;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.3em;
		justify-content: center;
		color: white;
		margin-bottom: 0.5em;
		text-shadow:
			1px 1px 2px black,
			0 0 0.8em oklch(29.3% 0.066 243.157),
			0 0 0.2em royalblue;
	}
	.title {
		display: flex;
		gap: 0.4em;
		align-items: center;
		p {
			margin: 0;
		}
	}
	.note-img {
		width: 1.5em;
		height: auto;
		object-fit: contain;
	}
	.todo-input {
		width: 100%;
		border-radius: 5px;
		padding: 0.3em;
		font-size: inherit;
	}
	.add-button {
		background-color: oklch(95.1% 0.026 236.824);
	}
</style>
