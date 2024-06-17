import React from 'react';
import clsx from 'clsx';

type Color = 'black' | 'white' | 'yellow' | "gray" | "gray2";
type Size = '25' | '16' | '19' | '13' | '47';

export type TypoProps = {
	color?: Color
	size?: Size;
	bold?: boolean;
} & React.PropsWithChildren & React.HTMLAttributes<HTMLSpanElement>

const Typo: React.FC<TypoProps> = ({
	 children,
	 color = "black",
   size = '13',
	 bold = false,
   className,
   ...props
}) => {
	return (
			<span className={clsx([
					colorProps[color],
					textProps[size],
					bold && 'font-bold',
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
	white: 'text-white',
	yellow: 'text-letter-yellow',
	gray: 'text-letter-gray',
	gray2: 'text-gray-400',
}

const textProps: Record<Size, string> = {
	"13": 'text-[16px]',
	"16": 'text-[18px]',
	"19": 'text-[23px]',
	"25": 'text-[25px]',
	"47": 'text-[36px]',
};

export default Typo;
