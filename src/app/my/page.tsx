'use client';

import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import React from "react";
import UserFeed from "@/pages/UserFeed";


export default function MyFeed() {
	const { user } = useUser();

	if (!user) return <Loading loading={!!user} />;

	return <UserFeed user={user} />;
}
