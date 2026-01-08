<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
	import { Github } from 'lucide-svelte';
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
				<span class="hidden sm:inline">Star on GitHub</span>
				<img 
					src="https://img.shields.io/github/stars/Justin322322/web-resources?style=flat&label=&color=161616&labelColor=161616" 
					alt="GitHub stars"
					class="h-[18px] dark:invert"
				/>
			</a>
			<ThemeToggle />
		</div>
	</div>
</header>

