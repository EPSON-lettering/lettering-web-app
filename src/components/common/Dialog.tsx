'use client';

import React, { useState } from 'react';
import { Dialog as D, DialogPanel, DialogTitle } from "@headlessui/react";
import { createPortal } from "react-dom";
import Button from "@/components/common/Button";

const portal = document.getElementById('portal') as HTMLDivElement;

interface DialogProps {
	show: boolean;
	close: () => void;
	cancelText?: string;
	okText?: string;
	onClickOk: () => void;
	title: string;
	children?: React.ReactNode;
	hideCancel?: boolean;
	closePrevent?: boolean;
}

export const useDialog = () => {
	const [show, setShow] = useState(false);

	return {
		show,
		open: () => setShow(true),
		close: () => setShow(false),
	}
};


const Dialog: React.FC<DialogProps> = ({
		title,
		show,
		close,
		cancelText = '아니오',
		okText = '네',
		onClickOk,
		children,
		hideCancel = false,
		closePrevent = false,
 }) => {
	const closeWrapper = () => {
		if (closePrevent) return;
		close();
	}
	return (
		<div>
			<D open={show} onClose={closeWrapper} className="relative z-50">
				<div className="dialog-dimmed fixed inset-0 w-screen" />
				<div className="fixed inset-0 w-screen items-center p-4 flex-all-center">
					<DialogPanel className="dialog-panel space-y-4 bg-white">
						<DialogTitle className="font-bold pt-[40px] pb-[12px] text-center">{title}</DialogTitle>

						<section>
							{children}
						</section>

						<section className="flex gap-4">
							{!hideCancel && (
									<Button
											theme="gray"
											onClick={close}
											className="flex-1"
									>{cancelText}</Button>
							)}
							<Button
									theme="normal"
									onClick={onClickOk}
									className="flex-1"
							>{okText}</Button>
						</section>
					</DialogPanel>
				</div>
			</D>
		</div>
	);
};

export default Dialog;
