'use client';


import React, { useRef, useEffect } from 'react';
import { toPng, getFontEmbedCSS } from 'html-to-image';
import dayjs from "dayjs";
import Typo from "@/components/common/Typo";
import usePaper from "@/hooks/usePaper";

interface LetterPagerProps {
	questions: string[];
}

const LetterPaper: React.FC<LetterPagerProps> = ({ questions }) => {
	const today = dayjs().format('YYYY.MM.DD');
	const { setImageSrc } = usePaper();
	const ref = useRef<HTMLDivElement>(null);

	const toPaper = async () => {
		if (!ref.current) return;
		try {
			const font = await getFontEmbedCSS(ref.current);
			const paper = await toPng(ref.current, {
				width: 2480,
				height: 3508,
				skipFonts: true,
				fontEmbedCSS: font,
			});
			setImageSrc(paper);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		toPaper();
	}, []);

	return (
		<div ref={ref} className="a4 flex flex-col" id="LetterPaper">
			<header className="w-full flex items-center">
				<div className="letter-divider flex-[0.85]" />
				<Typo color="gray2" size="25" className="flex-[0.05] text-center px-[30px]">{today}</Typo>
				<div className="letter-divider flex-[0.1]" />
			</header>

			<div className="pb-[100px]" />

			<section className="flex flex-col flex-1">
				<Typo size="47" bold>질문</Typo>

				<div className="pt-[50px] pb-[120px] flex flex-col pl-[24px]">
					{questions.map(q => (
							<Typo key={q} size="47">{q}</Typo>
					))}
				</div>
			</section>

			<section className="flex justify-end items-end pr-[300px]">
				<Typo size="47" bold>To.</Typo>
			</section>
		</div>
	);
};

export default LetterPaper;
