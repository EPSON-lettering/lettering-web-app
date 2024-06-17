'use client';

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import SmallWhitePerson from "@public/icon/user-small-white.svg";
import Loading from "@/components/common/Loading";

const MatchingManagement = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['my-matching-management'],
		queryFn: Server.Matching.getMyMatchingDetails,
	});

	if (isLoading || !data) return <Loading loading={isLoading} />;

	return (
			<div className="flex-1 w-full col-center px-[16px]">
				<section className="box !px-[32px] !py-[48px] w-full mt-[30px]">
					<div className="w-full h-full flex justify-between">
						<div className="flex gap-x-[20px]">
							<NoneProfile className="w-[60px] h-[60px]" replaceIcon={<SmallWhitePerson />} />
							<div className="flex flex-col">
								<Typo bold>{data.acceptor.nickname}</Typo>
								<nav className="flex gap-x-1 flex-wrap">
									{data.interests.map(item => (
											<div key={item.id} className="flex gap-x-1 items-center">
												<img src={item.image} />
												<Typo>{item.name}</Typo>
											</div>
									))}
								</nav>
							</div>
						</div>

						<Button
							theme="ghost"
							size="fit"
							className="rounded-2xl px-[10px]"
						>
							<Typo size="13" color="gray2">
								매칭상대 변경
							</Typo>
						</Button>
					</div>
				</section>
			</div>
	);
};

export default MatchingManagement;
