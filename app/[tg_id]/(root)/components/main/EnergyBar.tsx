"use client";

import { Zap } from "lucide-react";
import { useAtomValue } from "jotai";
import { User } from "@prisma/client";

import { energyAtom } from "@/lib/atoms";

import { Level } from "@/types";
import { battery_levels, charger_levels } from "@/constants";

interface EnergyBarProps {
	user: User;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ user }) => {
	const energy = useAtomValue(energyAtom);

	const energyPool = battery_levels[user.batteryLvl as Level].value;

	return (
		<div className="relative">
			<div className="absolute top-1/2 translate-y-[-50%] right-1.5 text-black text-[10px] font-medium font-mono z-30 flex items-center gap-[3px]">
				<Zap className="w-2.5 h-2.5" />
				<span suppressHydrationWarning>{`${Math.floor(energy)}/${energyPool} (${
					charger_levels[user.chargerLvl as Level].value
				}/sec)`}</span>
			</div>

			<div className="relative h-4 w-full overflow-hidden rounded-full bg-white/15">
				<div
					suppressHydrationWarning
					style={{ width: `${(energy / energyPool) * 100}%` }}
					className="h-full flex-1 bg-gradient-to-r from-appcolor to-white/80 transition-all rounded-full"
				/>
			</div>
		</div>
	);
};

export default EnergyBar;
