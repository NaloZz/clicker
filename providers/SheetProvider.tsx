"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";

import { sheetAtom } from "@/lib/atoms";
import useTelegram from "@/hooks/useTelegram";

const SheetProvider = () => {
	const telegram = useTelegram();

	const [sheet, setSheet] = useAtom(sheetAtom);

	useEffect(() => {
		telegram?.BackButton.onClick(() => setSheet(null));

		if (sheet) {
			telegram?.BackButton.show();
		} else {
			telegram?.BackButton.hide();
		}

		return () => {
			telegram?.BackButton.offClick(() => setSheet(null));
		};
	}, [sheet]);

	return null;
};

export default SheetProvider;
