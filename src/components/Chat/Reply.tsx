import React from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";
import Typo from "@/components/common/Typo";
import { Reply as ReplyType } from "@/types/object";
import clsx from "clsx";
import useUser from "@/hooks/useUser";

interface ReplyProps {
	reply: ReplyType;
}


const Reply: React.FC<ReplyProps> = ({ reply }) => {
	const { user } = useUser();
	const profileColor = (() => {
		if (reply.sender.id === user?.id)
			return user?.noneProfileColor;
		return reply.receiver.noneProfileColor;
	})();

	return (
		<div className={
			clsx([
				'w-full flex flex-col py-5',
			])
		}>
			<div className="flex gap-x-[10px]">
				<NoneProfile color={profileColor} replaceIcon={<SP />} className="w-[42px] h-[42px]" />
				<section className="flex flex-col w-full">
					<Typo bold>{reply.sender.nickname}</Typo>
					<div className="w-3/4 pt-1">
						<Typo>{reply.message}</Typo>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Reply;
