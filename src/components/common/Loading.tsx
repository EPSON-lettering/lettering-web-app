import React from 'react';
import Dialog from "@/components/common/Dialog";
import { MutatingDots } from "react-loader-spinner";
import Typo from "@/components/common/Typo";

interface LoadingProps {
	loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
	return (
			<div className="flex-1 h-full">
				<Dialog
						show={loading}
						closePrevent
						close={() => {}}
						hideCancel
				>
					<section className="flex-all-center py-[15px]">
						<Typo className="pb-5" bold>잠시만 기다려주세요...</Typo>
						<MutatingDots
								visible
								color="#FFD701"
								secondaryColor="#FFD701"
								radius="12.5"
								ariaLabel="mutating-dots-loading"
						/>
					</section>

				</Dialog>
			</div>
	);
};

export default Loading;
