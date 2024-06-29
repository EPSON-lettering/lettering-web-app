'use client';

import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import React from "react";
import UserFeed from "@/pages/UserFeed";
import useLetterListQuery from "@/hooks/query/useLetterListQuery";


export default function MyFeed() {
	const { user } = useUser();
	const { letters, loadingLetters } = useLetterListQuery(user);

	if (!user || loadingLetters) return <Loading loading={!(!user) || loadingLetters} />;

	return <UserFeed user={user} letters={letters} />;
}
