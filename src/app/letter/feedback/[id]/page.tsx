'use client';

import React from 'react';
import { useParams } from "next/navigation";

export default function FeedbackPage() {
	const params = useParams<{ id: string }>();

	return (
		<div className="PageLayout">

		</div>
	);
}
