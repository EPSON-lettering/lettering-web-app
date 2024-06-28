'use client';

import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import React from "react";
import UserFeed from "@/pages/UserFeed";
import useLetterListQuery from "@/hooks/query/useLetterListQuery";
import useUserBadges from "@/hooks/useUserBadges";


export default function MyFeed() {
	const { userBadges,loading } = useUserBadges();
	const { user } = useUser();
	const { letters, loadingLetters } = useLetterListQuery(user);
	if (!user || loadingLetters) return <Loading loading={!(!user) || loadingLetters} />;
	if (loading || !userBadges) return <Loading loading={loading}/>;

	return <UserFeed user={user} letters={letters}  userBadge={userBadges}/>;
}
