<script lang="ts">
	import { categories, getAllTopics } from '$lib/data/topics';
	import CategoryCard from '$lib/components/CategoryCard.svelte';

	$: totalTopics = getAllTopics().length;
	$: beginnerCount = getAllTopics().filter(t => t.difficulty === 'beginner').length;
	$: intermediateCount = getAllTopics().filter(t => t.difficulty === 'intermediate').length;
	$: advancedCount = getAllTopics().filter(t => t.difficulty === 'advanced').length;
</script>

<svelte:head>
	<title>Web Dev Resources - Learn Web Development</title>
</svelte:head>

<div class="max-w-[960px] mx-auto flex flex-col gap-[48px]">
	<!-- Hero Section -->
	<section class="py-[32px]">
		<!-- Heading -->
		<h1 class="m-0 mb-[16px] text-[42px] font-light leading-[50px] tracking-0 text-[var(--cds-text-primary)]">
			Web Development Resources
		</h1>
		<p class="m-0 mb-[32px] max-w-[640px] text-[16px] font-normal leading-[24px] text-[var(--cds-text-secondary)]">
			Your personal learning journey from beginner to advanced. Organized topics covering 
			everything you need to become a proficient web developer.
		</p>
		
		<!-- Stats Row -->
		<div class="flex gap-[32px] flex-wrap">
			<!-- Stat Card -->
			<div class="flex flex-col min-w-[120px]">
				<span class="text-[42px] font-light leading-[50px] text-[var(--cds-text-primary)]">{categories.length}</span>
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)] uppercase">Categories</span>
			</div>
			<div class="flex flex-col min-w-[120px]">
				<span class="text-[42px] font-light leading-[50px] text-[var(--cds-text-primary)]">{totalTopics}</span>
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)] uppercase">Topics</span>
			</div>
			<div class="flex flex-col min-w-[120px]">
				<span class="text-[42px] font-light leading-[50px] text-[var(--cds-tag-color-green)]">{beginnerCount}</span>
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)] uppercase">Beginner</span>
			</div>
			<div class="flex flex-col min-w-[120px]">
				<span class="text-[42px] font-light leading-[50px] text-[var(--cds-tag-color-blue)]">{intermediateCount}</span>
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)] uppercase">Intermediate</span>
			</div>
			<div class="flex flex-col min-w-[120px]">
				<span class="text-[42px] font-light leading-[50px] text-[var(--cds-tag-color-purple)]">{advancedCount}</span>
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)] uppercase">Advanced</span>
			</div>
		</div>
	</section>

	<!-- Categories Grid -->
	<section class="flex flex-col gap-[16px]">
		<h2 class="m-0 text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Browse by Category</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[var(--cds-border-subtle-00)]">
			{#each categories as category}
				<CategoryCard {category} />
			{/each}
		</div>
	</section>
</div>
