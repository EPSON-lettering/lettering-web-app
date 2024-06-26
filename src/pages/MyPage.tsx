'use client';

import React from 'react';
import useUser from "@/hooks/useUser";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import RightArrow from "@public/icon/right-arrow-yello.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NoneProfile from "@/components/common/NoneProfile";

const MyPage = () => {
	const { user } = useUser();
	const uploadedProfileImage = !!user?.profileImageUrl;

	if (!user) return null;

	return (
			<div className="flex-1 col-center px-[16px]">
				<section className="flex-all-center gap-y-3 py-[60px]">
					{uploadedProfileImage && (
						<Image
								src={user.profileImageUrl}
								className="avatar w-[52px] h-[52px] md:w-[130px] md:h-[130px]"
								alt="user profile image"
						/>
					)}
					{!uploadedProfileImage && <NoneProfile color={user.noneProfileColor} className="w-[72px] h-[72px] md:w-[130px] md:h-[130px]" />}
					<Typo size="25" bold>{user.nickname}</Typo>
				</section>

				<section className="flex flex-wrap gap-2 pb-[60px]">
					{user.interests.map(item => (
						<Button
								key={item.id}
								icon={{ leftIcon: <img src={item.image} /> }}
								shape="round"
								size="fit"
						>
							<Typo>{item.name}</Typo>
						</Button>
					))}
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
