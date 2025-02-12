import { cn } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getClan } from "@/lib/server-actions";

import CreateButton from "@/components/ui/CreateButton";
import GameLayout from "@/app/[tg_id]/layout"; // Подключаем GameLayout

import Shop from "@/app/[tg_id]/(root)/components/shop";
import Nav from "@/app/[tg_id]/(root)/components/main/Nav";
import Clan from "@/app/[tg_id]/(root)/components/main/Clan";
import Coin from "@/app/[tg_id]/(root)/components/main/Coin";
import Friends from "@/app/[tg_id]/(root)/components/friends";
import Score from "@/app/[tg_id]/(root)/components/main/Score";
import Missions from "@/app/[tg_id]/(root)/components/missions";
import EnergyBar from "@/app/[tg_id]/(root)/components/main/EnergyBar";

export default async function DesktopPage({
	params: { tg_id },
}: { params: { tg_id: string } }) {
	try {
		const user = await prismadb.user.findUniqueOrThrow({
			where: { tg_id },
			include: { Clan: true, referrals: true },
		});

		const clan = await getClan({ tg_id: user.Clan?.tg_id });

		return (
			<GameLayout params={{ tg_id }}>
				<div className="relative w-full h-full">
					<img
						src="https://raw.githubusercontent.com/NaloZz/clicker/refs/heads/main/public/whattapcoinmin.gif"
						alt="Background GIF"
						className="absolute bottom-[-15%] left-1/2 transform -translate-x-1/2 w-[90%] object-contain blur-sm opacity-60"
					/>

					<main className="min-h-screen flex flex-col items-center p-4 pt-2 overflow-x-hidden relative z-10">
						<Clan tg_id={tg_id} clan={clan} clanId={user.clanId} />

						<div className="flex flex-col gap-8 items-center w-full relative z-10 mt-8">
							<Score user={user} />
							<Coin user={user} />
						</div>

						<div className="flex flex-col gap-5 self-stretch mt-auto w-[calc(100vw-32px)] fixed bottom-8 z-10">
							<Nav />
							<EnergyBar user={user} />
						</div>

						<div
							className={cn(
								"fixed bottom-0 left-0 w-screen h-screen z-0",
								"[background:radial-gradient(ellipse_110%_80%_at_bottom,var(--app-color),transparent_100%)]",
							)}
						/>

						<Shop user={user} />
						<Friends tg_id={tg_id} friends={user.referrals} />
						<Missions user={user} referralsNumber={user.referrals.length} />
					</main>
				</div>
			</GameLayout>
		);
	} catch (error) {
		console.log(error);

		return (
			<main className="min-h-screen flex items-center justify-center">
				<CreateButton />
			</main>
		);
	}
}
