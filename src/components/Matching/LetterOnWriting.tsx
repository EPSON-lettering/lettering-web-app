import React, { useRef, ChangeEvent } from 'react';
import MatchingProcessing from "@public/icon/match-processing.svg";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import usePrintConnection from "@/hooks/usePrintConnection";
import Dialog, { useDialog } from "@/components/common/Dialog";
import Server from "@/services/api";
import convertUrlToFile from "@/utils/convertUrlToFile";
import useUser from "@/hooks/useUser";
import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";
import useQuestionOnMatchQuery from "@/hooks/query/useQuestionOnMatchQuery";

const LetterOnWriting = () => {
	const { usingEpson } = usePrintConnection();
	const { show: showNotFoundEpson, open: openNotFoundEpson, close: closeNotFoundEpson } = useDialog();
	const { show: showSendLetter, open: openSendLetter, close: closeSendLetter } = useDialog();
	const fileUploadRef = useRef<HTMLInputElement>(null);
	const { afterSendLetter } = useUser();
	const { match } = useMatchOneQuery();
	const { refetch: refetchQuestion } = useQuestionOnMatchQuery(match?.id);

	const onClickScanAndSend = async () => {
		if (!usingEpson) {
			openNotFoundEpson();
			return;
		}

		try {
			const { imageUrl } = await Server.Print.getScanData();
			const file = await convertUrlToFile(imageUrl);
			await Server.Letter.sendManual(file);
			openSendLetter();
		} catch (error) {
			console.error(error);
		}
	};

	const onClickSendOk = async () => {
		try {
			await afterSendLetter();
			await refetchQuestion();
			closeSendLetter();
		} catch (error) {
			console.error(error);
		}
	};

	const onClickSendImage = () => fileUploadRef?.current?.click();

	const upload = async (e: ChangeEvent<HTMLInputElement>) => {
		console.log('upload()');
		const file = (() => {
			if (!e.target?.files) return null;
			return Array.from(e.target.files)[0];
		})();
		if (!file) return;
		try {
			await Server.Letter.sendManual(file);
			openSendLetter();
		} catch (error) {
			console.error(error);
		}
	};


	return (
			<div className="PageLayout">
				<section className="py-[100px] flex justify-center">
					<Typo size="19" bold>편지를 다 작성하셨나요?</Typo>
				</section>

				<section className="flex-all-center flex-1">
					<MatchingProcessing />
				</section>

				<section className="flex gap-x-3 pb-[60px]">
					<Button onClick={onClickScanAndSend}>
						(EPSON) 스캔본 전송하기
					</Button>
					<Button onClick={onClickSendImage}>
						이미지 전송하기
					</Button>
				</section>

				<div className="hidden">
					<input type="file" ref={fileUploadRef} onChange={upload} />
				</div>

				<Dialog
						title="EPSON 프린터를 찾을 수 없음"
						show={showNotFoundEpson}
						close={closeNotFoundEpson}
						onClickOk={closeNotFoundEpson}
						hideCancel
				>
					<section className="flex-all-center py-4 w-full">
						<Typo>EPSON 프린터가 연결되어있지 않아 스캔을 수행할 수 없어요</Typo>
						<Typo>프린터를 연결해주세요!</Typo>
					</section>
				</Dialog>

				<Dialog
						title="편지를 전송했어요!"
						show={showSendLetter}
						close={closeSendLetter}
						onClickOk={onClickSendOk}
						okText="네, 이동할게요"
						hideCancel
				>
					<section className="w-full p-4 flex-all-center">
						<Typo>새로운 질문으로 안내할게요!</Typo>
					</section>
				</Dialog>
			</div>
	);
};

export default LetterOnWriting;
