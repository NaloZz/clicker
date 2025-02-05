import { NextRequest, NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

import { non_premium_ref_reward, premium_ref_reward } from "@/constants";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const {
			tg_id,
			tg_username,
			tg_premium,
			first_name,
			last_name,
			inviterId,
			clanId,
		} = body;

		const exist = await prismadb.user.findUnique({ where: { tg_id } });

		if (exist) {
			if (clanId !== null) {
				const clan = await prismadb.clan.findUnique({
					where: { tg_id: clanId },
				});

				const user = await prismadb.user.update({
					where: { tg_id },
					data: { clanId: clan?.id },
				});

				return NextResponse.json(user);
			} else {
				return new NextResponse("User already exists", { status: 400 });
			}
		}

		let clanDbId = null;

		if (clanId) {
			const clan = await prismadb.clan.findUnique({
				where: { tg_id: clanId },
			});

			if (!clan) {
				return;
			}

			clanDbId = clan.id;
		}

		const tokens = tg_premium ? premium_ref_reward : non_premium_ref_reward;

		const user = await prismadb.user.create({
			data: {
				tg_id,
				tg_username,
				tg_premium,
				first_name,
				last_name,
				inviterId,
				tokens,
				clanId: clanDbId,
			},
		});

		await prismadb.user.update({
			where: {
				tg_id: inviterId,
			},
			data: {
				tokens: { increment: tokens },
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		console.log(error);

		return new NextResponse("Internal Error", { status: 500 });
	}
}
