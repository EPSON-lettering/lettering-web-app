'use client';

import React from 'react';
import MatchingProcess from "@/components/Matching/MatchingProcess";
import Loading from "@/components/common/Loading";
import LetterStatusOnMatch from "@/components/Matching/LetterStatusOnMatch";
import useCheckHasMatchingQuery from "@/hooks/query/useCheckHasMatchingQuery";
import useUser from "@/hooks/useUser";
import { LetterWritingStatus } from "@/types/object";
import LetterOnWriting from "@/components/Matching/LetterOnWriting";

const ing = [LetterWritingStatus.COMPLETED, LetterWritingStatus.BEFORE];

const MatchRouter = () => {
	const { user } = useUser();
	const { isMatch, loadingHasMatching, isFetched } = useCheckHasMatchingQuery();
	const userWritingStatus: number | undefined = user?.status;

	if (loadingHasMatching) return <Loading loading={loadingHasMatching} />
	if (!isFetched) return null;

	return (
			<div className="flex flex-col h-full justify-between flex-1">
				{!isMatch && <MatchingProcess />}
				{(isMatch && userWritingStatus && ing.includes(userWritingStatus)) && <LetterStatusOnMatch />}
				{(isMatch && userWritingStatus === LetterWritingStatus.PROCESSING) && <LetterOnWriting />}
			</div>
	);
};

export default MatchRouter;
