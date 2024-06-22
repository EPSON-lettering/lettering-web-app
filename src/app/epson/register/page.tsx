'use client';

import Typo from "@/components/common/Typo";
import NickInput from "@/components/common/NickInput";
import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import LeftArrow from "@public/icon/left-arrow-white.svg";

import Printer from "@public/icon/printer.svg";
import LetterRound from "@public/icon/letter-logo-round.svg";
import Processing from "@public/icon/processing.svg";
import usePrintConnection from "@/hooks/usePrintConnection";
import Server from "@/services/api";
import usePaper from "@/hooks/usePaper";
import Dialog, { useDialog } from "@/components/common/Dialog";
import { images } from "next/dist/build/webpack/config/blocks/images";

export default function EpsonRegisterPage() {
	const [epsonEmail, setEpsonEmail] = useState('');
	const [connecting, setConnecting] = useState(false);

	const onClickOpenHelp = () => window.open('https://www.epsonconnect.com/user');

	const onClickRegisterEpsonPrinter = () => {
		if (epsonEmail.trim() === '') return;
		setConnecting(true);
	};

	if (connecting) return <Connecting email={epsonEmail} />;

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
						onClick={onClickRegisterEpsonPrinter}
						shape="round"
						size="fit"
						icon={{
							rightIcon: <LeftArrow />,
						}}
					>
						다음
					</Button>
				</section>
			</div>
	);
}

const Connecting: React.FC<{ email: string }> = ({ email }) => {
	const { connect } = usePrintConnection();
	const { imageSrc } = usePaper();
	const { show: showCompletePrint, open: openCompPrint, close: closeCompPrint } = useDialog();

	useEffect(() => {
		if (!imageSrc) return;
		(async () => {
			await connect(email);
			try {
				await Server.Print.print(imageSrc);
				openCompPrint();
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
			<div className="flex flex-1 flex-col px-[70px] w-full py-[200px]">
				<section className="w-full col-center">
					<Typo size="19" bold>프린터기를 연결 중입니다!</Typo>
					<Typo size="19" bold>잠시만 기다려주세요 :)</Typo>
				</section>

				<section className="flex justify-center items-center gap-x-3 py-[130px] w-full flex-1">
					<LetterRound />
					<Processing />
					<Printer />
				</section>

				<Dialog
						title="편지지 인쇄가 완료되었습니다!"
						show={showCompletePrint}
						close={closeCompPrint}
						onClickOk={closeCompPrint}
						hideCancel
				/>
			</div>
	)
};
