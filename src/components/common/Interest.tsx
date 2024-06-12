import React, { createContext, PropsWithChildren, useContext } from "react";
import { Interest as InterestType } from "@/types/object";
import Button from "@/components/common/Button";

interface ContextProps {
	selectList: InterestType[];
	setSelectList: React.Dispatch<React.SetStateAction<InterestType[]>>
}

const Context = createContext<ContextProps>({} as ContextProps);

const ContextComp: React.FC<PropsWithChildren<ContextProps>> = ({ selectList, setSelectList, children }) => {
	return (
		<Context.Provider value={{ selectList, setSelectList }}>
			{children}
		</Context.Provider>
	);
};

export const useInterestContext = () => useContext(Context);

const InterestButton: React.FC<InterestType> = ({ name, id, iconUrl }) => {
	const { selectList, setSelectList } = useInterestContext();
	const index = selectList.findIndex(item => item.id === id);
	const selected = index !== -1;

	const onClickButton = () => {
		if (selected) {
			const list = [...selectList];
			list.splice(index, 1);
			console.log({ list })
			setSelectList(list);
			return;
		}

		if (selectList.length >= 5) return;
		setSelectList(prev => prev.concat({ name,  id, iconUrl }));
	};

	return (
		<Button
				onClick={onClickButton}
				icon={{
					leftIcon: iconUrl ? <img src={iconUrl} alt="interestIcon" /> : undefined,
				}}
				theme={selected ? 'normal' : 'real-ghost'}
				size="fit"
				className="px-[16px] h-[48px]"
				shape="round"
		>
			{name}
		</Button>
	);
};

const Interest = {
	Context: ContextComp,
	Button: InterestButton,
};

export default Interest;
