'use client';

import React, { ReactNode, useState } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Typo from "@/components/common/Typo";

import HomeActive from "@public/icon/home_active.svg";
import HomeInActive from "@public/icon/home_inactive.svg";
import LetterActive from "@public/icon/letter_active.svg";
import LetterInActive from "@public/icon/letter_inactive.svg";
import MyPageActive from "@public/icon/mypage_active.svg";
import MyPageInActive from "@public/icon/mypage_inactive.svg";

const noRenderUrls: string[] = ['/', '/sign-up'];

enum NavItem {
	HOME,
	LETTER,
	MYPAGE
}

interface ActivationProps {
	active: boolean;
	icon: ReactNode;
	activeIcon: ReactNode;
	text: string;
}

const Activation: React.FC<ActivationProps> = ({ active, icon, activeIcon, text }) => {
	return (
			<div className="flex-all-center gap-y-1 whitespace-nowrap">
				<section>
					{active ? activeIcon : icon}
				</section>
				<Typo color={active ? "yellow" : "gray"}>{text}</Typo>
			</div>
	)
}

const GlobalNavBar = () => {
	const [navItem, setNavItem] = useState<NavItem>(NavItem.HOME);
	const pathname = usePathname();
	const router = useRouter();
	const noRender = pathname ? noRenderUrls.includes(pathname) : false;

	const onClickHome = () => {
		setNavItem(NavItem.HOME);
		router.push('/match');
	};

	const onClickLetter = () => {
		setNavItem(NavItem.LETTER);
		router.push('/letter');
	};

	const onClickMyPage = () => {
		setNavItem(NavItem.MYPAGE);
		router.push('/my');
	};

	if (noRender) return null;

	return (
			<nav className="gnb">
				<button className="w-[80px]" onClick={onClickHome}>
					<Activation
							active={navItem === NavItem.HOME}
							activeIcon={<HomeActive />}
							icon={<HomeInActive />}
							text="홈"
					>
					</Activation>
				</button>
				<button className="w-[80px]" onClick={onClickLetter}>
					<Activation
							active={navItem === NavItem.LETTER}
							activeIcon={<LetterActive />}
							icon={<LetterInActive />}
							text="편지함"
					>
					</Activation>
				</button>
				<button className="w-[80px]" onClick={onClickMyPage}>
					<Activation
							active={navItem === NavItem.MYPAGE}
							activeIcon={<MyPageActive />}
							icon={<MyPageInActive />}
							text="마이페이지"
					>
					</Activation>
				</button>
			</nav>
	);
};

export default GlobalNavBar;
