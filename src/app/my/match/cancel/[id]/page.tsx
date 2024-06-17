'use client';

import React, { useState, ChangeEvent } from 'react';
import useUser from "@/hooks/useUser";
import Typo from "@/components/common/Typo";
import Button from "@/components/common/Button";
import Dialog, { useDialog } from "@/components/common/Dialog";
import Ratio from "@/components/common/RatioButton";
import TextArea from "@/components/common/TextArea";
import Server from "@public/services/api";
import { useParams, useRouter } from "next/navigation";

enum MatchCancelOption {
	// NO_MIND = '원하는 매칭 상대가 없어요.',
	// COMMON_ERROR = '오류가 자주 생겨요.',
	// CANNOT_HELP_STUDY = '외국어 공부가 되지 않아요.',
	// LETTER_HARD = '편지 쓰는 것이 힘들어요.',
	// WANT_OTHER_ACCOUNT = '다른 계정으로 다시 가입하고 싶어요.',
	// MANUAL = '직접 입력'
	NO_REPLY = '답장이 오지 않아요.',
	SLOW = '답장이 너무 느려요.',
	DIRTY_WORD = '상대방의 글씨체를 알아보기가 힘들어요.',
	BLIND_LETTER = '상대방의 편지가 잘 보이지 않아요.',
	NO_FUNNY = '대화가 재미 없어요.',
	NO_FEEDBACK = '언어에 대한 피드백이 없어요.',
	MANUAL = '직접 입력'
}

const M = MatchCancelOption;

const options = [M.NO_REPLY, M.SLOW, M.DIRTY_WORD, M.BLIND_LETTER, M.NO_FUNNY, M.NO_FEEDBACK, M.MANUAL];


export default function MatchCancellationPage() {
	const { user } = useUser();
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [cancelReason, setCancelReason] = useState<MatchCancelOption>();
	const [manual, setManual] = useState<string>('');
	const { show, close, open } = useDialog();

	const onClickCancelMatching = async () => {
		if (!params || !cancelReason) return;
		const reason = cancelReason === MatchCancelOption.MANUAL ? manual : cancelReason;
		try {
			await Server.Matching.disconnect(Number(params.id), reason);
			alert('매칭 연결이 끊어졌습니다. 마이페이지로 이동합니다.');
			router.push('/my');
		} catch (error) {
			console.error(error);
		}
	};

	return (
			<div className="flex-1 flex flex-col px-[16px]">
				<section className="pt-[80px] pb-[60px] flex flex-col gap-y-8">
					<div className="flex flex-col gap-y-1">
						<Typo size="19" bold>{user?.nickname}님,</Typo>
						<Typo size="19" bold>매칭 상대를 변경하는 이유를 알려주세요.</Typo>
					</div>
					<Typo size="16" color="gray2">더 좋은 서비스를 제공하기 위해 노력하겠습니다.</Typo>
				</section>

				<section className="flex flex-col flex-1 gap-y-3">
					<Ratio.Context list={options}>
						<OptionComp>
							<Ratio.Button identifier={M.NO_REPLY} onClick={() => setCancelReason(M.NO_REPLY)} iconMode />
							<Typo>{M.NO_REPLY}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.SLOW} onClick={() => setCancelReason(M.SLOW)} iconMode />
							<Typo>{M.SLOW}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.DIRTY_WORD} onClick={() => setCancelReason(M.DIRTY_WORD)} iconMode />
							<Typo>{M.DIRTY_WORD}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.BLIND_LETTER} onClick={() => setCancelReason(M.BLIND_LETTER)} iconMode />
							<Typo>{M.BLIND_LETTER}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.NO_FUNNY} onClick={() => setCancelReason(M.NO_FUNNY)} iconMode />
							<Typo>{M.NO_FUNNY}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.NO_FEEDBACK} onClick={() => setCancelReason(M.NO_FEEDBACK)} iconMode />
							<Typo>{M.NO_FEEDBACK}</Typo>
						</OptionComp>
						<OptionComp>
							<Ratio.Button identifier={M.MANUAL} onClick={() => setCancelReason(M.MANUAL)} iconMode />
							<Typo>{M.MANUAL}</Typo>
						</OptionComp>
						{cancelReason === MatchCancelOption.MANUAL && (
								<TextArea
									maxLength={200}
									placeholder="더 나은 서비스를 제공드릴 수 있도록 소중한 의견을 들려주세요"
									onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
										setManual(e.target.value);
									}}
								/>
						)}
					</Ratio.Context>
				</section>

				<section className="flex justify-center w-full px-8 pb-[50px]">
					<Button size="full" onClick={open} disabled={!cancelReason}>
						매칭 상대 변경하기
					</Button>
				</section>

				<Dialog
					title="정말로 매칭 상대를 변경하시겠습니까?"
					show={show}
					close={close}
					onClickOk={onClickCancelMatching}
				/>
			</div>
	);
}

const OptionComp: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
			<div className="w-full flex gap-x-3 items-center">
				{children}
			</div>
	);
}
