import React, { useState } from 'react';
import Typo from "@/components/common/Typo";
import NickInput from "@/components/common/NickInput";
import Button from "@/components/common/Button";
import ArrowRight from "@public/icon/left-arrow-white.svg";
import { useSignupContext, SignupPhase } from "@/pages/Signup";


const EnterNicknameOnSign = () => {
	const [nickname, setNickname] = useState<string>('');
	const { setSignupPhase } = useSignupContext();

	const onClickNextPhase = () => {
		setSignupPhase(SignupPhase.CHOICE_INTER);
	};

	return (
			<article className="w-full h-full flex flex-col">
				<nav className="flex-all-center">
					<Typo size="16" bold>편지에 쓰이고 싶은 닉네임을 입력해주세요!</Typo>
				</nav>

				<section className="pt-[100px] flex-1">
					<NickInput
							value={nickname}
							placeholder="닉네임을 입력하세요"
							setValue={setNickname}
							maxLength={13}
					/>
				</section>

				<section className="w-full flex justify-end items-end">
					<Button
							onClick={onClickNextPhase}
							shape="round"
							size="small"
							disabled={nickname.length === 0}
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

export default EnterNicknameOnSign;
