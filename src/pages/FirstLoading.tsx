'use client';

import React, { useEffect } from 'react';
import LoadingLogo from "@public/logo/loading-logo.svg";
import LetterText from "@public/letter-u.svg";
import { useRouter } from "next/navigation";

const FirstLoading: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push("/main");
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
