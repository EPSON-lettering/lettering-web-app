'use client';

import React, { useState, useEffect } from 'react';
import useUser from "@/hooks/useUser";
import MatchingProcessingLogo from "@public/icon/matching.svg";
import Typo from "@/components/common/Typo";
import MobileCamera from "@/components/Camera";
import Button from "@/components/common/Button";
import Server from "@public/services/api";
import { MatchResponse } from "@public/services/api/MatchingService";
import useMatchingProcess from "@/hooks/useMatchingProcess";
import { useRouter } from "next/navigation";

const MatchingProcess = () => {
	const { user } = useUser();
	const { setMatchDetails } = useMatchingProcess();

	useEffect(() => {
		(async () => {
			if (!user) return;
			const res = await Server.Matching.match(user.nickname);
			setMatchDetails(res);
			await Server.Matching.matchAcceptOrReject({
				request_id: res.id,
				action: 'accept',
			});
		})();
	}, []);

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
