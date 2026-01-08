<script lang="ts">
	export let color: 'green' | 'blue' | 'purple' | 'gray' = 'gray';
	
	const colors = {
		green: 'bg-[var(--cds-tag-background-green)] text-[var(--cds-tag-color-green)]',
		blue: 'bg-[var(--cds-tag-background-blue)] text-[var(--cds-tag-color-blue)]',
		purple: 'bg-[var(--cds-tag-background-purple)] text-[var(--cds-tag-color-purple)]',
		gray: 'bg-[var(--cds-tag-background-gray)] text-[var(--cds-tag-color-gray)]'
	};
	
	// Default to gray if color not found
	$: colorClass = colors[color] || colors.gray;
</script>

<div class="absolute top-[-4px] right-[-4px] w-[100px] h-[100px] overflow-hidden pointer-events-none z-10">
	<!-- Shadow/Fold (Darker triangles) -->
	<div class="absolute top-[0px] right-[106px] w-[8px] h-[8px] bg-black/30 z-[0]"></div>
	<div class="absolute bottom-[-110px] right-[0px] w-[8px] h-[8px] bg-black/30 z-[0]"></div>

	<div class="absolute top-[18px] right-[-34px] w-[130px] rotate-45 transform {colorClass} text-center text-[10px] font-semibold leading-[24px] uppercase tracking-[0.32px] shadow-sm">
		<slot />
	</div>
</div>
