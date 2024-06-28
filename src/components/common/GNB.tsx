'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Typo from "@/components/common/Typo";

import HomeActive from "@public/icon/home_active.svg";
import HomeInActive from "@public/icon/home_inactive.svg";
import LetterActive from "@public/icon/letter_active.svg";
import LetterInActive from "@public/icon/letter_inactive.svg";
import MyPageActive from "@public/icon/mypage_active.svg";
import MyPageInActive from "@public/icon/mypage_inactive.svg";
import useNotificationsQuery from "@/hooks/query/useNotificationsQuery";
import NotiAlert from "@/components/common/NotiAlert";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Server from "@/services/api";

const noRenderUrls: string[] = ['/', '/sign-up', '/on-board'];

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
	const notify = (m: string) => toast(m);
	const { cacheStore } = useNotificationsQuery(notify);
	const newNotiCount = cacheStore.size;

	const onClickHome = () => {
		router.push('/match');
	};

	const onClickmatchingFeed = async () => {
		router.push('/feed');
	};

	const onClickMyPage = async () => {
		const ids = Array.from(cacheStore.keys());
		cacheStore.clear();
		await Server.Notification.read(ids);
		router.push('/my');
	};

	useEffect(() => {
		if (pathname === '/match') {
			setNavItem(NavItem.HOME);
		}

		if (pathname === '/feed') {
			setNavItem(NavItem.LETTER);
		}

		if (pathname === '/my') {
			setNavItem(NavItem.MYPAGE);
		}
	}, [pathname]);

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
				<button className="w-[80px] relative" onClick={onClickmatchingFeed}>
					<Activation
							active={navItem === NavItem.LETTER}
							activeIcon={<LetterActive />}
							icon={<LetterInActive />}
							text="상대 피드"
					>
					</Activation>
				</button>
				<button className="w-[80px] relative" onClick={onClickMyPage}>
					<Activation
							active={navItem === NavItem.MYPAGE}
							activeIcon={<MyPageActive />}
							icon={<MyPageInActive />}
							text="내 피드"
					>
					</Activation>
					<NotiAlert count={newNotiCount} />
				</button>
				<section className="absolute w-0">
					<ToastContainer position="top-center" limit={5} />
				</section>
			</nav>
	);
};

export default GlobalNavBar;
