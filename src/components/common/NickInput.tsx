import React, { HTMLAttributes } from 'react';
import Typo from "@/components/common/Typo";
import CloseBtn from "@public/icon/close.svg";

interface NickInputProps extends HTMLAttributes<HTMLInputElement> {
	container?: HTMLAttributes<HTMLDivElement>;
	value: string;
	placeholder?: string;
	maxLength?: number;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}

const NickInput: React.FC<NickInputProps> = ({
     value,
     setValue,
     maxLength,
		 placeholder,
		 onChange,
     container,
     ...inputProps
}) => {

	const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		if (maxLength && val.length > maxLength) return;
		setValue(e.target.value);
		onChange && onChange(e);
	};

	return (
			<section {...container}>
				<div className="flex justify-between w-full border-b-2 border-letter-yellow pb-[8px]">
					<input
						value={value}
						placeholder={placeholder}
						onChange={onChangeValue}
						className="flex-1 input"
						{...inputProps}
					/>
					{value.length > 0 && (
							<button onClick={() => setValue("")}>
								<CloseBtn />
							</button>
					)}
				</div>

				{maxLength && (
						<div className="flex gap-x-[3px]">
							<Typo color="gray">{value.length}</Typo>
							<Typo color="gray">/</Typo>
							<Typo color="gray">{maxLength}</Typo>
						</div>
				)}
			</section>
	);
};

export default NickInput;
