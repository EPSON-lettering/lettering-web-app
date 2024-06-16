'use client';

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import MatchingProcess from "@/components/Matching/MatchingProcess";

const MatchRouter = () => {
	const { data: { isMatch } = { isMatch: false }, isLoading } = useQuery({
		queryKey: ['checkMatch'],
		queryFn: Server.Account.checkUserHasMatching,
	});

	if (isLoading) return null;

	return (
			<div className="flex flex-col h-full justify-between flex-1">
				{!isMatch && <MatchingProcess />}
			</div>
	);
};

export default MatchRouter;
