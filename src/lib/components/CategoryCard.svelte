<script lang="ts">
	import type { Category } from '$lib/data/topics';
	import { ArrowRight } from 'lucide-svelte';
	import { getImageForCategory } from '$lib/utils/icons';

	export let category: Category;
	
	$: imageSrc = getImageForCategory(category.id);
</script>

<!-- Carbon Clickable Tile -->
<a href="/{category.id}" 
	class="group flex items-center gap-[16px] p-[16px] 
		bg-[var(--cds-layer-01)] 
		border border-[var(--cds-border-tile-01)]
		no-underline text-inherit
		transition-all duration-100 ease-in-out
		hover:bg-[var(--cds-layer-hover-01)]
		focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)] focus:ring-inset">
	
	<!-- Category Image -->
	<img 
		src={imageSrc} 
		alt={category.name} 
		class="w-[80px] h-[80px] flex-shrink-0 object-contain" 
	/>
	
	<!-- Content -->
	<div class="flex-1 min-w-0">
		<h3 class="m-0 mb-[8px] text-[20px] font-normal leading-[26px] tracking-[0.16px] text-[var(--cds-text-primary)]">
			{category.name}
		</h3>
		<p class="m-0 text-[14px] font-normal leading-[20px] tracking-[0.16px] text-[var(--cds-text-secondary)]">
			{category.description}
		</p>
	</div>
	
	<!-- Meta & Arrow -->
	<div class="flex items-center gap-[16px] flex-shrink-0">
		<span class="px-[8px] py-[2px] rounded-[16px] bg-[var(--cds-layer-accent-01)] text-[12px] leading-[16px] tracking-[0.32px] text-[var(--cds-text-primary)]">
			{category.topics.length} topics
		</span>
		<ArrowRight size={20} class="text-[var(--cds-icon-interactive)] transition-transform duration-100 group-hover:translate-x-[4px]" />
	</div>
</a>
