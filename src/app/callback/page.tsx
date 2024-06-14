'use client';

import React, { useEffect } from 'react';
import { BroadcastChannel } from 'broadcast-channel';
import { useSearchParams } from "next/navigation";

const receiveChannel = new BroadcastChannel('oauth');

const OAuthCallbackPage = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams) return;
		(async () => {
			const authCode = searchParams.get('code');
			await receiveChannel.postMessage({ authCode });
			await receiveChannel.close();
			window.close();
		})();
	}, []);

	return null;
};

export default OAuthCallbackPage;
