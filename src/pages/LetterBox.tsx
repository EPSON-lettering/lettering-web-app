'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Typo from "@/components/common/Typo";
import NoneProfile from "@/components/common/NoneProfile";
import SmallWhitePerson from "@public/icon/user-small-white.svg";


interface MatchedUserProps {
	profileUrl?: string;
	nickname: string;
	date: string;
}

const MatchedUser: React.FC<MatchedUserProps> = ({ profileUrl, date, nickname }) => {
	const router = useRouter();

	return (
			<Button
				theme="ghost"
				shape="round"
				className="w-full py-[10px] px-[16px] h-[58px]"
			>
				<section className="w-full flex justify-between items-center">
					<section className="flex gap-x-[28px] items-center h-[36px]">
						{profileUrl && <img src={profileUrl} className="w-[36px] h-[36px] rounded-[99px]" />}
						{!profileUrl &&
								<NoneProfile
									replaceIcon={<SmallWhitePerson />}
									className="w-[36px] h-[36px]"
						/>}
						<Typo size="16" bold>{nickname}</Typo>
					</section>
					<section>
						<Typo color="gray">{date}</Typo>
					</section>
				</section>

			</Button>
	);
};

const LetterBox = () => {
	return (
			<div className="pt-[65px] px-[19px] w-full h-full flex-1 flex flex-col gap-y-[18px]">
				<MatchedUser nickname="상대방 닉네임1" date="2024-06-09" />
				<MatchedUser nickname="상대방 닉네임2" date="2024-06-09" />
				<MatchedUser nickname="상대방 닉네임3" date="2024-06-09" />
			</div>
	);
};

export default LetterBox;
