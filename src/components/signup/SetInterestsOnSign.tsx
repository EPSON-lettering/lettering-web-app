import React, { useState, useEffect } from 'react';
import Interest from "@/components/common/Interest";
import type { Interest as InterestType } from "@/types/object";
import Button from "@/components/common/Button";
import Typo from "@/components/common/Typo";
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import { useSignupContext, SignupPhase } from "@/pages/Signup";
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import { SignupProvider } from "@public/services/api/AccountService";
import { useHeader } from "@/components/common/AppHeader";

const SetInterestsOnSign = () => {
	const [selectedList, setSelectedList] = useState<InterestType[]>([]);
	const sessionStore = useSessionStore();
	const { setForm, form } = useSignupContext();
	const { data: interests = [] } = useQuery({
		queryKey: ['interests'],
		queryFn: Server.Account.getInterests,
		refetchInterval: false,
	});
	const { setBackFn, defaultCallback } = useHeader();

	const onClickSubmit = async () => {
		const provider = sessionStore.get(SessionItem.SIGNUP_PROVIDER) as SignupProvider;
		const unique = sessionStore.get(SessionItem.SIGNUP_UNIQUE_VALUE);
		if (!provider || !unique) throw Error("에러 발생");

		try {
			await Server.Account.signup({
				nickname: form.nickname,
				interests: form.interests,
				language: form.lang,
				unique,
				provider,
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		setForm(prev => ({ ...prev, interests: selectedList.map(item => item.id) }));
	}, [selectedList]);

	// useEffect(() => {
	// 	setBackFn(() => SignupPhase.SET_NICKNAME);
	// }, []);

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
						{interests.map(inter => (
								<Interest.Button
										key={inter.id}
										id={inter.id}
										name={inter.name}
										image={inter.image}
								/>
						))}
					</Interest.Context>
				</section>

				<div className="flex-1" />

				<section className="w-full flex justify-end items-end">
					<Button
							onClick={onClickSubmit}
							size="full"
							disabled={selectedList.length === 0}
					>
						회원가입하기
					</Button>
				</section>
			</article>
	);
};

export default SetInterestsOnSign;