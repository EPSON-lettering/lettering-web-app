'use client';

import React from 'react';
import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";
import Loading from "@/components/common/Loading";
import useQuestionOnMatchQuery from "@/hooks/query/useQuestionOnMatchQuery";
import Button from "@/components/common/Button";
import dayjs from "dayjs";
import Typo from "@/components/common/Typo";
import useUser from "@/hooks/useUser";
import Dialog, { useDialog } from "@/components/common/Dialog";
import { useRouter } from "next/navigation";

const LetterStatusOnMatch = () => {
	const { user } = useUser();
	const { match, isLoadingOneMatching } = useMatchOneQuery();
	const { question, questionLoading } = useQuestionOnMatchQuery(match?.id);
	const today = dayjs().format('YYYY.MM.DD');
	const { show: showEpsonDialog, open: openEpsonDialog, close: closeEpsonDialog } = useDialog();
	const router = useRouter();

	const loading = (() => {
		if (!match || isLoadingOneMatching) return true;
		if (questionLoading || !question) return true;
		return false;
	})();


	const onClickPrint = () => {
		if (!user?.epsonEmail) {
			return openEpsonDialog();
		}
	};

	const onClickOkUsingEpson = () => {
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
					close={closeEpsonDialog}
					onClickOk={onClickOkUsingEpson}
				/>
			</div>
	);
};

export default LetterStatusOnMatch;
