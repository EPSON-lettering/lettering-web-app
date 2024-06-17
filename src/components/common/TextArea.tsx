import React, { HTMLAttributes, useState, ChangeEvent } from 'react';
import Typo from "@/components/common/Typo";

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
	maxLength: number;
	placeholder: string;
}

const TextArea: React.FC<TextAreaProps> = ({ maxLength, placeholder, onChange, ...props }) => {
	const [value, setValue] = useState('');

	const onChangeWrapper = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const v = e.target.value;
		if (v.length > maxLength) return;
		setValue(v);
		onChange && onChange(e);
	}

	return (
		<div className="w-full min-h-[120] flex flex-col p-3 rounded-xl border-2 border-letter-yellow">
			<textarea
				value={value}
				onChange={onChangeWrapper}
				placeholder={placeholder}
				className="w-full h-full outline-none"
			/>
			<div className="flex w-full justify-end">
				<Typo color="gray">{value.length}</Typo>
				<Typo color="gray">/</Typo>
				<Typo color="gray">{maxLength}</Typo>
			</div>
		</div>
	);
};

export default TextArea;
