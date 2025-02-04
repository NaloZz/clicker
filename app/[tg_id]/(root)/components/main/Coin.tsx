"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "@prisma/client";
import { useAtom, useSetAtom } from "jotai";

import { energyAtom, tokensAtom } from "@/lib/atoms";
import { Level } from "@/types";
import { size_levels } from "@/constants";

import CoinBigIcon from "@/components/icons/CoinBigIcon";

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

	const onTouch = (e: TouchEvent) => {
		e.preventDefault();

		for (let i = 0; i < e.touches.length; i++) {
			if (energyRef.current > 0) {
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

	return (
		<button ref={weedRef} disabled={energyRef.current <= 0} className="relative">
			<CoinBigIcon style={{}} className="w-[90vw] h-auto" />
		</button>
	);
};

export default Coin;
