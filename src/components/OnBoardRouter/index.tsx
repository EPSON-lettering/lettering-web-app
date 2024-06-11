'use client';

import React, { useEffect } from 'react';
import OnBoarding from "@/components/OnBoarding";
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import { useRouter } from "next/navigation";

const OnBoardRouter = () => {
	const sessionStore = useSessionStore();
	const complete = sessionStore.boolean(sessionStore.get(SessionItem.ON_BOARD));
	const router = useRouter();

	useEffect(() => {
		if (!complete) return;
		router.push('/');
	}, [complete]);

	return (
			<div className="h-full">
				<OnBoarding />
			</div>
	);
};

export default OnBoardRouter;
