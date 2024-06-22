import React from 'react';
import NoneProfile from "@/components/common/NoneProfile";
import SP from "@public/icon/user-small-white.svg";
import Typo from "@/components/common/Typo";
import { Reply as ReplyType } from "@/types/object";
import clsx from "clsx";

interface ReplyProps {
	reply: ReplyType;
}


const Reply: React.FC<ReplyProps> = ({ reply }) => {
	return (
		<div className={
			clsx([
				'w-full flex flex-col py-5',
			])
		}>
			<div className="flex gap-x-[10px]">
				<NoneProfile replaceIcon={<SP />} className="w-[42px] h-[42px]" />
				<Typo bold>{reply.sender.nickname}</Typo>
			</div>

			<div className="pl-[52px] w-3/4">
				<Typo>{reply.message}</Typo>
			</div>
		</div>
	);
};

export default Reply;