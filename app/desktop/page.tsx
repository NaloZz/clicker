"use client";

import { useEffect, useState } from "react";
import Coin from "@/components/main/Coin"; // Подключи нужные компоненты

const DesktopPage = () => {
	const [isTelegram, setIsTelegram] = useState(false);

	useEffect(() => {
		// Проверяем, запущено ли в Telegram Web
		if (typeof window !== "undefined" && window.Telegram?.WebApp) {
			setIsTelegram(true);
			window.Telegram.WebApp.expand();
		}
	}, []);

	// Если Telegram Web App, загружаем игру
	if (isTelegram) {
		return (
			<main className="min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">ULT100x Desktop Mode</h1>
				<Coin /> {/* Загрузи основной игровой компонент */}
			</main>
		);
	}

	// Если не Telegram, показываем ограничение
	return (
		<main className="min-h-screen flex items-center justify-center text-center p-4">
			<h1 className="text-2xl font-bold">
				Играть в ULT100x можно только в Telegram Web или с телефона.
			</h1>
		</main>
	);
};

export default DesktopPage;
