"use client";

import { useEffect, useState } from "react";

const useTelegram = () => {
	const [isMounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!isMounted) return null;

	const telegram = window.Telegram.WebApp;

	return telegram;
};

export default useTelegram;
