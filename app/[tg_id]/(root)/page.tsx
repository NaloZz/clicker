import { cn } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getClan } from "@/lib/server-actions";

import CreateButton from "@/components/ui/CreateButton";
import Shop from "./components/shop";
import Nav from "./components/main/Nav";
import Clan from "./components/main/Clan";
import Coin from "./components/main/Coin";
import Friends from "./components/friends";
import Score from "./components/main/Score";
import Missions from "./components/missions";
import EnergyBar from "./components/main/EnergyBar";

export default async function Home({
	params: { tg_id },
}: { params: { tg_id: string } }) {
	try {
		const user = await prismadb.user.findUniqueOrThrow({
			where: { tg_id },
			include: { Clan: true, referrals: true },
		});

		const clan = await getClan({ tg_id: user.Clan?.tg_id });

		return (
			<div className="relative w-full h-full">
				{/* 🌟 Улучшенный фон с GIF */}
				<img
					src="https://raw.githubusercontent.com/NaloZz/clicker/refs/heads/main/public/whattapcoinmin.gif" 
					alt="Fire Background"
					className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 w-[100%] object-cover opacity-80 saturate-150 contrast-120"
				/>

				{/* Основной контент */}
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

					{/* 🔥 Улучшенный градиентный фон */}
					<div
						className={cn(
							"fixed bottom-0 left-0 w-screen h-screen z-0",
							"[background:radial-gradient(ellipse_100%_90%_at_bottom,rgba(255, 69, 0, 0.9),rgba(0, 0, 0, 1))]",
						)}
					/>

					<Shop user={user} />
					<Friends tg_id={tg_id} friends={user.referrals} />
					<Missions user={user} referralsNumber={user.referrals.length} />
				</main>
			</div>
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
