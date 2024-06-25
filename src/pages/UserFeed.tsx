import React from 'react';
import { User, Letter } from "@/types/object";
import Typo from "@/components/common/Typo";
import SettingIcon from "@public/icon/settings.svg";
import NoneProfile from "@/components/common/NoneProfile";
import Button from "@/components/common/Button";
import ChatBox from "@/components/common/ChatBox";
import GrayRightArrow from "@public/icon/gray-right-arrow.svg";
import { useRouter } from "next/navigation";
import statusService from "@/services/statusService";

interface UserFeedProps {
	user: User;
	letters: Letter[];
}

const UserFeed: React.FC<UserFeedProps> = ({ user, letters = [] }) => {
	const router = useRouter();
	const letterEmpty = letters.length === 0;


	const onClickRedirectLetterDetails = (id: number) => router.push(`/letter/${id}`);

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
								<Typo color="yellow" size="19" bold>{user.sendingLetterCount}</Typo>
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
							<Typo bold>{statusService.getWritingStatusMessage(user.status)}</Typo>
						</ChatBox>
					</section>

					<article className="box w-full p-4 mt-[18px]">
						<nav className="flex items-center justify-between">
							<Typo color="gray2" size="16">획득 뱃지</Typo>
							{/*<button className="flex items-center gap-x-3">*/}
							{/*	<Typo color="gray2" size="16">모두보기</Typo>*/}
							{/*	<GrayRightArrow />*/}
							{/*</button>*/}
						</nav>

						<div className="flex flex-col">
							<Typo>아직 획득한 뱃지가 없습니다!</Typo>
							<Typo>편지를 보내고, 뱃지를 모아보세요 :)</Typo>
						</div>
					</article>

					<nav className="flex items-center justify-between pt-2">
						<Typo color="gray2" size="16">보낸 편지</Typo>
					</nav>
					{letterEmpty && (<div className="flex flex-col pl-5 pt-[75px]">
						<Typo>아직 보낸 편지가 없습니다!</Typo>
						<Typo>편지를 보내보세요 :)</Typo>
					</div>)}
					<section className="MyPageLetterList">
						{letters.map(letter => (
							<button
								key={letter.id}
								onClick={() => onClickRedirectLetterDetails(letter.id)}
								className="MyPageLetterButton"
							>
								<img src={letter.imageUrl} alt={`${letter.imageUrl}`} />
							</button>
						))}
					</section>

				</section>
			</div>
	);
};

export default UserFeed;
