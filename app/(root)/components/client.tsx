"use client";

import { redirect } from "next/navigation";

import useTelegram from "@/hooks/useTelegram";

const RootClient = () => {
	const telegram = useTelegram();

	if (telegram?.initDataUnsafe.user.id) {
		return redirect(`/${telegram?.initDataUnsafe.user.id}`);
	}

	return null;
};

export default RootClient;
