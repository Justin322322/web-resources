<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { page } from '$app/stores';
	import { categories } from '$lib/data/topics';

	let sidebarOpen = true;

	// Generate breadcrumbs from current path
	$: breadcrumbs = generateBreadcrumbs($page.url.pathname);

	function generateBreadcrumbs(pathname: string) {
		const crumbs = [{ label: 'Home', href: '/' }];
		
		if (pathname === '/') return crumbs;

		const segments = pathname.split('/').filter(Boolean);
		
		segments.forEach((segment, index) => {
			const category = categories.find(c => c.id === segment);
			const href = '/' + segments.slice(0, index + 1).join('/');
			
			if (category) {
				crumbs.push({ label: category.name, href });
			} else {
				// Check if it's a topic
				const parentCategoryId = segments[index - 1];
				const parentCategory = categories.find(c => c.id === parentCategoryId);
				const topic = parentCategory?.topics.find(t => t.id === segment);
				
				if (topic) {
					crumbs.push({ label: topic.title, href });
				} else {
					// Format topic name from slug
					const formattedLabel = segment
						.split('-')
						.map(word => word.charAt(0).toUpperCase() + word.slice(1))
						.join(' ');
					crumbs.push({ label: formattedLabel, href });
				}
			}
		});

		return crumbs;
	}
</script>

<!-- Carbon UI Shell -->
<div class="flex min-h-screen bg-[var(--cds-background)]">
	<Sidebar bind:isOpen={sidebarOpen} />
	
	<div class="flex flex-col flex-1 min-w-0">
		<Header>
			<Breadcrumb slot="breadcrumb" crumbs={breadcrumbs} />
		</Header>
		
		<!-- Main Content Area -->
		<main class="flex-1 p-[32px] bg-[var(--cds-background)]">
			<slot />
		</main>
	</div>
</div>
