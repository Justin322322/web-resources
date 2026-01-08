<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { Moon, Sun } from 'lucide-svelte';

	function toggleTheme() {
		theme.toggle();
	}
</script>

<!-- Carbon Ghost Button Style -->
<button
	on:click={toggleTheme}
	class="flex items-center justify-center w-[48px] h-[48px] border-none bg-transparent 
		text-[var(--cds-icon-secondary)] cursor-pointer
		transition-colors duration-100 ease-in-out
		hover:bg-[var(--cds-layer-hover-01)]
		focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)] focus:ring-inset"
	aria-label={$theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
>
	{#if $theme === 'light'}
		<Moon size={20} />
	{:else}
		<Sun size={20} />
	{/if}
</button>
