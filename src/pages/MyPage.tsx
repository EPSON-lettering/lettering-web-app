'use client';

import React from 'react';
import useUser from "@/hooks/useUser";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import RightArrow from "@public/icon/right-arrow-yello.svg";
import { useRouter } from "next/navigation";

const MyPage = () => {
	const { user } = useUser();
	return (
			<div className="flex-1 col-center px-[16px]">
				<section className="flex-all-center gap-y-3 py-[60px] ">
					<div className="avatar bg-violet-400" />
					<Typo size="47" bold>lalal</Typo>
				</section>

				<section className="flex flex-wrap gap-x-2 pb-[60px]">
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
					<Button shape="round" size="fit">
						<Typo>패션</Typo>
					</Button>
				</section>

				<section className="box w-full">
					<Menu name="회원정보 수정하기" to="/my/details" />
					<div className="horizontal-divider" />
					<Menu name="매칭 관리하기" to="/my/match" />
					<div className="horizontal-divider" />
					<Menu name="1:1 문의하기" to="/my/qa" />
				</section>
			</div>
	);
};


type MenuProps = {
	name: string;
	to: string;
}

const Menu: React.FC<MenuProps> = ({ name, to }) => {
	const router = useRouter();
	const onClickRedirect = () => router.push(to);
	return (
			<button onClick={onClickRedirect} className="flex w-full justify-between px-4 py-6">
				<Typo bold>{name}</Typo>
				<RightArrow />
			</button>
	);
};


export default MyPage;
