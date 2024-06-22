'use client';

import React from 'react';
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import Loading from "@/components/common/Loading";
import Typo from "@/components/common/Typo";
import ChatInputBox from "@/components/Chat/ChatInputBox";
import Reply from "@/components/Chat/Reply";

export default function ReplyPage() {
	const params = useParams<{ id: string }>();
	const { data: replies = [], isLoading, refetch } = useQuery({
		queryKey: ['feedbacks-getter'],
		queryFn: () => Server.Comment.getReplies(Number(params?.id)),
		enabled: !!params?.id
	});

	const reload = () => refetch();
	const empty = replies.length === 0;

	if (isLoading || !params?.id) return <Loading loading={isLoading} />;

	return (
		<div className="PageLayout">
			{empty && (
				<section className="flex flex-col items-center flex-1 pt-[200px]">
					<Typo size="25" bold>아직 답장이 없습니다.</Typo>
					<Typo size="16">답장을 시작해보세요.</Typo>
				</section>
			)}
			{!empty && (
					<section className="relative h-full w-full">
						<section className="absolute flex w-full flex-col h-full max-h-full overflow-y-scroll overflow-x-hidden">
							{replies.map(reply => (
									<Reply key={reply.id} reply={reply} />
							))}
						</section>
					</section>
			)}
			<section className="w-full h-fit pb-[40px]">
				<ChatInputBox mode="reply" id={params.id} reloadFn={reload} />
			</section>
		</div>
	);
}
