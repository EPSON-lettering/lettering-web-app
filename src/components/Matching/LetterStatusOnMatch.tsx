'use client';

import React, { useRef, useState } from 'react';
import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";
import Loading from "@/components/common/Loading";
import useQuestionOnMatchQuery from "@/hooks/query/useQuestionOnMatchQuery";
import Button from "@/components/common/Button";
import dayjs from "dayjs";
import Typo from "@/components/common/Typo";
import useUser from "@/hooks/useUser";
import Dialog, { useDialog } from "@/components/common/Dialog";
import { useRouter } from "next/navigation";
import LetterPaper from "@/components/Letter/LetterPaper";
import usePaper from "@/hooks/usePaper";
import Server from "@/services/api";
import usePrintConnection from "@/hooks/usePrintConnection";


const printWindow = (src: string, onPrint: () => void) => {
	const printWindow = window.open('');
	if (printWindow) {
		const img = new Image();
		img.src = src;
		printWindow.document.write(`
			<html>
				<style>
					html, body { margin: 0; padding: 0; }
					img { height: 100%; }
				</style>
				<body>
		`);
		printWindow.document.body.appendChild(img);
		printWindow.document.write('</body></html>');
		printWindow.document.close();

		printWindow.onload = () => {
			printWindow.print();
			printWindow.onafterprint = () => {
				onPrint();
				printWindow.close();
			};
		}
	} else {
		alert('팝업 차단기를 해제하세요.');
	}
};


const LetterStatusOnMatch = () => {
	const { user, refresh } = useUser();
	const { match, isLoadingOneMatching } = useMatchOneQuery();
	const { question, questionLoading } = useQuestionOnMatchQuery(match?.id);
	const today = dayjs().format('YYYY.MM.DD');
	const { show: showEpsonDialog, open: openEpsonDialog, close: closeEpsonDialog } = useDialog();
	const { show: showCompletePrint, open: openCompPrint, close: closeCompPrint } = useDialog();
	const { show: showExistsPrinterCompPrint, open: openExistsComp, close: closeExistsComp } = useDialog();
	const router = useRouter();
	const [visible, setVisible] = useState(false);
	const { imageSrc: a4ImageSrc } = usePaper();
	const { usingEpson } = usePrintConnection();

	const loading = (() => {
		if (!match || isLoadingOneMatching) return true;
		if (questionLoading || !question) return true;
		return false;
	})();

	const onClickPrint = async () => {
		if (!a4ImageSrc) return;
		if (!usingEpson) {
			return openEpsonDialog();
		}

		try {
			await Server.Print.print(a4ImageSrc);
			await Server.Print.changeStatusOnWriting();
			openExistsComp();
		} catch (error) {
			console.error(error);
		}
		// setVisible(true);
		// setTimeout(async () => {
		// 	await print();
		// 	setVisible(false);
		// }, 400);
	};

	const print = async () => {
		if (a4ImageSrc) {
			printWindow(a4ImageSrc, () => {
				openCompPrint();
			});
		}
		await Server.Print.changeStatusOnWriting();
		await refresh();
		closeEpsonDialog();
		openCompPrint();
	};

	const onClickOkUsingEpson = () => {
		setVisible(true);
		router.push('/epson/register');
	};

	if (loading) return <Loading loading={loading} />;

	return (
			<div className="flex-1 col-center px-[21px]">
				<section className="flex-1 box w-full !px-[0] mt-[48px] mb-[60px]">
					<header className="w-full flex gap-x-3 items-center">
						<div className="w-full h-[1px] border-letter-yellow border-2 flex-[0.8]" />
						<Typo color="gray2" className="flex-[0.05]">{today}</Typo>
						<div className="w-full h-[1px] border-letter-yellow border-2 flex-[0.15]" />
					</header>

					<section className="w-full px-[40px] flex flex-col">
						<Typo size="19" bold>질문</Typo>
						<Typo size="16" className="pt-3">{question?.text}</Typo>
						<Typo size="16" className="pt-3">{question?.engText}</Typo>
						<div className="pt-12">
							<Typo size="19" bold>To.</Typo>
						</div>
					</section>
				</section>

				<section className="w-full flex gap-x-3 mb-[32px]">
					<Button
						theme="normal"
						size="full"
						className="flex-1"
						onClick={onClickPrint}
					>
						편지지 프린트 하기
					</Button>
					{/*<Button*/}
					{/*		theme="normal"*/}
					{/*		size="full"*/}
					{/*		className="flex-1"*/}
					{/*>*/}
					{/*	답장 보내기*/}
					{/*</Button>*/}
				</section>
				<Dialog
					title="Epson 프린터기를 사용 중이신가요?"
					show={showEpsonDialog}
					close={print}
					onClickOk={onClickOkUsingEpson}
				/>

				<Dialog
					title="편지지 인쇄가 완료되었습니다!"
					show={showCompletePrint}
					close={closeCompPrint}
					onClickOk={closeCompPrint}
					hideCancel
				/>

				<Dialog
						title="편지지 인쇄가 완료되었습니다!"
						show={showExistsPrinterCompPrint}
						close={closeExistsComp}
						onClickOk={async () => {
							await refresh();
							closeExistsComp();
						}}
						hideCancel
				/>


				<div style={{
					display: visible ? 'block' : 'none',
				}}>
					<LetterPaper
							questions={[question?.text ?? '', question?.engText ?? '']}
					/>
				</div>
			</div>
	);
};

export default LetterStatusOnMatch;
