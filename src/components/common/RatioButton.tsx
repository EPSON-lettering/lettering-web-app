import React, { createContext, useContext, PropsWithChildren, useState } from 'react';
import Button, { ButtonProps } from "./Button";
import RatioInactive from "@public/icon/ratio-inactive.svg";
import RatioActive from "@public/icon/ratio-active.svg";

type Identifier = any;

interface RatioButtonProps extends ButtonProps {
	identifier: Identifier;
	iconMode?: boolean;
}

interface RatioContextProps {
	itemIdentifiers: Identifier[];
	currentIdentifier?: Identifier;
	setIdentifier: (id:Identifier) => void;
}

const RatioContext = createContext<RatioContextProps>({} as RatioContextProps);
const useRatioContext = () => useContext(RatioContext);

type Comp = PropsWithChildren & { list: Identifier[] };
const RatioContextComponent: React.FC<Comp> = ({ list, children }) => {
	const [current, setCurrent] = useState<Identifier>();

	return (
			<RatioContext.Provider value={{
				itemIdentifiers: list,
				currentIdentifier: current,
				setIdentifier: setCurrent,
			}}>
				{children}
			</RatioContext.Provider>
	)
}

const RatioButton: React.FC<RatioButtonProps> = ({ identifier, iconMode = false, ...props }) => {
	const { currentIdentifier, setIdentifier } = useRatioContext();
const selected: boolean = currentIdentifier === identifier

	const onClickWrapper = (e: any) => {
		setIdentifier(identifier);
		if (!props?.onClick) return;
		props.onClick(e);
	}

	if (iconMode) {
		return selected
				?
					<button onClick={onClickWrapper}>
						<RatioActive />
					</button>
				:
					<button onClick={onClickWrapper}>
						<RatioInactive />
					</button>;
	}

	return <Button theme={selected ? 'normal' : 'real-ghost'} {...props} onClick={onClickWrapper} />;
};


const Ratio = {
	Context: RatioContextComponent,
	Button: RatioButton,
}

export default Ratio;
