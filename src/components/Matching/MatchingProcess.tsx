'use client';

import React from 'react';
import useUser from "@/hooks/useUser";
import MatchingProcessingLogo from "@public/icon/matching.svg";
import Typo from "@/components/common/Typo";

const MatchingProcess = () => {
	const { user } = useUser();

	return (
			<div className="flex flex-col items-center py-[195px] justify-between flex-1">
				<section className="flex-all-center text-center">
					<Typo size="16" bold>
						나와 비슷한 관심사를 가진
					</Typo>
					<Typo size="16" bold>상대방을 찾는 중이에요!</Typo>
				</section>
				<MatchingProcessingLogo />
				<Typo>잠시만 기다려 주세요 :)</Typo>
			</div>
	);
};

export default MatchingProcess;