<script lang="ts">
	import { page } from '$app/stores';
	import { getCategoryById } from '$lib/data/topics';
	import { error } from '@sveltejs/kit';
	import TopicCard from '$lib/components/TopicCard.svelte';
	import type { Difficulty } from '$lib/data/topics';
	import { getImageForCategory } from '$lib/utils/icons';

	$: categoryId = $page.params.category as string;
	$: category = getCategoryById(categoryId);
	$: imageSrc = category ? getImageForCategory(category.id) : '';
	
	let difficultyFilter: Difficulty | 'all' = 'all';

	$: {
		if (!category) {
			throw error(404, 'Category not found');
		}
	}

	$: filteredTopics = category?.topics.filter(topic => 
		difficultyFilter === 'all' || topic.difficulty === difficultyFilter
	) || [];

	$: beginnerCount = category?.topics.filter(t => t.difficulty === 'beginner').length || 0;
	$: intermediateCount = category?.topics.filter(t => t.difficulty === 'intermediate').length || 0;
	$: advancedCount = category?.topics.filter(t => t.difficulty === 'advanced').length || 0;

	function setFilter(filter: Difficulty | 'all') {
		difficultyFilter = filter;
	}
</script>

<svelte:head>
	{#if category}
		<title>{category.name} - Web Dev Resources</title>
	{/if}
</svelte:head>

{#if category}
	<div class="max-w-[960px] mx-auto flex flex-col gap-[32px]">
		<!-- Category Header -->
		<section class="pb-[24px] border-b border-[var(--cds-border-subtle-00)]">
			<div class="flex items-center gap-[16px]">
				<img src={imageSrc} alt={category.name} class="w-[96px] h-[96px] object-contain" />
				<div>
					<h1 class="m-0 mb-[16px] text-[42px] font-light leading-[50px] tracking-0 text-[var(--cds-text-primary)]">{category.name}</h1>
					<p class="m-0 text-[16px] font-normal leading-[24px] text-[var(--cds-text-secondary)]">{category.description}</p>
				</div>
			</div>
		</section>

		<!-- Filter Bar (Carbon Content Switcher style) -->
		<section class="flex items-center gap-[16px] flex-wrap">
			<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)]">Filter by difficulty:</span>
			<div class="flex">
				<button 
					class="h-[40px] px-[16px] text-[14px] font-normal leading-[18px] tracking-[0.16px] border cursor-pointer transition-colors duration-100
						{difficultyFilter === 'all' 
							? 'bg-[var(--cds-layer-selected-01)] border-[var(--cds-border-interactive)] text-[var(--cds-text-primary)] z-10' 
							: 'bg-[var(--cds-layer-01)] border-[var(--cds-border-strong-01)] text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover-01)]'}
						-ml-[1px] first:ml-0"
					on:click={() => setFilter('all')}
				>
					All ({category.topics.length})
				</button>
				
				{#if beginnerCount > 0}
					<button 
						class="h-[40px] px-[16px] text-[14px] font-normal leading-[18px] tracking-[0.16px] border cursor-pointer transition-colors duration-100
							{difficultyFilter === 'beginner' 
								? 'bg-[var(--cds-tag-background-green)] border-[var(--cds-tag-color-green)] text-[var(--cds-tag-color-green)] z-10' 
								: 'bg-[var(--cds-layer-01)] border-[var(--cds-border-strong-01)] text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover-01)]'}
							-ml-[1px] first:ml-0"
						on:click={() => setFilter('beginner')}
					>
						Beginner ({beginnerCount})
					</button>
				{/if}

				{#if intermediateCount > 0}
					<button 
						class="h-[40px] px-[16px] text-[14px] font-normal leading-[18px] tracking-[0.16px] border cursor-pointer transition-colors duration-100
							{difficultyFilter === 'intermediate' 
								? 'bg-[var(--cds-tag-background-blue)] border-[var(--cds-tag-color-blue)] text-[var(--cds-tag-color-blue)] z-10' 
								: 'bg-[var(--cds-layer-01)] border-[var(--cds-border-strong-01)] text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover-01)]'}
							-ml-[1px] first:ml-0"
						on:click={() => setFilter('intermediate')}
					>
						Intermediate ({intermediateCount})
					</button>
				{/if}

				{#if advancedCount > 0}
					<button 
						class="h-[40px] px-[16px] text-[14px] font-normal leading-[18px] tracking-[0.16px] border cursor-pointer transition-colors duration-100
							{difficultyFilter === 'advanced' 
								? 'bg-[var(--cds-tag-background-purple)] border-[var(--cds-tag-color-purple)] text-[var(--cds-tag-color-purple)] z-10' 
								: 'bg-[var(--cds-layer-01)] border-[var(--cds-border-strong-01)] text-[var(--cds-text-secondary)] hover:bg-[var(--cds-layer-hover-01)]'}
							-ml-[1px] first:ml-0"
						on:click={() => setFilter('advanced')}
					>
						Advanced ({advancedCount})
					</button>
				{/if}
			</div>
		</section>

		<!-- Topics Grid -->
		<section>
			{#if filteredTopics.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--cds-border-subtle-00)]">
					{#each filteredTopics as topic (topic.id)}
						<TopicCard {topic} />
					{/each}
				</div>
			{:else}
				<div class="text-center py-[48px]">
					<p class="text-[14px] leading-[20px] text-[var(--cds-text-secondary)]">No topics found for this filter.</p>
				</div>
			{/if}
		</section>
	</div>
{/if}
