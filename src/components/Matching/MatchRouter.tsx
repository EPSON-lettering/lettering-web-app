'use client';

import React from 'react';
import MatchingProcess from "@/components/Matching/MatchingProcess";
import useMatchingProcess from "@/hooks/useMatchingProcess";
import FoundMatch from "@/components/Matching/FoundMatch";

const MatchRouter = () => {
	const { matchDetails } = useMatchingProcess();

	return (
			<div className="flex flex-col h-full justify-between flex-1">
				{!matchDetails && <MatchingProcess />}
				{matchDetails && <FoundMatch />}
			</div>
	);
};

export default MatchRouter;
