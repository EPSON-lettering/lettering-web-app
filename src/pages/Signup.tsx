'use client';

import React, { useState, createContext, useContext } from 'react';
import ChoiceLangOnSign from "@/components/signup/ChoiceLangOnSign";
import FormProgress from "@/components/common/FormProgress";
import EnterNicknameOnSign from "@/components/signup/EnterNicknameOnSign";

export enum SignupPhase {
	CHOICE_LANG,
	SET_NICKNAME,
	CHOICE_INTER,
}

interface SignupContextProps {
	signupPhase: SignupPhase;
	setSignupPhase: (phase: SignupPhase) => void;
}

const SignupContext = createContext<SignupContextProps>({} as SignupContextProps);
export const useSignupContext = () => useContext(SignupContext);


const Signup = () => {
	const [signupPhase, setSignupPhase] = useState<SignupPhase>(SignupPhase.CHOICE_LANG);

	return (
			<article className="flex flex-col h-full">
				<SignupContext.Provider value={{ signupPhase, setSignupPhase }}>
					<section className="w-full py-[37px] flex justify-center">
							<FormProgress progressCount={3} sequence={formSeq[signupPhase]} />
					</section>
					{signupPhase === SignupPhase.CHOICE_LANG && <ChoiceLangOnSign />}
					{signupPhase === SignupPhase.SET_NICKNAME && <EnterNicknameOnSign />}
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
