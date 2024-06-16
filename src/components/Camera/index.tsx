import React, { useEffect } from 'react';
import Dialog, { useDialog } from "@/components/common/Dialog";
import Shutter from "@public/icon/shutter.svg";
import CornerLT from "@public/icon/corner-lt.svg";
import CornerRT from "@public/icon/corner-rt.svg";
import CornerLB from "@public/icon/corner-lb.svg";
import CornerRB from "@public/icon/corner-rb.svg";

interface MobileCameraProps {
	cameraShow: boolean;
}

const MobileCamera: React.FC<MobileCameraProps> = ({ cameraShow }) => {
	const { show, open, close } = useDialog();

	useEffect(() => {
		open();
	}, []);

	if (!cameraShow) return null;

	return (
			<div className="w-full h-full flex flex-col flex-1 absolute bg-white">
				<article className="w-full h-full col-center ">
					<section className="w-full flex-1 relative">
						<div className="absolute top-2 left-2">
							<CornerLT />
						</div>
						<div className="absolute top-2 right-2">
							<CornerRT />
						</div>
						<div className="absolute bottom-2 left-2">
							<CornerLB />
						</div>
						<div className="absolute bottom-2 right-2">
							<CornerRB />
						</div>
					</section>
					<section className="w-full flex-all-center">
						<button>
							<Shutter />
						</button>
					</section>
					<Dialog
							show={show}
							close={close}
							onClickOk={close}
							title="상대방을 위해 밝은 곳에서,"
							hideCancel
					/>
				</article>

			</div>
	);
};

export default MobileCamera;
