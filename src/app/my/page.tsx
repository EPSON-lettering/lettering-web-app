'use client';

import useUser from "@/hooks/useUser";
import Loading from "@/components/common/Loading";
import Typo from "@/components/common/Typo";
import SettingIcon from "@public/icon/settings.svg";
import { useRouter } from "next/navigation";
import NoneProfile from "@/components/common/NoneProfile";
import React from "react";
import Button from "@/components/common/Button";
import GrayRightArrow from "@public/icon/gray-right-arrow.svg";
import ChatBox from "@/components/common/ChatBox";


export default function MyFeed() {
	const { user } = useUser();
	const router = useRouter();

	if (!user) return <Loading loading={!!user} />;

	return (
			<div className="flex flex-col flex-1 px-[16px]">
				<section className="w-full flex-col pt-[20px] pb-[30px] gap-y-[18px]">
					<nav className="w-full flex items-center justify-between py-5">
						<Typo size="19" bold>{user.nickname}</Typo>
						<button onClick={() => router.push('/my/settings')}>
							<SettingIcon />
						</button>
					</nav>

					<article className="box w-full p-4 UserSection">
						<section className="w-full flex items-center justify-evenly">
							{!user?.profileImageUrl && <NoneProfile className="p-4" />}
							{user?.profileImageUrl && <img src={user.profileImageUrl} />}

							<nav className="col-center">
								<Typo color="yellow" size="19" bold>LV. 1</Typo>
								<Typo color="gray2">뱃지</Typo>
							</nav>

							<nav className="col-center">
								<Typo color="yellow" size="19" bold>0</Typo>
								<Typo color="gray2">보낸 편지</Typo>
							</nav>
						</section>

						<section className="flex flex-wrap gap-x-2 pt-6">
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
					</article>

					<section className="my-[20px]">
						<ChatBox left>
							<Typo bold>편지를 작성 중 입니다!</Typo>
						</ChatBox>
					</section>

					<article className="box w-full p-4 mt-[18px]">
						<nav className="flex items-center justify-between">
							<Typo color="gray2" size="16">획득 뱃지</Typo>
							<button className="flex items-center gap-x-3">
								<Typo color="gray2" size="16">모두보기</Typo>
								<GrayRightArrow />
							</button>
						</nav>

						<div className="flex flex-col">
							<Typo>아직 획득한 뱃지가 없습니다!</Typo>
							<Typo>편지를 보내고, 뱃지를 모아보세요 :)</Typo>
						</div>
					</article>

					<article className="box w-full p-4 min-h-[230px] mt-[18px]">
						<nav className="flex items-center justify-between">
							<Typo color="gray2" size="16">보낸 편지</Typo>
							<button className="flex items-center gap-x-3">
								<GrayRightArrow />
							</button>
						</nav>

						<div className="flex flex-col">
							<Typo>아직 보낸 편지가 없습니다!</Typo>
							<Typo>편지를 보내보세요 :)</Typo>
						</div>
					</article>
				</section>
			</div>
	);
}
