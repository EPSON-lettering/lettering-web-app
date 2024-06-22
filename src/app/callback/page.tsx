'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";

const OAuthCallbackPage = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!searchParams) return;
		(async () => {
			const authCode = searchParams.get('code');
			window.opener.postMessage({ authCode });
			window.close();
		})();
	}, [searchParams]);

	return null;
};

export default OAuthCallbackPage;
