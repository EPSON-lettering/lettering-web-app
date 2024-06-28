import React from 'react';
import { Feedback } from "@/types/object";
import clsx from "clsx";
import SP from "@public/icon/user-small-white.svg";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

interface ChatProps {
	chat: Feedback;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
	const router = useRouter();
	const { user } = useUser();
	const isTextMessage = chat?.message && !chat.image;
	const profileColor = (() => {
		if (chat.sender.id === user?.id)
			return user?.noneProfileColor;
		return chat.receiver.noneProfileColor;
	})();
	const replyColor = (() => {
		const target = chat?.latestReply;
		if (target?.sender.id === user?.id)
			return user?.noneProfileColor;
		return target?.receiver.noneProfileColor;
	})() ?? '';

	return (
			<div className={
				clsx([
						'w-full flex flex-col py-5',
				])
			}>
				<div className="flex gap-x-[10px]">
					<NoneProfile color={profileColor} replaceIcon={<SP />} className="w-[42px] h-[42px]" />
					<section className="flex flex-col w-full">
						<Typo bold>{chat.sender.nickname}</Typo>
						{!isTextMessage && (
								<section className="w-3/4 max-w-3/4 border rounded-lg border-letter-yellow">
									<img src={chat.image} alt={chat.image} className="w-full h-full px-5 py-7 rounded-lg" />
								</section>
						)}
						{isTextMessage && (
								<div className="w-3/4 pt-1.5">
									<Typo>{chat.message}</Typo>
								</div>
						)}
					</section>
				</div>

				<section>
					<div
						className="flex gap-x-[5px] pl-[52px] pt-2 items-center cursor-pointer"
						onClick={() => router.push(`/letter/reply/${chat.id}`)}
					>
						<NoneProfile color={replyColor} replaceIcon={<SP />} className="w-[21px] h-[21px]" />
						{!chat?.latestReply && (
								<div>
									<Typo color="gray" className="underline underline-offset-2">답글을 달아보세요.</Typo>
								</div>
						)}
						{chat?.latestReply && (
								<Typo>{chat.latestReply.message}</Typo>
						)}
					</div>

				</section>

			</div>
	);
};

export default Chat;
