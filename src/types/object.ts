export interface Interest {
	id: number;
	image?: string;
	name: string;
}

export interface UserNonSerialize {
	oauth_id: number;
	nickname: string;
	email: string;
	profile_image_url: string;
	created_at: string;
	withdraw_at?: string;
	language: any;
	printer_status: boolean;
	is_loggined: boolean;
	withdraw_reason?: string;
}

export interface User {
	oauthId: number;
	nickname: string;
	email: string;
	profileImageUrl: string;
	createdAt: string;
	withdrawAt?: string;
	language: any;
	printerStatus: boolean;
	isLoggined: boolean;
	withdrawReason?: string;
}

export interface Language {
	id: number;
	langName: string;
}
