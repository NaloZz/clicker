import { LevelsTable } from "@/types";

export const battery_levels: LevelsTable = {
	0: { value: 1500, price: 0 },
	1: { value: 2000, price: 1000 },
	2: { value: 2500, price: 3000 },
	3: { value: 3000, price: 9000 },
	4: { value: 3500, price: 27000 },
	5: { value: 4000, price: 81000 },
	6: { value: 4500, price: 243000 },
	7: { value: 5000, price: 486000 },
	8: { value: 5500, price: 972000 },
	9: { value: 6000, price: 1944000 },
	10: { value: 6500, price: 3888000 },
};

export const charger_levels: LevelsTable = {
	0: { value: 1, price: 0 },
	1: { value: 1.1, price: 1000 },
	2: { value: 1.2, price: 3000 },
	3: { value: 1.3, price: 9000 },
	4: { value: 1.4, price: 27000 },
	5: { value: 1.5, price: 81000 },
	6: { value: 1.6, price: 243000 },
	7: { value: 1.7, price: 486000 },
	8: { value: 1.8, price: 972000 },
	9: { value: 1.9, price: 1944000 },
	10: { value: 2, price: 3888000 },
};

export const size_levels: LevelsTable = {
	0: { value: 1, price: 0 },
	1: { value: 2, price: 1000 },
	2: { value: 3, price: 3000 },
	3: { value: 4, price: 9000 },
	4: { value: 5, price: 27000 },
	5: { value: 6, price: 81000 },
	6: { value: 7, price: 243000 },
	7: { value: 8, price: 486000 },
	8: { value: 9, price: 972000 },
	9: { value: 10, price: 1944000 },
	10: { value: 50, price: 3888000 },
};

export const non_premium_ref_reward = 2500;

export const premium_ref_reward = 50000;

export const clan_price = 50000;
