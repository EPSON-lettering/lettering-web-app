'use client';

import React, { useState, useEffect, useRef } from 'react';
import useUser from "@/hooks/useUser";
import MatchingProcessingLogo from "@public/icon/matching.svg";
import Typo from "@/components/common/Typo";
import MobileCamera from "@/components/Camera";
import Button from "@/components/common/Button";
import Server from "@public/services/api";
import { MatchResponse, MatchConnected } from "@public/services/api/MatchingService";
import useMatchingProcess from "@/hooks/useMatchingProcess";
import { useRouter } from "next/navigation";
import useCheckHasMatchingQuery from "@/hooks/query/useCheckHasMatchingQuery";


class Fetcher {

	private static fetched: boolean = false;

	public async match(nickname: string) {
		if (Fetcher.fetched) return;
		Fetcher.fetched = true;
		const res = await Server.Matching.match(nickname);
		const match = await Server.Matching.matchAcceptOrReject({
			request_id: res.id,
			action: 'accept',
		});
		this.rest();
		return { matchRequest: res, match };
	}

	private rest() {
		setTimeout(() => {
			Fetcher.fetched = false;
		}, 500);
	}

}

const MatchingProcess = () => {
	const { user } = useUser();
	const router = useRouter();
	const { setMatchDetails } = useMatchingProcess();
	const { refetch: refetchHasMatching } = useCheckHasMatchingQuery();

	useEffect(() => {
		if (!user) return;
		setTimeout(async () => {
			try {
				const fetcher = new Fetcher();
				const result = await fetcher.match(user.nickname);
				if (!result) return;
				const { matchRequest, match } = result;
				setMatchDetails(matchRequest);
				await Server.Matching.createQuestion(match.id);
				router.push('/match/done');
				await refetchHasMatching();
			} catch (error) {
				console.error(error);
			}
		}, 1200);
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
