'use client';

import Typo from "@/components/common/Typo";
import NickInput from "@/components/common/NickInput";
import { useState } from "react";
import Button from "@/components/common/Button";

export default function EpsonRegisterPage() {
	const [epsonEmail, setEpsonEmail] = useState('');

	const onClickOpenHelp = () => window.open('https://www.epsonconnect.com/user');

	return (
			<div className="px-[16px] flex flex-col flex-1">
				<section className="py-[100px] w-full flex flex-col items-center">
					<Typo size="19" bold>본인의 Epson 프린터기에 연결된</Typo>
					<Typo size="19" bold>이메일을 입력해주세요!</Typo>
				</section>

				<section className="col-center flex-1">
					<NickInput
							value={epsonEmail}
							setValue={setEpsonEmail}
							placeholder="example@example.com"
							className="w-full outline-none"
							container={{
								className: "w-full h-[42px] outline-none",
							}}
					/>
					<button className="pt-3" onClick={onClickOpenHelp}>
						<Typo className="underline">Epson 프린터 연결 이메일을 잊으셨나요?</Typo>
					</button>
				</section>

				<section className="w-full flex justify-end pb-[60px]">
					<Button
						shape="round"
						size="fit"
					>
						다음
					</Button>
				</section>
			</div>
	);
}
