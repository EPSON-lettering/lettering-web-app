import React, { HTMLAttributes } from 'react';
import Typo from "@/components/common/Typo";
import clsx from "clsx";

type Shape = 'round' | 'normal';
type Size = 'small' | 'full';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	shape?: Shape;
	size?: Size;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    shape = 'normal',
    children,
		disabled = false,
		size = 'full',
    className,
    ...props
}) => {
	return (
			<button
					className={clsx([
							'button',
							disabled && '!bg-gray-50',
							shapeProps[shape],
							sizeProps[size],
							className,
					])}
					{...props}
			>
				<Typo>
					{children}
				</Typo>
			</button>
	);
};


const sizeProps: Record<Size, string> = {
	full: 'w-full',
	small: '76px',
};

const shapeProps: Record<Shape, string> = {
	normal: 'rounded-[14px]',
	round: 'rounded-[30px]'
};

export default Button;
