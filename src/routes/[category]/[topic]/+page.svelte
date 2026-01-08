<script lang="ts">
	import { page } from '$app/stores';
	import { getCategoryById } from '$lib/data/topics';
	import { error } from '@sveltejs/kit';
	import Badge from '$lib/components/Badge.svelte';
	import { ArrowLeft, ArrowRight, Info } from 'lucide-svelte';

	$: categoryId = $page.params.category as string;
	$: topicId = $page.params.topic as string;
	$: category = getCategoryById(categoryId);
	$: topic = category?.topics.find(t => t.id === topicId);

	$: {
		if (!category || !topic) {
			throw error(404, 'Topic not found');
		}
	}

	// Process content to convert escaped newlines to actual newlines
	$: processedContent = topic?.content?.replace(/\\n/g, '\n') ?? '';

	// Find next and previous topics
	$: currentIndex = category?.topics.findIndex(t => t.id === topicId) ?? -1;
	$: prevTopic = currentIndex > 0 ? category?.topics[currentIndex - 1] : null;
	$: nextTopic = currentIndex < (category?.topics.length ?? 0) - 1 ? category?.topics[currentIndex + 1] : null;
</script>

<svelte:head>
	{#if topic}
		<title>{topic.title} - Web Dev Resources</title>
	{/if}
</svelte:head>

{#if topic && category}
	<article class="max-w-[736px] mx-auto">
		<!-- Topic Header -->
		<header class="pb-[24px] border-b border-[var(--cds-border-subtle-00)] mb-[32px]">
			<div class="flex items-center gap-[12px] mb-[16px]">
				<Badge difficulty={topic.difficulty} />
				<span class="text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)]">
					{category.name}
				</span>
			</div>
			<h1 class="m-0 mb-[12px] text-[42px] font-light leading-[50px] text-[var(--cds-text-primary)]">
				{topic.title}
			</h1>
			<p class="m-0 text-[16px] font-normal leading-[24px] text-[var(--cds-text-secondary)]">
				{topic.description}
			</p>
		</header>

		<!-- Content -->
		<section class="flex flex-col gap-[32px]">
			{#if topic.content}
				<!-- Image -->
				{#if topic.image}
					<div class="bg-[var(--cds-layer-01)] p-[16px] border border-[var(--cds-border-subtle-00)]">
						<img src={topic.image} alt={topic.title} class="w-full h-auto object-contain max-h-[400px]" />
					</div>
				{/if}

				<!-- HTML Content -->
				<div class="topic-content text-[var(--cds-text-primary)]">
					{@html processedContent}
				</div>



				<!-- Resources -->
				{#if topic.resources && topic.resources.length > 0}
					<div>
						<h2 class="m-0 mb-[16px] text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Additional Resources</h2>
						<ul class="list-disc pl-[20px] space-y-[8px] text-[var(--cds-text-secondary)]">
							{#each topic.resources as resource}
								<li>
									<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-[var(--cds-link-primary)] hover:underline">
										{resource.title}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{:else}
				<!-- Inline Notification (Carbon) -->
				<div class="flex items-start gap-[16px] p-[16px] bg-[var(--cds-layer-01)] border-l-[3px] border-l-[var(--cds-support-info)]">
					<Info size={20} class="text-[var(--cds-support-info)] flex-shrink-0 mt-[2px]" />

					<div>
						<h3 class="m-0 mb-[4px] text-[14px] font-semibold leading-[18px] tracking-[0.16px] text-[var(--cds-text-primary)]">Content Coming Soon</h3>
						<p class="m-0 text-[14px] font-normal leading-[20px] tracking-[0.16px] text-[var(--cds-text-secondary)]">
							This is a skeleton page. Detailed content for "{topic.title}" will be added here.
						</p>
					</div>
				</div>

				<!-- Skeleton Sections -->
				<div class="flex flex-col gap-[32px]">
					<div>
						<h2 class="m-0 mb-[16px] text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Overview</h2>
						<div class="space-y-[8px]">
							<div class="h-[16px] bg-[var(--cds-layer-01)] animate-pulse"></div>
							<div class="h-[16px] w-4/5 bg-[var(--cds-layer-01)] animate-pulse"></div>
							<div class="h-[16px] w-3/5 bg-[var(--cds-layer-01)] animate-pulse"></div>
						</div>
					</div>

					<div>
						<h2 class="m-0 mb-[16px] text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Key Concepts</h2>
						<div class="space-y-[8px]">
							<div class="h-[14px] w-4/5 bg-[var(--cds-layer-01)] animate-pulse"></div>
							<div class="h-[14px] w-3/4 bg-[var(--cds-layer-01)] animate-pulse"></div>
							<div class="h-[14px] w-[78%] bg-[var(--cds-layer-01)] animate-pulse"></div>
						</div>
					</div>

					<div>
						<h2 class="m-0 mb-[16px] text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Code Example</h2>
						<div class="h-[112px] bg-[var(--cds-layer-01)] border border-[var(--cds-border-subtle-00)] animate-pulse"></div>
					</div>

					<div>
						<h2 class="m-0 mb-[16px] text-[20px] font-normal leading-[28px] text-[var(--cds-text-primary)]">Resources</h2>
						<div class="space-y-[8px]">
							<div class="h-[14px] w-4/5 bg-[var(--cds-layer-01)] animate-pulse"></div>
							<div class="h-[14px] w-3/5 bg-[var(--cds-layer-01)] animate-pulse"></div>
						</div>
					</div>
				</div>
			{/if}
		</section>

		<!-- Navigation (Prev/Next) -->
		<nav class="flex justify-between gap-[16px] mt-[48px] pt-[24px] border-t border-[var(--cds-border-subtle-00)]">
			{#if prevTopic}
				<a href="/{category.id}/{prevTopic.id}" 
					class="group flex flex-col gap-[4px] p-[16px] bg-[var(--cds-layer-01)] border border-[var(--cds-border-tile-01)] no-underline max-w-[45%] w-full
						transition-all duration-100 hover:bg-[var(--cds-layer-hover-01)]
						focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)] focus:ring-inset">
					<span class="flex items-center gap-[4px] text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-link-primary)]">
						<ArrowLeft size={12} class="transition-transform duration-100 group-hover:-translate-x-[4px]" />
						Previous
					</span>
					<span class="text-[14px] font-semibold leading-[18px] tracking-[0.16px] text-[var(--cds-text-primary)]">{prevTopic.title}</span>
				</a>
			{:else}
				<div class="max-w-[45%] w-full"></div>
			{/if}

			{#if nextTopic}
				<a href="/{category.id}/{nextTopic.id}" 
					class="group flex flex-col gap-[4px] p-[16px] bg-[var(--cds-layer-01)] border border-[var(--cds-border-tile-01)] no-underline max-w-[45%] w-full text-right ml-auto
						transition-all duration-100 hover:bg-[var(--cds-layer-hover-01)]
						focus:outline-none focus:ring-2 focus:ring-[var(--cds-focus)] focus:ring-inset">
					<span class="flex items-center justify-end gap-[4px] text-[12px] font-normal leading-[16px] tracking-[0.32px] text-[var(--cds-link-primary)]">
						Next
						<ArrowRight size={12} class="transition-transform duration-100 group-hover:translate-x-[4px]" />
					</span>
					<span class="text-[14px] font-semibold leading-[18px] tracking-[0.16px] text-[var(--cds-text-primary)]">{nextTopic.title}</span>
				</a>
			{/if}
		</nav>
	</article>
{/if}

<style>
	:global(.topic-content h2) {
		font-size: 1.25rem;
		line-height: 1.4;
		font-weight: 400;
		margin-bottom: 1rem;
		margin-top: 2rem;
		color: var(--cds-text-primary);
	}
	:global(.topic-content h3) {
		font-size: 1rem;
		line-height: 1.375;
		font-weight: 600;
		margin-bottom: 0.5rem;
		margin-top: 1.5rem;
		color: var(--cds-text-primary);
	}
	:global(.topic-content p) {
		font-size: 1rem;
		line-height: 1.5;
		margin-bottom: 1rem;
		color: var(--cds-text-primary);
	}
	:global(.topic-content ul), :global(.topic-content ol) {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		list-style-type: disc;
		color: var(--cds-text-secondary);
	}
	:global(.topic-content ol) {
		list-style-type: decimal;
	}
	:global(.topic-content li) {
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}
	:global(.topic-content strong) {
		font-weight: 600;
		color: var(--cds-text-primary);
	}

	/* Code block styles */
	:global(.topic-content pre) {
		background-color: var(--cds-layer-01);
		border: 1px solid var(--cds-border-subtle-00);
		border-radius: 0;
		padding: 1rem;
		margin: 1rem 0;
		overflow-x: auto;
		font-family: 'IBM Plex Mono', 'Consolas', 'Monaco', monospace;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--cds-text-primary);
		white-space: pre;
		word-wrap: normal;
	}

	:global(.topic-content pre code) {
		background: none;
		padding: 0;
		border: none;
		font-size: inherit;
		color: inherit;
	}

	/* Inline code styles */
	:global(.topic-content code) {
		background-color: var(--cds-layer-01);
		padding: 0.125rem 0.375rem;
		border-radius: 2px;
		font-family: 'IBM Plex Mono', 'Consolas', 'Monaco', monospace;
		font-size: 0.875em;
		color: var(--cds-text-primary);
		border: 1px solid var(--cds-border-subtle-00);
	}

	/* kbd styles for keyboard shortcuts */
	:global(.topic-content kbd) {
		background-color: var(--cds-layer-02);
		border: 1px solid var(--cds-border-subtle-01);
		border-radius: 3px;
		box-shadow: 0 1px 0 var(--cds-border-subtle-01);
		padding: 0.125rem 0.375rem;
		font-family: 'IBM Plex Mono', 'Consolas', 'Monaco', monospace;
		font-size: 0.875em;
		color: var(--cds-text-primary);
	}
</style>
