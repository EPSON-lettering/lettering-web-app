import React from 'react';
import { Feedback } from "@/types/object";
import clsx from "clsx";
import SP from "@public/icon/user-small-white.svg";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import { useRouter } from "next/navigation";

interface ChatProps {
	chat: Feedback;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
	const router = useRouter();

	return (
			<div className={
				clsx([
						'w-full flex flex-col py-5',
				])
			}>
				<div className="flex gap-x-[10px]">
					<NoneProfile replaceIcon={<SP />} className="w-[42px] h-[42px]" />
					<section className="flex flex-col w-full">
						<Typo bold>{chat.sender.nickname}</Typo>
						<div className="w-3/4 pt-1.5">
							<Typo>{chat.message}</Typo>
						</div>
					</section>
				</div>

				<section>
					<div
						className="flex gap-x-[5px] pl-[52px] pt-2 items-center cursor-pointer"
						onClick={() => router.push(`/letter/reply/${chat.id}`)}
					>
						<NoneProfile replaceIcon={<SP />} className="w-[21px] h-[21px]" />
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
