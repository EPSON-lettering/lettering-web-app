'use client';

import React, { useState, createContext, useContext } from 'react';
import ChoiceLangOnSign from "@/components/signup/ChoiceLangOnSign";
import FormProgress from "@/components/common/FormProgress";
import EnterNicknameOnSign from "@/components/signup/EnterNicknameOnSign";
import SetInterestsOnSign from "@/components/signup/SetInterestsOnSign";

export enum SignupPhase {
	CHOICE_LANG,
	SET_NICKNAME,
	CHOICE_INTER,
}

interface SignupForm {
	nickname: string;
	lang: string[];
	interests: number[];
}

interface SignupContextProps {
	signupPhase: SignupPhase;
	setSignupPhase: (phase: SignupPhase) => void;
	form: SignupForm;
	setForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

const SignupContext = createContext<SignupContextProps>({} as SignupContextProps);
export const useSignupContext = () => useContext(SignupContext);

const Signup = () => {
	const [signupPhase, setSignupPhase] = useState<SignupPhase>(SignupPhase.CHOICE_LANG);
	const [form, setForm] = useState<SignupForm>(() => ({
		interests: [],
		lang: [],
		nickname: '',
	}));

	return (
			<article className="px-[16px] pb-[50px] flex-1 flex flex-col SignOnContainer">
				<SignupContext.Provider value={{
					signupPhase,
					setSignupPhase,
					form,
					setForm,
				}}>
					<section className="w-full py-[37px] flex justify-center">
							<FormProgress progressCount={3} sequence={formSeq[signupPhase]} />
					</section>

					{signupPhase === SignupPhase.CHOICE_LANG && <ChoiceLangOnSign />}
					{signupPhase === SignupPhase.SET_NICKNAME && <EnterNicknameOnSign />}
					{signupPhase === SignupPhase.CHOICE_INTER && <SetInterestsOnSign />}
				</SignupContext.Provider>

			</article>
	);
};

const formSeq: Record<SignupPhase, number> = {
	[SignupPhase.CHOICE_LANG]: 1,
	[SignupPhase.SET_NICKNAME]: 2,
	[SignupPhase.CHOICE_INTER]: 3,
}

export default Signup;
