import React from 'react';
import MatchingProcessing from "@public/icon/match-processing.svg";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";

const LetterOnWriting = () => {
	return (
			<div className="PageLayout">
				<section className="py-[100px] flex justify-center">
					<Typo size="19" bold>편지를 다 작성하셨나요?</Typo>
				</section>

				<section className="flex-all-center flex-1">
					<MatchingProcessing />
				</section>

				<section className="flex gap-x-3 pb-[60px]">
					<Button>
						편지 스캔하고 전송하기
					</Button>
					<Button>
						편지 PDF 전송하기
					</Button>
				</section>
			</div>
	);
};

export default LetterOnWriting;