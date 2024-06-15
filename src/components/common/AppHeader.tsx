'use client';

import React, { useEffect } from 'react';
import AppHeaderLogo from "@public/icon/header-lettering.svg";
import { usePathname, useRouter } from "next/navigation";
import BackIcon from "@public/icon/back.svg";
import { create } from "zustand";

const noRenderList: string[] = [
 '/',
 '/on-board',
];

interface UseHeaderStates {
	back: boolean;
	showBack: () => void;
	hideBack: () => void;
	defaultCallback: () => void;
	setDefaultCallbacks: (cb: () => void) => void;
	close: boolean;
	closeFn: () => void;
	setCloseFn: (cb: () => void) => void;
	showClose: () => void;
	hideClose: () => void;
	backFn: () => void;
	setBackFn: (cb: () => void) => void;
}

export const useHeader = create<UseHeaderStates>(set => ({
	back: true,
	close:false,
	showBack: () => set({ back: true }),
	hideBack: () => set({ back: false }),
	showClose: () => set({ close: true }),
	hideClose: () => set({ close: false }),
	closeFn: () => {},
	backFn: () => {},
	setBackFn: (cb) => set({ backFn: cb}),
	setCloseFn: (cb) => set({ closeFn: cb}),
	defaultCallback: () => {},
	setDefaultCallbacks: (cb) => set({ defaultCallback: cb }),
}));


const AppHeader: React.FC = () => {
	const pathname = usePathname();
	const router = useRouter();
	const {
		back, close, setBackFn,
		setCloseFn, backFn, closeFn,
		setDefaultCallbacks
	} = useHeader();

	const noRender = pathname ? noRenderList.includes(pathname) : false;

	console.log('Header Rerender!');

	const goBack = () => router.back();

	useEffect(() => {
		setCloseFn(goBack);
		setBackFn(goBack);
		setDefaultCallbacks(() => {
			setCloseFn(goBack);
			setBackFn(goBack);
		});
	}, []);

	if (noRender) return null;

	return (
			<header className="header w-full">
				<section>
					{back && (
						<button onClick={e => {
							console.log("back button clicked");
							backFn();
						}}>
							<BackIcon />
						</button>
					)}
				</section>

				<section className="w-full flex justify-center">
					<button onClick={() => router.push('/')}>
						<AppHeaderLogo />
					</button>
				</section>

				<section>
				</section>
			</header>
	);
};

export default AppHeader;
