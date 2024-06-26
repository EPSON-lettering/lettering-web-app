import React, { HTMLAttributes } from 'react';
import Typo from "@/components/common/Typo";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Shape = 'round' | 'normal';
type Size = 'small' | 'full' | 'fit';
type Theme = 'normal' | 'ghost' | 'gray' | 'real-ghost';

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
						'transition-all duration-150',
						'flex justify-center items-center',
						'text-nowrap',
						shapeProps[shape],
						sizeProps[size],
						themeProps[theme],
						className,
						disabled && '!bg-gray-200 !border-gray-200',
						'text-sm md:text-base',
					]))}
					{...props}
			>
				<section className="flex gap-x-[10px] w-full justify-center items-center">
					{icon?.leftIcon && icon.leftIcon}
					{children}
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
	normal: 'button border border-[3px] border-letter-yellow',
	gray: 'bg-[#EAEAEA] border border-[3px] border-[#EAEAEA]',
	ghost: 'bg-white text-[#111111] font-semibold border border-[3px] border-letter-yellow',
	'real-ghost': 'bg-white !text-[#111111] border border-[3px] border-gray-300'
};

export default Button;
