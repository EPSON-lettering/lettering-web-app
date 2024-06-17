'use client';

import React from 'react';
import MatchingProcess from "@/components/Matching/MatchingProcess";
import useMatchingProcess from "@/hooks/useMatchingProcess";
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import Loading from "@/components/common/Loading";
import LetterStatusOnMatch from "@/components/Matching/LetterStatusOnMatch";

const MatchRouter = () => {
	const { data: { isMatch } = { isMatch: false }, isLoading } = useQuery({
		queryKey: ['checkMatch'],
		queryFn: Server.Account.checkUserHasMatching,
	});
	const { matchDetails } = useMatchingProcess();
	console.log({ isMatch, matchDetails });

	if (isLoading) return <Loading loading={isLoading} />

	return (
			<div className="flex flex-col h-full justify-between flex-1">
				{!matchDetails && !isMatch && <MatchingProcess />}
				{isMatch && <LetterStatusOnMatch />}
			</div>
	);
};

export default MatchRouter;
