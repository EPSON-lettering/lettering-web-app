'use client';

import React from 'react';
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import FirstLoading from "@/pages/FirstLoading";

const SplashLoader = () => {
	const sessionStore = useSessionStore();
	const splashDone: boolean = sessionStore.boolean(sessionStore.get(SessionItem.SPLASH));

	return (
			<>
				{!splashDone && <FirstLoading />}
				{splashDone && <div>hello</div>}
			</>
	);
};

export default SplashLoader;
