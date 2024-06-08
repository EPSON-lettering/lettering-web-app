import React from 'react';
import clsx from 'clsx';

type Color = "black";

type TypoProps = {
	color?: Color
} & React.PropsWithChildren & React.HTMLAttributes<HTMLSpanElement>

const Typo: React.FC<TypoProps> = ({ children, color = "black", className, ...props }) => {
	return (
			<span className={clsx([
					colorProps[color],
					className,
			])}
	      {...props}
			>
				{children}
			</span>
	);
};

const colorProps: Record<Color, string> = {
	black: 'text-black',
}

export default Typo;
