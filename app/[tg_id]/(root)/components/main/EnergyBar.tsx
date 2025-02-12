"use client";

import { useAtomValue, useAtom } from "jotai";
import { boostAtom } from "@/lib/atoms"; // Импортируем атом с бустами
import { energyAtom } from "@/lib/atoms"; // Ваш атом энергии
import { User } from "@prisma/client";

import { Level } from "@/types";
import { battery_levels, charger_levels } from "@/constants";

const EnergyBar: React.FC<EnergyBarProps> = ({ user }) => {
  const [energy, setEnergy] = useAtom(energyAtom); // Энергия
  const boosts = useAtomValue(boostAtom); // Получаем бусты
  const energyPool = battery_levels[user.batteryLvl as Level].value;

  // Базовая скорость получения энергии
  let energyPerSec = charger_levels[user.chargerLvl as Level].value;

  // Учитываем активные бусты
  if (boosts.speedBoost) {
    energyPerSec *= 1.2; // Например, увеличение скорости на 20%
  }

  // В фоновом режиме увеличиваем энергию
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setEnergy((prevEnergy) => {
        if (prevEnergy < energyPool) {
          return Math.min(prevEnergy + energyPerSec, energyPool);
        }
        return prevEnergy;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [energyPool, energyPerSec, setEnergy]);

  return (
    <div className="relative">
      <div className="absolute top-1/2 translate-y-[-50%] right-1.5 text-black text-[10px] font-medium font-mono z-30 flex items-center gap-[3px]">
        <span suppressHydrationWarning>{`${Math.floor(energy)}/${energyPool} (${
          energyPerSec
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
