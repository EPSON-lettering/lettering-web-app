'use client';

import React from 'react';
import LoginLogo from '@public/icon/login-logo.svg';
import Google from '@public/icon/google.svg';
import Facebook from '@public/icon/facebook.svg';
import Kakao from '@public/icon/kakao.svg';
import Apple from '@public/icon/apple.svg';
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import Server from "@public/services/api";

const Login = () => {
	const router = useRouter();

	const onClickGoogleLogin = async () => {
		const { oauthUrl } = await Server.Account.getGoogleAuthUrl();
		console.log({ oauthUrl });
		window.open(oauthUrl);

		router.push('/sign-up');
	};

	return (
			<div className="flex flex-col justify-center h-full">
				<section className="flex justify-start sm:justify-center w-full">
					<LoginLogo />
				</section>

				<article className="px-[39px] py-[110px]">
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
