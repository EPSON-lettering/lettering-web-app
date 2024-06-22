'use client';

import NoneProfile from "@/components/common/NoneProfile";
import Typo from "@/components/common/Typo";
import { useSearchParams, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Server from "@/services/api";
import Loading from "@/components/common/Loading";
import SmPerson from "@public/icon/user-small-white.svg";
import Button from "@/components/common/Button";


export default function LetterDetailsPage() {
	const params = useParams<{ id: string }>();
	const { data, isLoading } = useQuery({
		queryKey: ['letter-details-getter'],
		queryFn: () => Server.Letter.getLetterDetails(Number(params?.id)),
		enabled: !!params?.id
	});

	if (!data || isLoading) return <Loading loading={isLoading} />;
	const { owner: { nickname }, imageUrl } = data;

	return (
			<div className="PageLayout">
				<section className="py-6 flex gap-x-3 items-center">
					<NoneProfile replaceIcon={<SmPerson />} className="w-[25px] h-[25px]" />
					<Typo size="16" bold>{nickname}</Typo>
				</section>

				<section className="flex-1 px-8 py-12 border rounded-2xl border-letter-yellow">
					<img src={imageUrl} className="rounded-xl drop-shadow-lg" />
				</section>

				<section className="py-[60px] flex gap-x-4 px-12">
					<Button>
						피드백
					</Button>
					<Button>
						답장
					</Button>
				</section>
			</div>
	);
}
