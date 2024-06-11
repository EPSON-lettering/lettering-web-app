import React from 'react';
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface FormProgressProps {
	sequence: number;
	progressCount:number;
}

const FormProgress: React.FC<FormProgressProps> = ({ sequence, progressCount }) => {
	const progressList = Array.from({ length: progressCount }, (_, i) => i + 1);
	return (
			<nav className="flex gap-x-[14px] items-center">
				{progressList.map(progressSeq => (
						<div
								key={progressSeq}
								className={twMerge(clsx([
										'w-[8px] h-[8px] rounded-[99px] bg-[#FFEF96]',
										progressSeq === sequence && 'bg-[#FFD700] w-[14px] h-[14px]',
								]))}
						/>
				))}
			</nav>
	);
};

export default FormProgress;
