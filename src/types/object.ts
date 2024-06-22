export interface Interest {
	id: number;
	image?: string;
	name: string;
}

export enum LetterWritingStatus {
	BEFORE = 0,
	PROCESSING = 1
}

export interface User {
	oauthId: number;
	nickname: string;
	email: string;
	profileImageUrl: string;
	createdAt: string;
	interests: Interest[];
	withdrawAt?: string;
	language: Language;
	printerStatus: boolean;
	isLoggined: boolean;
	withdrawReason?: string;
	epsonEmail?: string;
	status: LetterWritingStatus;
}

export interface Language {
	id: number;
	langName: string;
}

export interface Question {
	id: number;
	text: string;
	engText: string;
}
