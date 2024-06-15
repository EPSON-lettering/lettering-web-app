'use client';

import React from 'react';
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import FirstLoading from "@/pages/FirstLoading";
import Login from "@/pages/Login";
import useUser from "@/hooks/useUser";
import MatchRouter from "@/components/Matching/MatchRouter";

const SplashLoader = () => {
	const { user } = useUser();
	const sessionStore = useSessionStore();
	const splashDone: boolean = sessionStore.boolean(sessionStore.get(SessionItem.SPLASH));

	return (
			<>
				{(!splashDone && !user) && <FirstLoading />}
				{(splashDone && !user) && <Login />}
				{user && <MatchRouter />}
			</>
	);
};

export default SplashLoader;
