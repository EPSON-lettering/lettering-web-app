import { jsonClient } from "@/services/api/client";

export interface CommentService {
	getFeedbacks: (letterId: number) => Promise<any>;
	createFeedback: (letterId: number, body: any) => Promise<any>;
	getReplies: (commentId: number) => Promise<any>;
	createReply: (commentId: number, body: any) => Promise<any>;
}

const URL = '/comment';

const commentService: CommentService = {
	getFeedbacks: letterId => jsonClient.get(`${URL}/comments/${letterId}`),
	createFeedback: (letterId, body) => jsonClient.post(`${URL}/comments/${letterId}`, body),
	getReplies: commentId => jsonClient.get(`${URL}/replies/${commentId}`),
	createReply: (commentId, body) => jsonClient.post(`${URL}/replies/${commentId}`, body),
};

export default commentService;
