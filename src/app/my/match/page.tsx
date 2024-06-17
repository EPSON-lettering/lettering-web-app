import { Metadata } from "next";
import MatchingManagement from "@/pages/MatchingManagement";

export const metadata: Metadata = {
	title: "Lettering",
	description: "Matching Management",
};


export default function MatchManagementPage() {
	return <MatchingManagement />;
}
