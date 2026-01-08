import fundamentalsData from './fundamentals.json';
import frontendData from './frontend.json';
import backendData from './backend.json';
import devopsData from './devops.json';
import securityData from './security.json';
import performanceData from './performance.json';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Topic {
	id: string;
	title: string;
	description: string;
	difficulty: Difficulty;
	category: string;
	content?: string;
	videoId?: string;
	image?: string;
	resources?: { title: string; url: string; }[];
}

export interface Category {
	id: string;
	name: string;
	description: string;
	topics: Topic[];
}

export const categories: Category[] = [
	fundamentalsData as Category,
	frontendData as Category,
	backendData as Category,
	devopsData as Category,
	securityData as Category,
	performanceData as Category
];

export function getCategoryById(id: string): Category | undefined {
	return categories.find(cat => cat.id === id);
}

export function getAllTopics(): Topic[] {
	return categories.flatMap(cat => cat.topics);
}

export function getTopicsByDifficulty(difficulty: Difficulty): Topic[] {
	return getAllTopics().filter(topic => topic.difficulty === difficulty);
}
