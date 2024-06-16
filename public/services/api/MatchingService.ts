import { jsonClient } from "@public/services/api/client";

interface MatchingService {
	match: (nickname: string) => Promise<MatchResponse>;
	matchAcceptOrReject: (req: MatchAccOrRejRequest) => Promise<MatchResponse>;
}

export interface MatchAccOrRejRequest {
	action: 'accept' | 'reject';
	request_id: number;
}

export interface MatchUser {
	id: number;
	nickname: string;
	profileImageUrl: string;
	language: string;
}

export interface MatchResponse {
	id: number;
	requester: MatchUser;
	receiver: MatchUser;
	state: boolean,
	createdAt: string;
}

const URL = '/match';

const matchingService: MatchingService = {
	match: (nickname) => jsonClient.post(`${URL}/`, { nickname }),
	matchAcceptOrReject: ({ action, request_id }) => jsonClient.post(`${URL}/request/${request_id}/${action}`),
};

export default matchingService;
