import React from 'react';
import { Feedback } from "@/types/object";
import useUser from "@/hooks/useUser";
import clsx from "clsx";
import SP from "@public/icon/user-small-white.svg";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";

interface ChatProps {
	chat: Feedback;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
	const { user } = useUser();
	console.log({ chat });
	// const isMe = user?.id === chat.sender.id
	return (
			<div className={
				clsx([
						'w-full flex flex-col py-5',
				])
			}>
				<div className="flex gap-x-[10px]">
					<NoneProfile replaceIcon={<SP />} className="w-[42px] h-[42px]" />
					<Typo bold>{chat.sender.nickname}</Typo>
				</div>

				<div className="pl-[52px] w-3/4">
					<Typo>{chat.message}</Typo>
				</div>
			</div>
	);
};

export default Chat;
