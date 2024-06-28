import { Interest, User, Question } from "@/types/object";
import { jsonClient } from "@/services/api/client";

interface MatchingService {
	match: (nickname: string) => Promise<MatchResponse>;
	matchAcceptOrReject: (req: MatchAccOrRejRequest) => Promise<MatchConnected>;
	getMyMatchingDetails: () => Promise<MatchingManagementDetailsResponse>;
	getMatchingSimpleList: () => Promise<LetterMatchResponse[]>;
	disconnect: (matchId: number, reason: string) => Promise<void>;
	getQuestion: (matchId: number) => Promise<Question>;
	createQuestion: (matchId: number) => Promise<Question>;
	getMatchingOpponent: () => Promise<User>;
}

interface MatchingManagementDetailsResponse {
	id: number;
	acceptor: {
		id: number;
		nickname: string;
		profileImageUrl: string;
		language: number;
		noneProfileColor: string;
	}
	createdAt: string;
	interests: Interest[];
}

export interface MatchAccOrRejRequest {
	action: 'accept' | 'reject';
	request_id: number;
}

export interface MatchConnected {
	id: number;
	requester: MatchUser;
	acceptor: MatchUser;
	state: boolean;
	createdAt: string;
	withdrawReason?: string;
}

export interface MatchUser {
	id: number;
	nickname: string;
	profileImageUrl: string;
	language: string;
	noneProfileColor: string;
}

export interface MatchResponse {
	id: number;
	requester: MatchUser;
	receiver: MatchUser;
	state: boolean,
	createdAt: string;
	duplicateInterests: Interest[]
}

export interface LetterMatchResponse {
	id: number;
	acceptor: User
	createdAt: string;
	state: boolean;
	withdrawReason?: string;
}

const URL = '/match';

const matchingService: MatchingService = {
	match: (nickname) => jsonClient.post(`${URL}/`, { nickname }),
	matchAcceptOrReject: ({ action, request_id }) => jsonClient.post(`${URL}/request/${request_id}/${action}/`),
	getMyMatchingDetails: () => jsonClient.get(`${URL}/details/`),
	getMatchingSimpleList: () => jsonClient.get(`${URL}/list/`),
	getMatchingOpponent: () => jsonClient.get(`${URL}/opponent/`),
	disconnect: (matchId, reason) => jsonClient.post(`${URL}/end/${matchId}/`, { reason }),

	getQuestion: (matchId) => jsonClient.get(`${URL}/question/${matchId}/`),
	createQuestion: (matchId) => jsonClient.post(`${URL}/question/${matchId}/`),
};

export default matchingService;
