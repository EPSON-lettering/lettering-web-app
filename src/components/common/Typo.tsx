import React from 'react';
import clsx from 'clsx';

type Color = 'black' | 'white' | 'yellow' | "gray";
type Size = '25' | '16' | '19' | '13';

type TypoProps = {
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
}

const textProps: Record<Size, string> = {
	"13": 'text-[13px]',
	"16": 'text-[16px]',
	"19": 'text-[19px]',
	"25": 'text-[25px]',
};

export default Typo;
