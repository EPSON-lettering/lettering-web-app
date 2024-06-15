import SplashLoader from "@/components/SplashLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LetterU",
  description: "Home",
};

export default function Home() {
  return <SplashLoader />;
}
