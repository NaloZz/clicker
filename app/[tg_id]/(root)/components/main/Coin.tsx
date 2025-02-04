"use client";

import { User } from "@prisma/client";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import useTelegram from "@/hooks/useTelegram";
import { energyAtom, tokensAtom } from "@/lib/atoms";

import CoinBigIcon from "@/components/icons/CoinBigIcon";

import { Level } from "@/types";
import { size_levels } from "@/constants";

interface CoinProps {
  user: User;
}

const Coin: React.FC<CoinProps> = ({ user }) => {
  const setCount = useSetAtom(tokensAtom);
  const [energy, setEnergy] = useAtom(energyAtom);
  const [matrix, setMatrix] = useState([1, 0, 0, 1, 0, 0]);

  const weedRef = useRef<HTMLButtonElement>(null!);
  const energyRef = useRef(energy);

  // ✅ Добавлено: Локальное состояние для multiTapLvl
  const [multiTapLevel, setMultiTapLevel] = useState(user.multitapLvl);

  // ✅ Обновляем multiTapLevel, если изменился user
  useEffect(() => {
    setMultiTapLevel(user.multitapLvl);
  }, [user.multitapLvl]);

  // ✅ Используем локальный multiTapLevel
  const perClick = size_levels[multiTapLevel as Level].value;

  // ✅ Анимация появления чисел при клике
  const setPoint = (x: number, y: number) => {
    const numberEl = document.createElement("div");
    numberEl.innerText = perClick.toString();

    numberEl.style.cssText = `
      z-index: 2;
      position: absolute;
      max-width: 100%;
      max-height: 100px;
      overflow: hidden;
      animation: slideUp 1s ease-out;
      pointer-events: none;
      color: white;
      font-size: 13vw;
      font-weight: bold;
    `;

    numberEl.style.left = `${x - 28}px`;
    numberEl.style.top = `${y - 206}px`;

    weedRef.current.append(numberEl);

    const keyframes = [
      { transform: "translateY(0)", opacity: "1" },
      { transform: "translateY(-150px)", opacity: 0 },
    ];

    const animationOptions = { duration: 900, iterations: 1 };

    const animation = numberEl.animate(keyframes, animationOptions);

    animation.finished.then(() => {
      numberEl.remove();
    });
  };

  const onTouch = (e: TouchEvent) => {
    e.preventDefault();

    for (let i = 0; i < e.touches.length; i++) {
      if (energyRef.current > 0) {
        const { clientX, clientY } = e.touches.item(i)!;

        setPoint(clientX, clientY);

        setCount((prev) => prev + perClick);
        setEnergy((prev) => prev - perClick);
      } else return;
    }
  };

  useEffect(() => {
    weedRef.current.addEventListener("touchstart", onTouch);

    return () => {
      weedRef.current?.removeEventListener("touchstart", onTouch);
    };
  }, []);

  useEffect(() => {
    energyRef.current = energy;
  }, [energy]);

  // ✅ Исправление с useTelegram
  useEffect(() => {
    const telegram = useTelegram();
    if (telegram) {
      telegram.expand();
      telegram.disableVerticalSwipes();
    }
  }, []);

  return (
    <button
      ref={weedRef}
      disabled={energyRef.current <= 0}
      onPointerDown={({ clientX, clientY }) => {
        if (energyRef.current > 0) {
          const rect = weedRef.current.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const xDist = (x - centerX) / (rect.width * 10);
          const yDist = (y - centerY) / (rect.height * 10);

          setMatrix([1, xDist, yDist, 1, 0, 0]);
        }
      }}
      onPointerUp={() => {
        if (energyRef.current > 0) {
          setMatrix([1, 0, 0, 1, 0, 0]);
        }
      }}
      className="relative"
    >
      <CoinBigIcon
        style={{}}
        className="w-[90vw] h-auto"
      />
    </button>
  );
};

export default Coin;
