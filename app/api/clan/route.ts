import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { clan_price } from "@/constants";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { user_tg_id, tg_id, title, description, username, avatarUrl } = body;

		const exist = await prismadb.clan.findUnique({
			where: { tg_id },
		});

		if (exist) {
			return new NextResponse("Clan already exist", { status: 409 });
		}

		try {
			await prismadb.user.update({
				where: { tg_id: user_tg_id, tokens: { gte: clan_price } },
				data: { tokens: { decrement: clan_price } },
			});
		} catch (error) {
			return new NextResponse("Not enough coins to create a clan", {
				status: 422,
			});
		}

		const clan = await prismadb.clan.create({
			data: {
				tg_id,
				title,
				description,
				username,
				avatarUrl: avatarUrl ?? "/default-clan.png",
			},
		});

		await prismadb.user.update({
			where: { tg_id: user_tg_id },
			data: { clanId: clan.id },
		});

		console.log(clan);

		return NextResponse.json(clan);
	} catch (error) {
		console.log(error);

		return new NextResponse("Internal Error", { status: 500 });
	}
}
