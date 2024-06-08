'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import OnBoardingAnnouncement from './OnBoardingAnnouncement';
import onboardParagraphs from "@/components/OnBoarding/paragraph";

import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/override-pagination.css';

const pagination = {
	clickable: true,
	renderBullet: function (index, className) {
		return '<span class="' + className + '"></span>';
	},
};

const OnBoarding = () => {
	return (
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
	);
};

export default OnBoarding;
