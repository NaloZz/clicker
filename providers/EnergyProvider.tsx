"use client";

import { useAtom } from "jotai";
import { User } from "@prisma/client";
import { useCallback, useEffect } from "react";

import { energyAtom, lastExitAtom } from "@/lib/atoms";

import { Level } from "@/types";
import { battery_levels, charger_levels } from "@/constants";

interface LastExitProviderProps {
	user: User;
}

const LastExitProvider: React.FC<LastExitProviderProps> = ({ user }) => {
	const [energy, setEnergy] = useAtom(energyAtom);
	const [lastExit, setLastExit] = useAtom(lastExitAtom);

	const fillEnergy = useCallback(() => {
		const energyPerSecond = charger_levels[user.chargerLvl as Level].value;

		setEnergy((prev) => {
			const energyPool = battery_levels[user.batteryLvl as Level].value;

			if (prev < energyPool) {
				return Math.min(prev + energyPerSecond);
			} else {
				return prev;
			}
		});
	}, []);

	useEffect(() => {
    const energyPerSecond = charger_levels[user.chargerLvl as Level].value; // Скорость восстановления
    const energyPool = battery_levels[user.batteryLvl as Level].value; // Макс. запас энергии

    // 1️⃣ Восстановление энергии за оффлайн-время
    if (lastExit) {
        const secondsOffline = (Date.now() - Number(lastExit)) / 1000;
        const energyToRecover = Math.floor(secondsOffline * energyPerSecond);
        setEnergy((prev) => Math.min(prev + energyToRecover, energyPool));
    }

    // 2️⃣ Обычное накопление энергии в онлайне (не даём запуститься нескольким таймерам!)
    let interval: NodeJS.Timeout | null = null;
    if (!interval) {
        interval = setInterval(() => {
            setEnergy((prev) => Math.min(prev + energyPerSecond, energyPool));
        }, 1000);
    }

    return () => {
        if (interval) {
            clearInterval(interval);
            interval = null; // ✅ Очищаем, чтобы не было дублирования
        }
        setLastExit(Date.now()); // Сохраняем время выхода
    };
}, [user.chargerLvl, user.batteryLvl]); // Перезапускать эффект только при изменении апгрейдов

	// 🔥 Добавляем return null, чтобы React не ругался
	return null;
};

export default LastExitProvider;
