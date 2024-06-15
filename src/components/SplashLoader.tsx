'use client';

import React, { useEffect } from 'react';
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import FirstLoading from "@/pages/FirstLoading";
import Login from "@/pages/Login";
import useUser from "@/hooks/useUser";
import MatchRouter from "@/components/Matching/MatchRouter";
import { useRouter } from "next/navigation";

const SplashLoader = () => {
	const { user } = useUser();
	const sessionStore = useSessionStore();
	const router = useRouter();
	const splashDone: boolean = sessionStore.boolean(sessionStore.get(SessionItem.SPLASH));

	useEffect(() => {
		if (!user) return;
		router.push('/match');
	}, []);

	return (
			<>
				{!splashDone && <FirstLoading />}
				{splashDone && <Login />}
			</>
	);
};

export default SplashLoader;
