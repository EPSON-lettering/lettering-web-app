import React, { useMemo, HTMLAttributes } from 'react';
import WhitePerson from "@public/icon/white-person.svg";
import clsx from "clsx";

interface NoneProfileProps extends HTMLAttributes<HTMLDivElement> {
	replaceIcon?: React.ReactNode;
	color: string;
}

const NoneProfile: React.FC<NoneProfileProps> = ({ replaceIcon, className, color, ...props }) => {

	return (
		<div
				className={clsx([
						`avatar flex-all-center`,
						className,
				])}
				style={{
					background: color,
				}}
				{...props}
		>
			{replaceIcon && replaceIcon}
			{!replaceIcon && <WhitePerson />}
		</div>
	);
};

export default NoneProfile;
