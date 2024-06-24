'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { BroadcastChannel } from "broadcast-channel";

const LoginChannel = new BroadcastChannel("LOGIN");

const OAuthCallbackPage = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams) return;
		(async () => {
			const authCode = searchParams.get('code');
			await LoginChannel.postMessage({ authCode });
			window.close();
		})();
	}, [searchParams]);

	return null;
};

export default OAuthCallbackPage;
