'use client';

import React from 'react';
import { useQuery } from "@tanstack/react-query";
import Server from "@public/services/api";
import useMatchOneQuery from "@/hooks/query/useMatchOneQuery";
import Loading from "@/components/common/Loading";
import useQuestionOnMatchQuery from "@/hooks/query/useQuestionOnMatchQuery";
import Button from "@/components/common/Button";
import dayjs from "dayjs";
import Typo from "@/components/common/Typo";

const LetterStatusOnMatch = () => {
	const { match, isLoadingOneMatching } = useMatchOneQuery();
	const { question, questionLoading } = useQuestionOnMatchQuery(match?.id);
	const today = dayjs().format('YYYY.MM.DD');

	const loading = (() => {
		if (!match || isLoadingOneMatching) return true;
		if (questionLoading || !question) return true;
		return false;
	})();

	if (loading) return <Loading loading={loading} />;

	return (
			<div className="flex-1 col-center px-[16px]">
				<section className="flex-1 box w-full !px-[0] mt-[48px] mb-[60px]">
					<header className="w-full flex gap-x-3 items-center">
						<div className="w-full h-[1px] border-letter-yellow border-2 flex-[0.8]" />
						<Typo color="gray2" className="flex-[0.05]">{today}</Typo>
						<div className="w-full h-[1px] border-letter-yellow border-2 flex-[0.15]" />
					</header>

					<section className="w-full px-[40px] flex flex-col">
						<Typo size="19" bold>질문</Typo>
						<Typo size="16" className="pt-3">{question?.text}</Typo>
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
					>
						편지지 프린트 하기
					</Button>
					<Button
							theme="normal"
							size="full"
							className="flex-1"
					>
						답장 보내기
					</Button>
				</section>
			</div>
	);
};

export default LetterStatusOnMatch;
