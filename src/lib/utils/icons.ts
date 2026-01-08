import { 
	Globe, 
	Monitor, 
	Server, 
	Rocket, 
	ShieldCheck, 
	Zap, 
	Folder 
} from 'lucide-svelte';

// Lucide icon mapping for sidebar
export const categoryIcons: Record<string, any> = {
	fundamentals: Globe,
	frontend: Monitor,
	backend: Server,
	devops: Rocket,
	security: ShieldCheck,
	performance: Zap
};

export function getIconForCategory(categoryId: string) {
	return categoryIcons[categoryId] || Folder;
}

// Category image mapping for main content
export const categoryImages: Record<string, string> = {
	fundamentals: '/src/lib/assets/fundamental.png',
	frontend: '/src/lib/assets/frontend.png',
	backend: '/src/lib/assets/backend.png',
	devops: '/src/lib/assets/devops.png',
	security: '/src/lib/assets/security.png',
	performance: '/src/lib/assets/performance.png'
};

export function getImageForCategory(categoryId: string): string {
	return categoryImages[categoryId] || '/src/lib/assets/fundamental.png';
}
