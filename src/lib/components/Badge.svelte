<script lang="ts">
	import type { Difficulty } from '$lib/data/topics';

	export let difficulty: Difficulty;
	export let size: 'sm' | 'md' = 'md';

	// Carbon Tag Colors
	const variants = {
		beginner: 'bg-[var(--cds-tag-background-green)] text-[var(--cds-tag-color-green)]',
		intermediate: 'bg-[var(--cds-tag-background-blue)] text-[var(--cds-tag-color-blue)]',
		advanced: 'bg-[var(--cds-tag-background-purple)] text-[var(--cds-tag-color-purple)]'
	};

	const labels = {
		beginner: 'Beginner',
		intermediate: 'Intermediate',
		advanced: 'Advanced'
	};

	// Carbon Tag Sizes: sm = 18px height, md = 24px height
	const sizes = {
		sm: 'h-[18px] text-[12px] leading-[16px] px-[8px]',
		md: 'h-[24px] text-[12px] leading-[16px] px-[8px]'
	};
</script>

<!-- Carbon Read-Only Tag -->
<span class="inline-flex items-center rounded-full tracking-[0.32px] font-normal {variants[difficulty]} {sizes[size]}">
	{labels[difficulty]}
</span>
