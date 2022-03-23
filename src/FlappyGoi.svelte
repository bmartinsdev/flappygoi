<svelte:options tag="flappy-goi" />

<script lang="ts">
	import { onMount } from "svelte";
	import { sketch } from "./game/sketch";
	import P5 from "p5";
	let game, gameElement;

	onMount(() => {
		game = new P5(sketch, gameElement);
	});
</script>

<div class="holder">
	<div id="preloader">
		<img src="assets/loader.svg" alt="loading" />
	</div>
	<div id="p5_loading" />
	<div class="p5Canvas" />
	<div id="game" bind:this={gameElement} />
</div>

<style>
	.holder {
		position: relative;
		width: 100%;
		height: 100%;
	}
	#preloader {
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;
		background-color: #e1e6e8;
		width: 100%;
		height: 100%;
		transition: opacity 500ms;
		top: 0;
	}
	#p5_loading {
		display: none;
	}
	#game {
		width: 100%;
		height: 100%;
		min-height: 500px;
	}
	.p5Canvas {
		visibility: visible !important;
	}
</style>
