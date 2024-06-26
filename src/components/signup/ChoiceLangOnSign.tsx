import React, { useState, useEffect } from 'react';
import { useSignupContext, SignupPhase } from "@/pages/Signup";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";

import ArrowRight from "@public/icon/left-arrow-white.svg";
import Ratio from "@/components/common/RatioButton";
import { useHeader } from "@/components/common/AppHeader";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import { Language } from "@/types/object";

const ChoiceLangOnSign = () => {
	const [lang, setLang] = useState<Language>();
	const { setSignupPhase, setForm } = useSignupContext();
	const { hideBack, showBack } = useHeader();
	const { data: langOptions = [] } = useQuery({
		queryKey: ['getLangs'],
		queryFn: Server.Account.getLanguages,
	});

	const onClickNextPhase = () => {
		if (!lang) return;
		setForm(prev => ({ ...prev, lang: lang.langName }));
		setSignupPhase(SignupPhase.SET_NICKNAME);
	};

	const onClickLang = (lang: Language) => {
		if (lang.langName === 'Korean') {
			const found = langOptions.find(l => l.langName === 'English');
			setLang(found);
			return;
		}
		const found = langOptions.find(l => l.langName === 'Korean');
		setLang(found);
	}

	useEffect(() => {
		hideBack();
		return () => showBack();
	}, []);

	return (
			<article className="w-full h-full flex flex-col flex-1">
				<nav className="flex-all-center">
					<Typo size="16" bold>공부하고 싶은 언어를 선택해주세요!</Typo>
				</nav>

				<section className="py-[50px] flex-1">
					<Ratio.Context list={langOptions}>
						<section className="col-center gap-y-[37px]">
							{langOptions.map(lang => (
									<Ratio.Button
											identifier={lang}
											shape="round"
											key={lang.id}
											className="w-[200px] h-[46px]"
											onClick={() => onClickLang(lang)}
									>{lang.langName}</Ratio.Button>
							))}
						</section>
					</Ratio.Context>

					{lang && (
							<div className="flex gap-x-[4px] py-[100px] w-full items-center justify-center">
								<Typo size="16">교환 제공 언어는</Typo>
								<Typo color="yellow" size="19" className="px-[5px]" bold>{lang.langName}</Typo>
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
