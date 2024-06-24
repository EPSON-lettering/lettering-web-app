'use client';

import React, { useState, useEffect, useRef } from 'react';
import useUser from "@/hooks/useUser";
import MatchingProcessingLogo from "@public/icon/matching.svg";
import Typo from "@/components/common/Typo";
import Server from "@/services/api";
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
	const { setMatchDetails } = useMatchingProcess.getState();
	const { refetch: refetchHasMatching } = useCheckHasMatchingQuery();
	const [notFound, setNotFound] = useState(false);
	const didMount = useRef(false);

	useEffect(() => {
		if (!user) return;
		if (didMount.current) return;
		didMount.current = true;
		setTimeout(async () => {
			try {
				const matchRequest = await Server.Matching.match(user.nickname);
				const match = await Server.Matching.matchAcceptOrReject({
					request_id: matchRequest.id,
					action: 'accept',
				});
				setMatchDetails(matchRequest);
				router.push('/match/done');
				await Server.Matching.createQuestion(match.id);
				await refetchHasMatching();
			} catch (error: unknown) {
				console.error(error);
				const err = error as { code: number };
				if (err.code === 404) {
					setNotFound(true);
				}
			}
		}, 1200);
	}, []);

	if (notFound) {
		return (
				<div className="flex-1">
					<section className="flex-all-center py-[200px]">
						<Typo size="25" bold>현재 적절한 매칭상대가 없어요 :(</Typo>
						<Typo size="19" color="gray2" bold>잠시 후 다시시도해주세요</Typo>
					</section>
				</div>
		)
	}

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
