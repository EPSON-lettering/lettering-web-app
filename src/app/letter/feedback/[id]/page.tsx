'use client';

import React from 'react';
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import Loading from "@/components/common/Loading";
import Typo from "@/components/common/Typo";
import ChatInputBox from "@/components/Chat/ChatInputBox";
import Chat from "@/components/Chat/Chat";

export default function FeedbackPage() {
	const params = useParams<{ id: string }>();
	const { data: feedbacks = [], isLoading, refetch } = useQuery({
		queryKey: ['feedbacks-getter'],
		queryFn: () => Server.Comment.getFeedbacks(Number(params?.id)),
		enabled: !!params?.id
	});

	const reload = () => refetch();
	const empty = feedbacks.length === 0;

	if (isLoading || !params?.id) return <Loading loading={isLoading} />;

	return (
		<div className="PageLayout">
			{empty && (
				<section className="flex flex-col items-center flex-1 pt-[200px]">
					<Typo size="25" bold>아직 피드백이 없습니다.</Typo>
					<Typo size="16">피드백을 시작해보세요.</Typo>
				</section>
			)}
			{!empty && (
					<section className="relative h-full w-full">
						<section className="absolute flex w-full flex-col h-full max-h-full overflow-y-scroll overflow-x-hidden">
							{feedbacks.map(chat => (
									<Chat key={chat.id} chat={chat} />
							))}
						</section>
					</section>
			)}
			<section className="w-full h-fit pb-[40px]">
				<ChatInputBox mode="feedback" letterId={params.id} reloadFn={reload} />
			</section>
		</div>
	);
}
