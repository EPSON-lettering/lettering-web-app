import React, { HTMLAttributes } from 'react';
import Typo from "@/components/common/Typo";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Shape = 'round' | 'normal';
type Size = 'small' | 'full' | 'fit';
type Theme = 'normal' | 'ghost' | 'real-ghost';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	shape?: Shape;
	size?: Size;
	theme?: Theme;
	icon?: {
		leftIcon?: React.ReactElement,
		rightIcon?: React.ReactElement,
	};
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    shape = 'normal',
    children,
		disabled = false,
		icon,
		theme = 'normal',
		size = 'full',
    className,
    ...props
}) => {
	return (
			<button
					className={twMerge(clsx([
							disabled && '!bg-gray-200',
							shapeProps[shape],
							sizeProps[size],
							themeProps[theme],
							className,
					]))}
					{...props}
			>
				<section className="flex gap-x-[10px] justify-center items-center">
					{icon?.leftIcon && icon.leftIcon}
					<Typo color={theme === "normal" ? "white" : "black"}>
						{children}
					</Typo>
					{icon?.rightIcon && icon.rightIcon}
				</section>
			</button>
	);
};


const sizeProps: Record<Size, string> = {
	full: 'w-full',
	small: '76px',
	fit: 'w-fit',
};

const shapeProps: Record<Shape, string> = {
	normal: 'rounded-[14px]',
	round: 'rounded-3xl'
};

const themeProps: Record<Theme, string> = {
	normal: 'button',
	ghost: 'bg-white text-[#111111] font-semibold border border-[3px] border-letter-yellow',
	'real-ghost': 'bg-white !text-[#111111] border border-[3px] border-gray-300'
};

export default Button;
