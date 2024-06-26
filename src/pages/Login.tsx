'use client';

import React, { useEffect } from 'react';
import LoginLogo from '@public/icon/login-logo.svg';
import Google from '@public/icon/google.svg';
import Facebook from '@public/icon/facebook.svg';
import Kakao from '@public/icon/kakao.svg';
import Apple from '@public/icon/apple.svg';
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Server from "@/services/api";
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import { HttpStatusCode } from "axios";
import useUser from "@/hooks/useUser";
import { BroadcastChannel } from "broadcast-channel";


const LoginChannel = new BroadcastChannel("LOGIN");

type AuthCode = { authCode: string };
interface NonSignedUserError {
	message: string;
	provider: string;
	unique: string;
	code: number;
}


const Login = () => {
	const router = useRouter();
	const sessionStore = useSessionStore();
	const { login, user } = useUser();
	const redirectSignup = () => router.push('/sign-up');
	const onClickGoogleLogin = async () => {
		const { oauthUrl } = await Server.Account.getGoogleAuthUrl();
		window.open(oauthUrl);
	};

	useEffect(() => {
		if (user) {
			router.push('/match');
		}

		LoginChannel.addEventListener('message', async (data: AuthCode) => {
			const { authCode } = data;
			try {
				const res = await Server.Account.login(authCode);
				if (!res) return;
				login(res.user);
				router.push('/match');
			} catch (error: unknown) {
				const { unique, provider, code } = error as NonSignedUserError;
				if (code === HttpStatusCode.BadRequest) return;
				sessionStore.set(SessionItem.SIGNUP_PROVIDER, provider);
				sessionStore.set(SessionItem.SIGNUP_UNIQUE_VALUE, unique);
				redirectSignup();
			}
		});
	}, []);

	return (
			<div className="flex flex-col justify-center h-full">
				<section className="mt-[50px] md:mt-0 flex justify-start sm:justify-center w-full">
					<LoginLogo />
				</section>

				<article className="px-[39px] py-[20px] md:py-[110px]">
					<section className="flex flex-col pt-[35px]">
						<Typo size="25" bold>손편지 한장으로</Typo>
						<Typo size="25" bold>시작하는,</Typo>
						<Typo size="25" color="yellow" bold>진짜 외국어 공부</Typo>
					</section>

					<section className="pt-16 flex flex-col items-center">
						<Button
								onClick={onClickGoogleLogin}
								theme="ghost"
								shape="round"
								icon={{
									leftIcon: <Google />
								}}
								className="!h-[53px]"
						>
							<Typo>구글로 로그인 하기</Typo>
						</Button>
						<Typo className="pt-[30px] pb-[19px]" bold>또는</Typo>
						<nav className="flex gap-x-[14px]">
							<Facebook />
							<Kakao />
							<Apple />
						</nav>
					</section>
				</article>

			</div>
	);
};

export default Login;
