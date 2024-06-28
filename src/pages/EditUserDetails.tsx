'use client';

import React from 'react';
import Image from "next/image";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import useUser from "@/hooks/useUser";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import RightArrow from "@public/icon/right-arrow-yello.svg";
import GoogleShared from "@public/icon/google-shared.svg";
import { useDialog } from "@/components/common/Dialog";
import NicknameChangeDialog from "@/components/MyPage/NicknameChangeDialog";

const EditUserDetails = () => {
	const { user, logout } = useUser();
	const router = useRouter();
	const { show: showNickDialog, open: openNickDialog, close: closeNickDialog } = useDialog();
	const uploadedProfileImage = !!user?.profileImageUrl;

	const onClickLogout = async () => {
		await logout();
		router.push('/');
	};

	const onClickWithdraw = () => router.push('/my/withdraw');

	if (!user) return null;

	return (
			<div className="PageLayout absolute">
				<section className="flex-all-center gap-y-3 py-[60px]">
					{uploadedProfileImage && (
							<img
									src={user.profileImageUrl}
									className="avatar w-[52px] h-[52px] md:w-[130px] md:h-[130px]"
									alt="user profile image"
							/>
					)}
					{!uploadedProfileImage && <NoneProfile color={user.noneProfileColor} className="w-[72px] h-[72px] md:w-[130px] md:h-[130px]" />}
					<Button
						theme="ghost"
						size="fit"
						shape="round"
						className="p-[8px]"
					>
						프로필 사진 설정하기
					</Button>
					{uploadedProfileImage && (
							<Typo className="underline cursor-pointer">현재 사진 삭제</Typo>
					)}
				</section>

				<section className="box w-full">
					<div className="flex flex-col pb-[12px]">
						<Typo bold className="text-gray-400">연결된 계정</Typo>
						<section className="flex mt-[3px]">
							<GoogleShared />
						</section>
					</div>
					<div className="horizontal-divider" />

					<div className="flex flex-col pb-[12px] py-[9px]">
						<Typo bold className="text-gray-400">닉네임</Typo>
						<section className="flex items-center mt-[6px] justify-between">
							<Typo size="16">{user.nickname}</Typo>
							<Button
									onClick={openNickDialog}
									size="fit"
									theme="ghost"
									className="px-[12px] py-[6px]"
							>
								변경하기
							</Button>
						</section>
					</div>

					<div className="horizontal-divider" />

					<div className="flex flex-col pb-[12px] py-[9px]">
						<Typo bold className="text-gray-400">관심사</Typo>
						<section className="flex items-center mt-[6px] justify-between">
							<nav className="flex gap-x-2 flex-wrap w-2/3">
								{user.interests.map(interest => (
										<li key={interest.id} className="flex items-center gap-x-1">
											{interest?.image && <img src={interest.image} />}
											<Typo size="13">{interest.name}</Typo>
										</li>
								))}
							</nav>
							<Button
									size="fit"
									theme="ghost"
									className="px-[12px] py-[6px]"
							>
								변경하기
							</Button>
						</section>
					</div>
				</section>

				<section className="box w-full mt-[20px]">
					<Menu name="로그아웃" onClick={onClickLogout} />
					<div className="horizontal-divider" />
					<Menu name="탈퇴하기" onClick={onClickWithdraw} />
				</section>

				<NicknameChangeDialog show={showNickDialog} close={closeNickDialog} />
			</div>
	);
};

type MenuProps = {
	name: string;
	onClick: () => void;
}

const Menu: React.FC<MenuProps> = ({ name, onClick }) => {
	return (
			<button onClick={onClick} className="flex w-full justify-between px-4 py-6">
				<Typo bold>{name}</Typo>
				<RightArrow />
			</button>
	);
};


export default EditUserDetails;