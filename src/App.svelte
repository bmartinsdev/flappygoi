<script lang="ts">
	import { onMount } from "svelte";
	import { sketch } from "./game/sketch";
	import P5 from "p5";
	let game;

	onMount(() => {
		game = new P5(sketch);
		window.onresize = onWindowResize;
	});

	function onWindowResize(e: UIEvent) {
		game.resizeCanvas(window.innerWidth, window.innerHeight);
	}
</script>

<div id="game" />

<style lang="scss" global>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100vh;
	}
</style>
