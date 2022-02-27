<script lang="ts">
	import { onMount } from "svelte";
	import { sketch } from "./game/sketch";
	import P5 from "p5";
	let game;

	onMount(() => {
		game = new P5(sketch);
		window.onresize = onWindowResize;
		document.oncontextmenu = () => false;
	});

	function onWindowResize(e: UIEvent) {
		game.resizeCanvas(window.innerWidth, window.innerHeight);
	}
</script>

<div id="game" />

<style lang="scss" global>
	html {
		background-color: #e1e6e8;
	}
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#game {
		height: 100%;
		display: flex;
		align-items: bottom;
	}
	canvas {
		display: block;
		width: 100%;
		height: 100%;
		max-height: 800px;
		max-width: 1300px;
	}
</style>
