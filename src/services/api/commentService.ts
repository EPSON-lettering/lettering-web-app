import { jsonClient } from "@/services/api/client";
import { Feedback, Reply } from "@/types/object";

export interface CreateCommentRequest {
	type: 'feedback' | 'chat';
	message?: string;
	image?: string;
}

export interface CreateReplyRequest {
	message?: string;
}

export interface CommentService {
	getFeedbacks: (letterId: number) => Promise<Feedback[]>;
	createFeedback: (letterId: number, body: CreateCommentRequest) => Promise<Feedback>;
	getReplies: (commentId: number) => Promise<Reply[]>;
	createReply: (commentId: number, body: CreateReplyRequest) => Promise<any>;
}

const URL = '/comment';

const commentService: CommentService = {
	getFeedbacks: letterId => jsonClient.get(`${URL}/comments/${letterId}/`),
	createFeedback: (letterId, body) => {
		const formData = new FormData();
		Object.entries(body).forEach(([key, value]) => {
			formData.append(key, value);
		});
		return jsonClient.post(`${URL}/comments/${letterId}/`, formData, {
			headers: {
				"Content-Type": 'multipart/form-data',
			},
		});
	},
	getReplies: commentId => jsonClient.get(`${URL}/replies/${commentId}/`),
	createReply: (commentId, body) => jsonClient.post(`${URL}/replies/${commentId}/`, body),
};

export default commentService;
