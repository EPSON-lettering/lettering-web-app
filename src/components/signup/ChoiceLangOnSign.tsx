import React, { useState } from 'react';
import { useSignupContext, SignupPhase } from "@/pages/Signup";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import { ClientLanguage, languageOptions, languageKorProps } from "@/i18n/lang";

import ArrowRight from "@public/icon/left-arrow-white.svg";
import Ratio from "@/components/common/RatioButton";

const ChoiceLangOnSign = () => {
	const [lang, setLang] = useState<ClientLanguage>();
	const { setSignupPhase } = useSignupContext();

	const onClickNextPhase = () => {
		if (!lang) return;
		setSignupPhase(SignupPhase.SET_NICKNAME);
	}

	return (
			<article className="w-full h-full flex flex-col flex-1">
				<nav className="flex-all-center">
					<Typo size="16" bold>공부하고 싶은 언어를 선택해주세요!</Typo>
				</nav>

				<section className="py-[50px] flex-1">
					<Ratio.Context list={languageOptions}>
						<section className="col-center gap-y-[37px]">
							{languageOptions.map(lang => (
									<Ratio.Button
											identifier={lang}
											shape="round"
											key={lang}
											className="w-[200px] h-[46px]"
											onClick={() => setLang(lang)}
									>{languageKorProps[lang]}</Ratio.Button>
							))}
						</section>
					</Ratio.Context>

					{lang && (
							<div className="flex gap-x-[4px] py-[100px] w-full justify-center">
								<Typo size="16">교환 제공 언어는</Typo>
								<Typo color="yellow" size="19">{lang}</Typo>
								<Typo size="16">가 됩니다</Typo>
							</div>
					)}
				</section>

				<section className="w-full flex justify-end items-end">
					<Button
							onClick={onClickNextPhase}
							shape="round"
							size="small"
							disabled={!lang}
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

export default ChoiceLangOnSign;
