'use client';

import React from 'react';
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import FirstLoading from "@/pages/FirstLoading";

const SplashLoader = () => {
	const [getItem] = useSessionStore();
	const splashDone = getItem(SessionItem.SPLASH);
	console.log({splashDone});

	return (
			<>
				{!splashDone && <FirstLoading />}
				{splashDone && <div>hello</div>}
			</>
	);
};

export default SplashLoader;
