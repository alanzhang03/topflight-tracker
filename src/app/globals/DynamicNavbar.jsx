"use client";

import { usePathname } from "next/navigation";
import Navbar from "../../../components/Navbar";

export default function DynamicNavbar() {
	const pathname = usePathname();

	const league = pathname.includes("/leagues/premier-league")
		? "epl"
		: pathname.includes("/leagues/bundesliga")
		? "bundesliga"
		: pathname.includes("/leagues/la-liga")
		? "laliga"
		: pathname.includes("/leagues/champions-league")
		? "championsleague"
		: null;

	if (!league) {
		return null;
	}

	return <Navbar league={league} />;
}
