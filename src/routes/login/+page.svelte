<script lang="ts">
	import { checkPassword } from '$lib/Types';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let username = $state('');
	let password = $state('');
	let repeatPassword = $state('');
	let pageType = $state(form?.pageType || 'login');
	let submitError = form?.error;
	let checkPas = $derived.by(() => {
		let errors: string[] = [];
		if (pageType === 'sign up') {
			if (password.length !== 0) {
				errors = checkPassword(password);
			}
			if (repeatPassword !== '' && repeatPassword !== password) {
				errors.push("Your passwords don't match");
			}
		} else {
			errors = [];
		}
		if (submitError) {
			errors.push(submitError);
			submitError = undefined;
		}
		return errors;
	});
</script>

<div class="login-container">
	<div class="login-content">
		<h1>Login form</h1>
		<div class="button-container">
			<button class:contrast={pageType === 'login'} onclick={() => (pageType = 'login')}
				>Login</button
			>
			<button class:contrast={pageType === 'sign up'} onclick={() => (pageType = 'sign up')}>
				Sign up</button
			>
		</div>
		<form method="POST" action="?/login">
			<label>
				<span>Username:</span>
				<input
					name="username"
					class="input"
					bind:value={username}
					type="text"
					minlength="4"
					maxlength="15"
					autocomplete="on"
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					name="password"
					class="input"
					bind:value={password}
					type="password"
					minlength="6"
					maxlength="15"
					autocomplete="on"
				/>
			</label>
			{#if pageType === 'sign up'}
				<label>
					<span>Confirm password:</span>
					<input
						name="repeatPassword"
						class="input"
						bind:value={repeatPassword}
						type="password"
						minlength="6"
						maxlength="15"
						autocomplete="on"
					/>
				</label>
			{/if}
			<ul class="red">
				{#each checkPas as err}
					<li>{err}</li>
				{/each}
			</ul>
			<input type="hidden" name="type" value={pageType} />
			<button class="login-button" disabled={checkPas.length !== 0}>{pageType}</button>
		</form>
	</div>
</div>

<style>
	button {
		text-transform: capitalize;
		cursor: pointer;
	}
	.login-container {
		background-color: lightskyblue;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		margin: 0 auto;
		text-align: center;
		background-image: url('../../lib/components/bg.svg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.login-content {
		min-height: 50vh;
		min-width: 30vw;
		max-width: 90vw;
		background-color: oklch(95.1% 0.026 236.824);
		padding: 1.5em;
		border-radius: 8px;
		outline: 4mm ridge royalblue;
		box-shadow: 30px 30px 30px royalblue;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}
	h1 {
		margin: 0;
		text-shadow: 3px 3px gainsboro;
	}
	.button-container {
		display: flex;
		justify-content: center;
		gap: 0.5em;
		width: 100%;

		> button {
			flex-basis: 35%;
			padding-block: 0.5em;
			border-radius: 5px;
			border: none;
			font-size: 1.1em;
			box-shadow: 1px 1px 5px royalblue;
		}
	}
	.button-container > button:hover {
		background-color: gainsboro;
	}
	.contrast {
		background-color: lightskyblue;
		outline: 2px solid royalblue;
		font-weight: 600;
	}
	button.contrast:hover {
		background-color: royalblue;
		color: white;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: start;
		gap: 0.7em;
	}
	input {
		font-size: 1.1em;
		padding: 0.3em;
	}
	input:focus {
		border-radius: 0;
		outline: 3px solid royalblue;
	}

	.login-button {
		background-color: royalblue;
		color: white;
		align-self: center;
		font-size: 1.4em;
		padding: 0.3em 1em;
		border-radius: 8px;
	}
	.login-button:hover {
		background-color: rgb(30, 47, 101);
	}
	.login-button:disabled {
		background-color: gainsboro;
		color: black;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		font-size: 1em;

		> span {
			align-self: start;
		}
	}
	.red {
		color: red;
		font-size: 0.8em;
		margin: 0;
		padding: 0;
		li {
			list-style: none;
		}
	}
</style>
