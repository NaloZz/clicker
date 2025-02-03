import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { battery_levels } from "@/constants";

import { SheetRoute } from "@/types";

export const energyAtom = atomWithStorage<number>(
	"energy",
	battery_levels[0].value,
);

export const lastExitAtom = atomWithStorage<EpochTimeStamp | null>(
	"lastExit",
	null,
);

export const tokensAtom = atom<number>(0);

export const backButtonAtom = atom(false);

export const pointsAtom = atom<
	{ x: number; y: number; value: number; id: number }[]
>([]);

export const sheetAtom = atom<SheetRoute>(null);
