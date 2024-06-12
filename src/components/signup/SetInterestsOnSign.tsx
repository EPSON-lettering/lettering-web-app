import React, { useState } from 'react';
import Interest from "@/components/common/Interest";
import type { Interest as InterestType } from "@/types/object";
import { mockInterests } from "@/data/mock";
import Button from "@/components/common/Button";
import ArrowRight from "@public/icon/left-arrow-white.svg";
import Typo from "@/components/common/Typo";

const SetInterestsOnSign = () => {
	const [selectedList, setSelectedList] = useState<InterestType[]>([])

	const onClickSubmit = () => {
	};

	return (
			<article className="w-full h-full flex flex-col">

				<nav className="flex-all-center pb-[48px]">
					<Typo size="16" bold>관심사를 선택해주세요!</Typo>
					<Typo size="13">5개까지 선택가능합니다</Typo>
				</nav>

				<section className="flex flex-wrap h-fit gap-[13px]">
					<Interest.Context
							selectList={selectedList}
							setSelectList={setSelectedList}
					>
						{mockInterests.map(inter => (
								<Interest.Button
										key={inter.id}
										id={inter.id}
										name={inter.name}
										iconUrl={inter.iconUrl}
								/>
						))}
					</Interest.Context>
				</section>

				<div className="flex-1" />

				<section className="w-full flex justify-end items-end">
					<Button
							onClick={onClickSubmit}
							shape="round"
							size="small"
							disabled={selectedList.length === 0}
							icon={{
								rightIcon: <ArrowRight />
							}}
					>
						다음
					</Button>
				</section>
			</article>
	);
};

export default SetInterestsOnSign;