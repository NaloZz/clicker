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
		const interval = setInterval(fillEnergy, 1000);

		window.addEventListener("unload", () => setLastExit(Date.now()));

		return () => {
			clearInterval(interval);

			window.removeEventListener("unload", () => setLastExit(Date.now()));
		};
	}, []);

	useEffect(() => {
		if (lastExit) {
			const energyPool = battery_levels[user.batteryLvl as Level].value;

			const energyPerSecond = charger_levels[user.chargerLvl as Level].value;

			const secondsFromLastExit = (Date.now() - Number(lastExit)) / 1000;

			const newEnergy = Math.round(
				Math.min(secondsFromLastExit * energyPerSecond, energyPool - energy),
			);

			setEnergy((prev) => prev + newEnergy);
		}
	}, [lastExit]);

	return null;
};

export default LastExitProvider;
