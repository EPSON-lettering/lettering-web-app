'use client';

import React, { HTMLAttributes } from 'react';
import useMatchingProcess from "@/hooks/useMatchingProcess";
import Button from "@/components/common/Button";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import { useRouter } from "next/navigation";
import { MatchUser } from "@/services/api/MatchingService";

const FoundMatch = () => {
	const { matchDetails } = useMatchingProcess();
	const router = useRouter();
	const interestCount = matchDetails?.duplicateInterests.length ?? 0;

	if (!matchDetails) return null;

	return (
			<div className="Scroller">
				<div className="PageLayout">
					<section className="py-[80px] flex gap-x-5 justify-center">
						<User user={matchDetails.requester} />
						<User user={matchDetails.receiver} />
					</section>

					<section className="w-full flex flex-wrap gap-x-3 py-[46px]">
						<div className="w-full flex-all-center">
							<nav className="w-full flex gap-2 flex-wrap">
								{matchDetails.duplicateInterests.map(interest => (
										<Button
												key={interest.id}
												shape="round"
												size="fit"
												className="px-[5px] py-[2px]"
												icon={{
													leftIcon: <img src={interest.image} />,
												}}
										>
											{interest.name}
										</Button>
								))}
							</nav>

							<Typo color="gray2" className="pt-[30px]" bold>{matchDetails.receiver.nickname} 님의 관심사와 {interestCount}개 일치합니다.</Typo>
						</div>
					</section>

					<section className="flex-all-center text-center py-[100px] flex-1">
						<Typo size="19" bold>축하드려요!</Typo>
						<div className="flex items-center gap-x-2">
							<Typo size="19" color="yellow" bold>{matchDetails.receiver.nickname}</Typo>
							<Typo size="19" bold>님과 매칭이 완료 되었습니다!</Typo>
						</div>
					</section>

					<section className="pb-[50px]">
						<Button
								size="full"
								onClick={() => router.push('/match')}
						>
							편지 쓰러 가기
						</Button>
					</section>
				</div>
			</div>

	);
};

const User: React.FC<{ user: MatchUser } & HTMLAttributes<HTMLDivElement>> = ({ user, ...props }) => {
	return (
			<nav className="flex flex-col items-center" {...props}>
				<NoneProfile className="w-[120px] h-[120px] rounded-[99px]" />
				<Typo size="16" className="pt-[10px]" bold>{user.nickname}</Typo>
			</nav>
	)
};

export default FoundMatch;
