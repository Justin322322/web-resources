<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	interface Crumb {
		label: string;
		href?: string;
	}

	export let crumbs: Crumb[] = [];
</script>

<!-- Carbon Breadcrumb Component -->
<nav class="flex items-center" aria-label="Breadcrumb">
	<ol class="flex items-center list-none m-0 p-0 gap-0">
		{#each crumbs as crumb, index}
			<li class="flex items-center">
				{#if index > 0}
					<span class="mx-[8px] text-[var(--cds-text-placeholder)]">/</span>
				{/if}
				{#if crumb.href && index < crumbs.length - 1}
					<a href={crumb.href} 
						class="text-[12px] leading-[16px] tracking-[0.32px] text-[var(--cds-link-primary)] no-underline 
							hover:text-[var(--cds-link-primary-hover)] hover:underline
							focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)]">
						{crumb.label}
					</a>
				{:else}
					<span class="text-[12px] leading-[16px] tracking-[0.32px] text-[var(--cds-text-primary)]">
						{crumb.label}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
