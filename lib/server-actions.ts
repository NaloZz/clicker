"use server";

import prismadb from "@/lib/prismadb";
import { UserDataKey } from "@/types";

export const createUser = async (data: {
	tg_id: string;
	tg_username: string;
	tg_premium: boolean;
	first_name: string;
	last_name?: string;
}) => {
	try {
		const exist = await prismadb.user.findUnique({
			where: {
				tg_id: data.tg_id,
			},
		});

		if (exist) {
			return "exist";
		}

		await prismadb.user.create({ data });

		return "success";
	} catch (error) {
		console.log(error);
		return "error";
	}
};

export const updateUser = async ({
	tg_id,
	tokens,
	energy,
}: { tg_id: string; tokens?: number; energy?: number }) => {
	try {
		await prismadb.user.update({ where: { tg_id }, data: { tokens } });

		return "success";
	} catch (error) {
		console.log(error);
	}
};

export const completeMission = async ({
	tg_id,
	increment,
	missionId,
}: { tg_id: string; increment: number; missionId: string }) => {
	try {
		await prismadb.user.update({
			where: { tg_id },
			data: {
				tokens: { increment },
				completedMissionsIDs: { push: missionId },
			},
		});

		return "success";
	} catch (error) {
		console.log(error);
	}
};

export const joinClan = async ({
	tg_id,
	clanId,
}: { tg_id: string; clanId: string }) => {
	try {
		await prismadb.user.update({
			where: { tg_id },
			data: {
				clanId,
			},
		});

		return "success";
	} catch (error) {
		console.log(error);
	}
};

export const leaveClan = async ({ tg_id }: { tg_id: string }) => {
	try {
		await prismadb.user.update({
			where: { tg_id },
			data: {
				clanId: null,
			},
		});

		return "success";
	} catch (error) {
		console.log(error);
	}
};

export const getClan = async ({ tg_id }: { tg_id?: string }) => {
	try {
		if (!tg_id) {
			return null;
		}

		const result = (await prismadb.clan.aggregateRaw({
			pipeline: [
				{
					$match: {
						tg_id,
					},
				},
				{
					$lookup: {
						from: "User",
						localField: "_id",
						foreignField: "clanId",
						as: "users",
					},
				},
				{
					$unwind: "$users",
				},
				{
					$group: {
						_id: "$_id",
						title: { $first: "$title" },
						avatarUrl: { $first: "$avatarUrl" },
						tg_id: { $first: "$tg_id" },
						total_tokens: { $sum: "$users.tokens" },
						members: { $count: {} },
					},
				},
				{
					$project: {
						_id: 0,
						title: 1,
						avatarUrl: 1,
						tg_id: 1,
						total_tokens: 1,
						members: 1,
					},
				},
			],
		})) as unknown as {
			title: string;
			total_tokens: number;
			members: number;
			avatarUrl: string;
			tg_id: string;
		}[];

		return result[0];
	} catch (error) {
		return null;
	}
};

export const upgrade = async ({
	tg_id,
	datakey,
}: { tg_id: string; datakey: UserDataKey }) => {
	if (datakey === "battery_lvl") {
		await prismadb.user.update({
			where: { tg_id },
			data: { batteryLvl: { increment: 1 } },
		});
	}

	if (datakey === "charger_lvl") {
		await prismadb.user.update({
			where: { tg_id },
			data: { chargerLvl: { increment: 1 } },
		});
	}

	if (datakey === "size_lvl") {
		await prismadb.user.update({
			where: { tg_id },
			data: { multitapLvl: { increment: 1 } },
		});
	}
};
