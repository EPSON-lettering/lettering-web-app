'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import OnBoardingAnnouncement from './OnBoardingAnnouncement';
import onboardParagraphs from "@/components/OnBoarding/paragraph";

import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/override-pagination.css';
import Button from "@/components/common/Button";
import useSessionStore, { SessionItem } from "@/hooks/useSessionStore";
import { useRouter } from "next/navigation";

import OnBoard1 from "@public/logo/ob-1.svg";
import OnBoard2 from "@public/logo/ob-2.svg";
import OnBoard3 from "@public/logo/ob-3.svg";

const OnBoarding = () => {
	const sessionStore = useSessionStore();
	const router = useRouter();

	const onClickButton = () => {
		sessionStore.set(SessionItem.ON_BOARD, "true");
		router.push('/');
	};

	return (
			<section className="flex h-full flex-col justify-between">
				<div>
					<Swiper
							slidesPerView={1}
							pagination={pagination}
							modules={[Pagination]}
					>
						<SwiperSlide>
							<OnBoardingAnnouncement
									element={
										<div className="w-full flex justify-center">
											<OnBoard1 />
										</div>
								}
									desc={onboardParagraphs.first}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<OnBoardingAnnouncement
									element={<OnBoard2 />}
									desc={onboardParagraphs.second}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<OnBoardingAnnouncement
									element={
										<div className="w-full">
											<OnBoard3 />
										</div>
								}
									desc={onboardParagraphs.third}
							/>
						</SwiperSlide>
					</Swiper>
				</div>

				<div className="mt-12 md:mt-26 mb-12 flex justify-center">
					<Button
						size="small"
						shape="round"
						className="shadow-md"
						onClick={onClickButton}
					>
						편지 주고받기
					</Button>
				</div>
			</section>
	);
};

const pagination = {
	clickable: true,
	renderBullet: function (index: number, className: string) {
		return '<span class="' + className + '"></span>';
	},
};

export default OnBoarding;
