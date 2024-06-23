'use client';


import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";
import useUser from "@/hooks/useUser";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import useQuestionOnMatchQuery from "@/hooks/query/useQuestionOnMatchQuery";
import Dialog, { useDialog } from "@/components/common/Dialog";
import React from "react";
import Server from "@/services/api";
import convertUrlToFile from "@/utils/convertUrlToFile";
import { useRouter } from "next/navigation";

export default function EpsonScanPage() {
	const { match } = useMatchOneQuery();
	const { afterSendLetter } = useUser();
	const { refetch: refetchQuestion } = useQuestionOnMatchQuery(match?.id);
	const { show: showSendLetter, open: openSendLetter, close: closeSendLetter } = useDialog();
	const router = useRouter();

	const onScanComplete = async () => {
		try {
			const { imageUrl } = await Server.Print.getScanData();
			const file = await convertUrlToFile(imageUrl);
			await Server.Letter.sendManual(file);
			await afterSendLetter();
			closeSendLetter();
		} catch (error) {
			console.error(error);
		}
	};

	const onClickSendOk = () => {
		router.push('/match');
	};

	return (
			<div className="PageLayout">
				<section className="flex-all-center flex-1">
					<Typo size="19" bold>작성한 편지를 프린터기에 넣으신 후</Typo>
					<Typo size="19" bold>프린터기로 스캔을 진행해주세요!</Typo>

					<div className="pt-[60px]" />
					<Typo size="19">스캔이 완료되었다면</Typo>
					<Typo size="19">하단에 완료 버튼을 눌러주세요!</Typo>
				</section>

				<section className="pb-[60px] flex w-full justify-end">
					<Button
						size="fit"
						shape="round"
						onClick={onScanComplete}
					>
						완료
					</Button>
				</section>

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
}
