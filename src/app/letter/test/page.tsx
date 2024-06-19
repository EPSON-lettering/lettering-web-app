'use client';

import LetterPaper from "@/components/Letter/LetterPaper";


const questions = [
		'가보고 싶은 여행지가 있나요?', 'Is there a place you want to visit?',
];

export default function LetterTestPage() {
	return (<LetterPaper questions={questions} />);
}
