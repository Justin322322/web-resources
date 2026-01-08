import { 
	Globe, 
	Monitor, 
	Server, 
	Rocket, 
	ShieldCheck, 
	Zap, 
	Folder 
} from 'lucide-svelte';

// Import images properly for Vite bundling
import fundamentalImg from '$lib/assets/fundamental.png';
import frontendImg from '$lib/assets/frontend.png';
import backendImg from '$lib/assets/backend.png';
import devopsImg from '$lib/assets/devops.png';
import securityImg from '$lib/assets/security.png';
import performanceImg from '$lib/assets/performance.png';

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
	fundamentals: fundamentalImg,
	frontend: frontendImg,
	backend: backendImg,
	devops: devopsImg,
	security: securityImg,
	performance: performanceImg
};

export function getImageForCategory(categoryId: string): string {
	return categoryImages[categoryId] || fundamentalImg;
}

