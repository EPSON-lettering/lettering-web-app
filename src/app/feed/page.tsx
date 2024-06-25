'use client';

import UserFeed from "@/pages/UserFeed";
import Loading from "@/components/common/Loading";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import Typo from "@/components/common/Typo";
import useLetterListQuery from "@/hooks/query/useLetterListQuery";

export default function FeedPage() {
	const [noOpponent, setNoOpponent] = useState(false);
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['opponent-getter'],
		queryFn: Server.Matching.getMatchingOpponent,
		enabled: !noOpponent,
		refetchInterval: false,
		retry: false,
	});
	const { letters, loadingLetters } = useLetterListQuery(data);

	useEffect(() => {
		console.log({error})
		if (!error) return;
		const err = error as any as { code: number };
		if (err.code === 404) {
			setNoOpponent(true);
		}
	}, [error]);

	if (noOpponent) {
		return (
				<div className="PageLayout">
					<section className="py-[200px] flex-all-center">
						<Typo color="gray2" size="19">현재 매칭상대가 없습니다</Typo>
					</section>
				</div>
		)
	}

	const loading = isLoading || loadingLetters;

	if (!data || loading) return <Loading loading={loading} />;

	return (
		<div className="Scroller">
			<UserFeed user={data} letters={letters} />
		</div>
	);
}
