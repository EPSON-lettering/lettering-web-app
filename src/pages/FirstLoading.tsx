'use client';

import React, { useEffect } from 'react';
import LoadingLogo from "@public/logo/loading-logo.svg";
import LetterText from "@public/letter-u.svg";
import { useRouter } from "next/navigation";
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";

const FirstLoading: React.FC = () => {
	const router = useRouter();
	const [getItem, setItem] = useSessionStore();

	useEffect(() => {
		setItem(SessionItem.SPLASH, 'true');
		const onBoardComplete = getItem(SessionItem.ON_BOARD);
		setTimeout(() => {
			if (!onBoardComplete) {
				return router.push('/on-board');
			}
			router.push('/');
		}, 2000);
	}, []);

	return (
			<main className="w-full flex-all-center h-full">
				<article className="flex flex-col items-center gap-y-[32px] mb-[60px]">
					<LoadingLogo />
					<LetterText />
				</article>
			</main>
	);
};

export default FirstLoading;
