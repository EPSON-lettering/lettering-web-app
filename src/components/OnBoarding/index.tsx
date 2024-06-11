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
									element={<img src="/image/onboard-1.png" className="w-[393px] h-[550px]" alt="onboarding" />}
									desc={onboardParagraphs.first}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<OnBoardingAnnouncement
									element={<img src="/image/onboard-2.png" className="w-[393px] h-[550px]" alt="onboarding" />}
									desc={onboardParagraphs.second}
							/>
						</SwiperSlide>
						<SwiperSlide>
							<OnBoardingAnnouncement
									element={<img src="/image/onboard-3.png" className="w-[393px] h-[550px]" alt="onboarding" />}
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
