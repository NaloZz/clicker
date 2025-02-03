"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useTelegram from "@/hooks/useTelegram";

const BackButtonProvider = () => {
	const pathname = usePathname();

	const router = useRouter();

	const telegram = useTelegram();

	useEffect(() => {
		if (pathname.split("/").length > 2) {
			telegram?.BackButton.show();

			telegram?.BackButton.onClick(() => {
				router.back();
				telegram.BackButton.hide();
			});

			document.body.style.setProperty("overflow", "visible");
		} else {
			telegram?.BackButton.hide();

			document.body.style.setProperty("overflow", "hidden");
		}

		return () => {
			telegram?.BackButton.offClick(() => {
				router.back();
				telegram.BackButton.hide();
			});
		};
	}, [pathname]);

	return null;
};

export default BackButtonProvider;
