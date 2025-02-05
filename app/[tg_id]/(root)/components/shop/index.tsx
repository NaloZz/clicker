"use client";

import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react"; // добавлено для состояния задержки

import { cn } from "@/lib/utils";
import useTelegram from "@/hooks/useTelegram";
import { sheetAtom, tokensAtom } from "@/lib/atoms";
import { updateUser, upgrade } from "@/lib/server-actions";

import CoinIcon from "@/components/icons/CoinIcon";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import Balance from "./Balance";
import BoostItem from "./BoostItem";

import { Level, UserDataKey } from "@/types";
import { battery_levels, charger_levels, size_levels } from "@/constants";

const Shop = ({ user }: { user: User }) => {
  const sheet = useAtomValue(sheetAtom);

  const [tokens, setTokens] = useAtom(tokensAtom);

  const telegram = useTelegram();

  const router = useRouter();

  const [isCooldown, setIsCooldown] = useState(false); // состояние для отслеживания таймера
  const [remainingTime, setRemainingTime] = useState(0); // оставшееся время для следующей покупки

  const items: {
    imageUrl: string;
    title: string;
    description: string;
    increase: string;
    price: number;
    datakey: UserDataKey;
    currentLvl: number;
  }[] = [
    {
      imageUrl: "/pointer.png",
      title: "Multitap",
      description: "Increase your number of tokens per click",
      increase: "1 per click",
      price:
        size_levels[
          user.multitapLvl + 1 > 10 ? 10 : ((user.multitapLvl + 1) as Level)
        ].price,
      datakey: "size_lvl",
      currentLvl: user.multitapLvl,
    },
    {
      imageUrl: "/plug.png",
      title: "Charger",
      description: "Increase your battery recharging speed",
      increase: "0.1 per second",
      price:
        charger_levels[
          user.chargerLvl + 1 > 10 ? 10 : ((user.chargerLvl + 1) as Level)
        ].price,
      datakey: "charger_lvl",
      currentLvl: user.chargerLvl,
    },
    {
      imageUrl: "/battery.png",
      title: "Battery",
      description: "Increase your battery energy capacity",
      increase: "500",
      price:
        battery_levels[
          user.batteryLvl + 1 > 10 ? 10 : ((user.batteryLvl + 1) as Level)
        ].price,
      datakey: "battery_lvl",
      currentLvl: user.batteryLvl,
    },
  ];

  // Обработчик обновлений с таймером
  const onUpgrade = async (datakey: UserDataKey, price: number) => {
    if (isCooldown) {
      toast.error(`Подождите ${remainingTime} секунд до следующей покупки.`);
      return; // Если на таймере, не выполняем покупку
    }

    try {
      // Устанавливаем задержку на 10 секунд
      setIsCooldown(true);
      setRemainingTime(10); // Устанавливаем 10 секундный таймер

      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer); // очищаем таймер по истечении времени
            setIsCooldown(false); // сбрасываем таймер
            return 0;
          }
          return prevTime - 1; // уменьшаем оставшееся время
        });
      }, 1000);

      // Логика для обработки покупки
      await upgrade({ tg_id: user.tg_id, datakey });
      await updateUser({ tg_id: user.tg_id, tokens: tokens - price });

      setTokens((prev) => prev - price);

      telegram?.HapticFeedback.notificationOccurred("success");

      router.refresh();

      toast.success("Boosted!");
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <Sheet open={sheet === "shop"}>
      <SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()}>
        <main className="min-h-screen flex flex-col gap-10 p-4 pt-10 relative">
          <div className="flex flex-col items-center gap-2.5 self-stretch relative z-10">
            <p className="text-white/50 text-sm font-medium">Your balance:</p>

            <div className="flex justify-center items-center gap-3 self-stretch">
              <CoinIcon className="w-auto h-12" />

              <Balance />
            </div>
          </div>

          <div className="flex flex-col gap-3 relative z-10">
            <h2 className="text-2xl font-semibold tracking-tight">Boosters</h2>

            <div className="flex flex-col p-4 gap-4 bg-white/10 rounded-2xl self-stretch">
              {items.map((item, index) => (
                <BoostItem
                  key={index}
                  max={item.currentLvl === 10}
                  available={tokens > item.price}
                  onSubmit={() => onUpgrade(item.datakey, item.price)} // Добавляем сюда функцию с таймером
                  {...item}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "opacity-50 fixed bottom-0 left-0 w-screen h-[35vh] z-0",
              "[background:radial-gradient(ellipse_80%_90%_at_bottom,var(--app-color),transparent_100%)]",
            )}
          />
        </main>
      </SheetContent>
    </Sheet>
  );
};

export default Shop;
