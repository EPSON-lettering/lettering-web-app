import React, { useMemo, HTMLAttributes } from 'react';
import WhitePerson from "@public/icon/white-person.svg";
import clsx from "clsx";

const colors = [
		'bg-[#FFEB81]',
		'bg-[#A3E798]',
		'bg-[#9FAFE3]',
];

const getRandColor = () =>
		colors[Math.floor(Math.random() * colors.length)];

interface NoneProfileProps extends HTMLAttributes<HTMLDivElement> {
	replaceIcon?: React.ReactNode;
}

const NoneProfile: React.FC<NoneProfileProps> = ({ replaceIcon, className, ...props }) => {
	const backColor = useMemo(getRandColor, []);

	return (
		<div
				className={clsx([
						`avatar ${backColor} flex-all-center`,
						className,
				])}
				{...props}
		>
			{replaceIcon && replaceIcon}
			{!replaceIcon && <WhitePerson />}
		</div>
	);
};

export default NoneProfile;
