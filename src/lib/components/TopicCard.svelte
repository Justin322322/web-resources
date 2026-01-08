<script lang="ts">
	import Badge from './Badge.svelte';
	import type { Topic } from '$lib/data/topics';
	import { ArrowRight } from 'lucide-svelte';

	export let topic: Topic;
</script>

<!-- Carbon Clickable Tile -->
<a href="/{topic.category}/{topic.id}" 
	class="group relative overflow-hidden flex flex-col p-[16px] 
		bg-[var(--cds-layer-01)] 
		border border-[var(--cds-border-tile-01)]
		no-underline text-inherit
		transition-all duration-100 ease-in-out
		hover:bg-[var(--cds-layer-hover-01)]
		focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)] focus:ring-inset">
	
	<!-- Header -->
	<div class="flex items-start justify-between gap-[12px] mb-[8px]">
		<h3 class="m-0 text-[20px] font-normal leading-[26px] tracking-[0.16px] text-[var(--cds-text-primary)]">
			{topic.title}
		</h3>
		<Badge difficulty={topic.difficulty} />
	</div>
	
	<!-- Description -->
	<p class="m-0 mb-[16px] text-[14px] font-normal leading-[20px] tracking-[0.16px] text-[var(--cds-text-secondary)] flex-grow">
		{topic.description}
	</p>
	
	<!-- Footer -->
	<div class="flex justify-end mt-auto">
		<span class="inline-flex items-center gap-[4px] text-[14px] font-normal leading-[18px] tracking-[0.16px] text-[var(--cds-link-primary)]
			transition-all duration-100 ease-in-out group-hover:gap-[8px]">
			Learn more
			<ArrowRight size={16} />
		</span>
	</div>
</a>

