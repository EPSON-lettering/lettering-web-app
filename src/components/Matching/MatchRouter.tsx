'use client';

import React from 'react';
import MatchingProcess from "@/components/Matching/MatchingProcess";
import Loading from "@/components/common/Loading";
import LetterStatusOnMatch from "@/components/Matching/LetterStatusOnMatch";
import useCheckHasMatchingQuery from "@/hooks/query/useCheckHasMatchingQuery";

const MatchRouter = () => {
	const { isMatch, loadingHasMatching, isFetched } = useCheckHasMatchingQuery();

	if (loadingHasMatching) return <Loading loading={loadingHasMatching} />
	if (!isFetched) return null;

	return (
			<div className="flex flex-col h-full justify-between flex-1">
				{!isMatch && <MatchingProcess />}
				{isMatch && <LetterStatusOnMatch />}
			</div>
	);
};

export default MatchRouter;
