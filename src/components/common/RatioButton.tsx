import React, { createContext, useContext, PropsWithChildren, useState } from 'react';
import Button, { ButtonProps } from "./Button";

type Identifier = any;

interface RatioButtonProps extends ButtonProps {
	identifier: Identifier;
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

const RatioButton: React.FC<RatioButtonProps> = ({ identifier, ...props }) => {
	const { currentIdentifier, setIdentifier } = useRatioContext();
const selected: boolean = currentIdentifier === identifier

	const onClickWrapper = (e: any) => {
		console.log('onClickWrapper');
		setIdentifier(identifier);
		if (!props?.onClick) return;
		props.onClick(e);
	}

	return <Button theme={selected ? 'normal' : 'real-ghost'} {...props} onClick={onClickWrapper} />;
};


const Ratio = {
	Context: RatioContextComponent,
	Button: RatioButton,
}

export default Ratio;
