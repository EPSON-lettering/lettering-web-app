import React, { useState, ChangeEvent, useEffect } from 'react';
import Typo from "@/components/common/Typo";
import NickInput from "@/components/common/NickInput";
import Button from "@/components/common/Button";
import ArrowRight from "@public/icon/left-arrow-white.svg";
import { useSignupContext, SignupPhase } from "@/pages/Signup";
import Server from "@/services/api";
import { useHeader } from "@/components/common/AppHeader";


let validationTimer: any;

const EnterNicknameOnSign = () => {
	const [nickname, setNickname] = useState<string>('');
	const { setSignupPhase, setForm } = useSignupContext();
	const [error, setError] = useState<string>();
	const [satisfied, setSatisfied] = useState(false);
	const { setBackFn, defaultCallback } = useHeader();

	const onClickNextPhase = async () => {
		if (!satisfied || error) return;
		setForm(prev => ({ ...prev, nickname }));
		setSignupPhase(SignupPhase.CHOICE_INTER);
	};

	const onChangeValidation = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		clearTimeout(validationTimer);
		validationTimer = setTimeout(async () => {
			const validation = await Server.Account.validateNickname(value);
			if (!validation.available) {
				setError(validation.error);
				return;
			}
			setError(undefined);
			setSatisfied(true);
		}, 300);
	};

	// useEffect(() => {
	// 	setBackFn(() => SignupPhase.CHOICE_LANG);
	// }, []);

	return (
			<article className="w-full h-full flex flex-col">
				<nav className="flex-all-center">
					<Typo size="16" bold>편지에 쓰이고 싶은 닉네임을 입력해주세요!</Typo>
				</nav>

				<section className="pt-[100px] flex-1">
					<NickInput
							onChange={onChangeValidation}
							value={nickname}
							placeholder="닉네임을 입력하세요"
							setValue={setNickname}
							maxLength={13}
					/>
				</section>

				<section className="w-full flex justify-end items-end">
					<Button
							onClick={onClickNextPhase}
							shape={error ? 'normal' : 'round'}
							size={error ? 'full' : 'small'}
							disabled={nickname.length === 0}
							icon={{
								rightIcon: error ? undefined : <ArrowRight />
							}}
					>
						{error ?? '다음'}
					</Button>
				</section>
			</article>
	);
};

export default EnterNicknameOnSign;
