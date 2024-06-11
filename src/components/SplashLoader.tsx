'use client';

import React from 'react';
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import FirstLoading from "@/pages/FirstLoading";
import Login from "@/pages/Login";

const SplashLoader = () => {
	const sessionStore = useSessionStore();
	const splashDone: boolean = sessionStore.boolean(sessionStore.get(SessionItem.SPLASH));

	return (
			<>
				{!splashDone && <FirstLoading />}
				{splashDone && <Login />}
			</>
	);
};

export default SplashLoader;
