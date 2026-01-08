<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { Github, Star } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let starCount = 0;

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/repos/Justin322322/web-resources');
			const data = await res.json();
			starCount = data.stargazers_count || 0;
		} catch (e) {
			starCount = 0;
		}
	});
</script>

<!-- Carbon UI Shell Header -->
<header class="sticky top-0 z-50 h-[48px] bg-[var(--cds-background)] border-b border-[var(--cds-border-subtle-00)]">
	<div class="flex items-center justify-between h-full px-[16px]">
		<div class="flex items-center gap-[8px]">
			<slot name="breadcrumb" />
		</div>
		<div class="flex items-center gap-[8px]">
			<a 
				href="https://github.com/Justin322322/web-resources" 
				target="_blank" 
				rel="noopener noreferrer"
				class="flex items-center gap-[8px] h-[32px] px-[12px] 
					text-[14px] font-normal leading-[18px] tracking-[0.16px]
					text-[var(--cds-text-secondary)] no-underline
					border border-[var(--cds-border-subtle-01)] rounded-[4px]
					transition-all duration-100
					hover:bg-[var(--cds-layer-hover-01)] hover:text-[var(--cds-text-primary)]"
			>
				<Github size={16} />
				<span class="hidden sm:inline">Star</span>
				<span class="flex items-center gap-[4px] text-[var(--cds-text-primary)]">
					<Star size={14} class="text-[var(--cds-support-warning)]" />
					{starCount}
				</span>
			</a>
			<ThemeToggle />
		</div>
	</div>
</header>
