<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';
</script>

<!-- Carbon UI Shell Header -->
<header class="sticky top-0 z-50 h-[48px] bg-[var(--cds-background)] border-b border-[var(--cds-border-subtle-00)]">
	<div class="flex items-center justify-between h-full px-[16px]">
		<div class="flex items-center gap-[8px]">
			<slot name="breadcrumb" />
		</div>
		<div class="flex items-center">
			<ThemeToggle />
		</div>
	</div>
</header>
