'use client';

import UserFeed from "@/pages/UserFeed";
import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";

export default function FeedPage() {
	const { data, isLoading } = useQuery({
		queryKey: ['opponent-getter'],
		queryFn: Server.Matching.getMatchingOpponent,
	});

	if (!data || isLoading) return <Loading loading={isLoading} />;

	return <UserFeed user={data} />;
}
