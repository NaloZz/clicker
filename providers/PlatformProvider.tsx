"use client";

import { useEffect } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { redirect, usePathname } from "next/navigation";

const PlatformProvider = () => {
	const pathname = usePathname();

	useEffect(() => {
		if (!isAndroid && !isIOS && pathname !== "/desktop") {
			redirect("/desktop");
		}
	}, []);

	return null;
};

export default PlatformProvider;
