'use client';

import React from 'react';
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Typo from "@/components/common/Typo";
import NoneProfile from "@/components/common/NoneProfile";
import SmallWhitePerson from "@public/icon/user-small-white.svg";
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import dayjs from "dayjs";
import Loading from "@/components/common/Loading";


interface MatchedUserProps {
	profileUrl?: string;
	nickname: string;
	date: string;
}


const LetterBox = () => {
	const { data: list = [], isLoading } = useQuery({
		queryKey: ['letter-list'],
		queryFn: Server.Matching.getMatchingSimpleList,
	});

	if (isLoading) return <Loading loading={isLoading} />;

	return (
			<div className="pt-[65px] px-[19px] w-full h-full flex-1 flex flex-col gap-y-[18px]">
				{list.map(space => (
						<MatchedUser
								key={space.id}
								nickname={space.acceptor.nickname}
								date={space.createdAt}
						/>
				))}
			</div>
	);
};

const MatchedUser: React.FC<MatchedUserProps> = ({ profileUrl, date, nickname }) => {
	const router = useRouter();
	const formattedDate = dayjs(date).format('YYYY-MM-DD');

	return (
			<Button
					theme="ghost"
					shape="round"
					className="w-full px-[16px] h-[70px] justify-start"
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
						<Typo color="gray">{formattedDate}</Typo>
					</section>
				</section>

			</Button>
	);
};

export default LetterBox;
