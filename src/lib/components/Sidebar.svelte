<script lang="ts">
	import { page } from '$app/stores';
	import { categories } from '$lib/data/topics';
	import { getIconForCategory } from '$lib/utils/icons';
	import { Home, ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let isOpen = true;

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<!-- Carbon UI Shell Side-Nav -->
<aside class="flex flex-col h-screen bg-[var(--cds-background)] border-r border-[var(--cds-border-subtle-00)]
	sticky top-0 flex-shrink-0 transition-[width] duration-110 ease-[cubic-bezier(0.2,0,0.38,0.9)]
	{isOpen ? 'w-[256px]' : 'w-[48px]'}">
	
	<!-- Side-Nav Header (48px height per Carbon spec) -->
	<div class="h-[48px] flex items-center
		{isOpen ? 'px-[16px] justify-between' : 'justify-center'}">
		
		{#if isOpen}
			<!-- Logo/Title -->
			<a href="/" class="flex items-center no-underline">
				<span class="text-[14px] font-semibold leading-[18px] tracking-[0.16px] text-[var(--cds-text-primary)]">
					WebDev Resources
				</span>
			</a>
			<!-- Collapse Button -->
			<button 
				class="flex items-center justify-center w-[32px] h-[32px] bg-transparent border-none cursor-pointer
					text-[var(--cds-icon-secondary)] hover:bg-[var(--cds-background-hover)] hover:text-[var(--cds-icon-primary)]
					focus:outline-2 focus:outline-[var(--cds-focus)] focus:outline-offset-[-2px]"
				on:click={toggleSidebar}
				aria-label="Collapse navigation"
			>
				<ChevronLeft size={16} />
			</button>
		{:else}
			<!-- Expand Button (when collapsed) -->
			<button 
				class="flex items-center justify-center w-[32px] h-[32px] bg-transparent border-none cursor-pointer
					text-[var(--cds-icon-secondary)] hover:bg-[var(--cds-background-hover)] hover:text-[var(--cds-icon-primary)]
					focus:outline-2 focus:outline-[var(--cds-focus)] focus:outline-offset-[-2px]"
				on:click={toggleSidebar}
				aria-label="Expand navigation"
			>
				<ChevronRight size={16} />
			</button>
		{/if}
	</div>

	<!-- Side-Nav Items -->
	<nav class="flex-1 overflow-y-auto" aria-label="Side navigation">
		<ul class="list-none m-0 p-0">
			
			<!-- Home Link (Carbon side-nav__link) -->
			<li class="relative">
				<a href="/" 
					class="flex items-center h-[32px] no-underline
						text-[14px] font-normal leading-[18px] tracking-[0.16px]
						transition-colors duration-110 ease-[cubic-bezier(0.2,0,0.38,0.9)]
						focus:outline-2 focus:outline-[var(--cds-focus)] focus:outline-offset-[-2px]
						{$page.url.pathname === '/' 
							? 'bg-[var(--cds-background-selected)] text-[var(--cds-text-primary)]' 
							: 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-background-hover)] hover:text-[var(--cds-text-primary)]'}
						{isOpen ? 'pl-[16px] pr-[16px] gap-[8px]' : 'justify-center'}"
					aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<!-- Active indicator (3px left border) -->
					{#if $page.url.pathname === '/'}
						<span class="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--cds-border-interactive)]"></span>
					{/if}
					<Home size={16} class="{$page.url.pathname === '/' ? 'text-[var(--cds-icon-primary)]' : 'text-[var(--cds-icon-secondary)]'}" />
					{#if isOpen}
						<span>Home</span>
					{/if}
				</a>
			</li>
			

			
			<!-- Section Header (Carbon side-nav__menu-title style) -->
			{#if isOpen}
				<li class="px-[16px] pt-[8px] pb-[4px]">
					<span class="text-[12px] font-semibold leading-[16px] tracking-[0.32px] text-[var(--cds-text-secondary)] uppercase">
						Categories
					</span>
				</li>
			{/if}
			
			<!-- Category Links -->
			{#each categories as category}
				{@const Icon = getIconForCategory(category.id)}
				{@const isActive = $page.url.pathname.startsWith(`/${category.id}`)}
				<li class="relative">
					<a href="/{category.id}" 
						class="flex items-center h-[32px] no-underline
							text-[14px] font-normal leading-[18px] tracking-[0.16px]
							transition-colors duration-110 ease-[cubic-bezier(0.2,0,0.38,0.9)]
							focus:outline-2 focus:outline-[var(--cds-focus)] focus:outline-offset-[-2px]
							{isActive 
								? 'bg-[var(--cds-background-selected)] text-[var(--cds-text-primary)]' 
								: 'text-[var(--cds-text-secondary)] hover:bg-[var(--cds-background-hover)] hover:text-[var(--cds-text-primary)]'}
							{isOpen ? 'pl-[16px] pr-[16px] gap-[8px]' : 'justify-center'}"
						aria-current={isActive ? 'page' : undefined}
						title={isOpen ? undefined : category.name}>
						<!-- Active indicator -->
						{#if isActive}
							<span class="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--cds-border-interactive)]"></span>
						{/if}
						<svelte:component this={Icon} size={16} class="{isActive ? 'text-[var(--cds-icon-primary)]' : 'text-[var(--cds-icon-secondary)]'}" />
						{#if isOpen}
							<span class="flex-1">{category.name}</span>
							<span class="text-[12px] leading-[16px] tracking-[0.32px] text-[var(--cds-text-helper)]">
								{category.topics.length}
							</span>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>
