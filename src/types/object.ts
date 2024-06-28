export interface Interest {
	id: number;
	image?: string;
	name: string;
}

export enum LetterWritingStatus {
	BEFORE = 0,
	PROCESSING = 1,
	COMPLETED = 2,
}

export interface User {
	id: number;
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
	sendingLetterCount: number;
	level: number;
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


export interface Letter {
	id: number;
	imageUrl: string;
	isRead: boolean;
	createdAt: string;
	owner: {
		id: number;
		nickname: string;
		profileImageUrl?: string;
	}
}


export interface Feedback {
	id: number;
	image: string;
	sender: User;
	receiver: User;
	letter: Letter;
	message?: string;
	type: string;
	createdAt: string;
	latestReply?: Reply;
}

export interface Reply {
	id: number;
	comment: Feedback;
	sender: User;
	receiver: User;
	message: string;
	createdAt:string;
}

export interface Notification {
	id: number;
	message: string;
	createdAt: string;
	isRead: boolean;
}