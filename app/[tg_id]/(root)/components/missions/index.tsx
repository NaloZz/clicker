"use client";

import Image from "next/image";
import { useAtomValue } from "jotai";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { sheetAtom } from "@/lib/atoms";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import MissionItem from "./MissionItem";

import { MissionSheet } from "@/types";

import { premium_ref_reward } from "@/constants";

const Missions = ({
	user,
	referralsNumber,
}: { user: User; referralsNumber: number }) => {
	const sheet = useAtomValue(sheetAtom);

	const mission_sheets: MissionSheet[] = [
		{
			missions: [
				{
					id: "invitepromo",
					title: "Invite bonus",
					reward: `up to ${premium_ref_reward} for friend`,
					imageUrl: "/handshake.png",
					href: `/${user.tg_id}/frens`,
					type: "display",
				},
			],
		},
		{
			title: "Specials",
			missions: [
				{
					id: "grouptg",
					title: "Join our WhaTap TG channel",
					reward: 50000,
					imageUrl: "/logowhattap.png",
					href: "https://t.me/whattapton",
					channelId: -1002186497513,
					type: "telegram",
				},
				{
					id: "grouptg1",
					title: "Join our WhaTap Ru TG channel",
					reward: 50000,
					imageUrl: "/logowhattap.png",
					href: "https://t.me/whattapru",
					channelId: -1002160982929,
					type: "telegram",
				},
				{
					id: "grouptg3",
					title: "Join our Дропы от Мизантропа",
					reward: 50000,
					imageUrl: "/DropMezantrop.png",
					href: "https://t.me/DropMezantrop",
					channelId: -1001996546020,
					type: "telegram",
				},
				{
					id: "grouptg4",
					title: "Join our Дроп Майнер",
					reward: 50000,
					imageUrl: "/dropminer.png",
					href: "https://t.me/drop_miner",
					channelId: -1001736563281,
					type: "telegram",
				},
				{
					id: "grouptg5",
					title: "Join our Mining telegram bots",
					reward: 50000,
					imageUrl: "/telegabotua.png",
					href: "https://t.me/telegabotua",
					channelId: -1001929624291,
					type: "telegram",
				},
				{
					id: "Crypto Farmer",
					title: "Play Crypto Farmer",
					reward: 50000,
					imageUrl: "/Crypto_Farmer.png",
					href: "https://t.me/Crypto_farmer_fun_bot?start=ref7372307748",
					channelId: 7133688840,
					type: "external",
				},
				{
					id: "JetTon",
					title: "Play JetTon",
					reward: 50000,
					imageUrl: "/JetTon.png",
					href: "https://t.me/jetton?start=cdlmTM7zWxw",
					channelId: 5822742440,
					type: "external",
				},			
				{
					id: "x",
					title: "Follow us on X",
					reward: 50000,
					imageUrl: "/x.png",
					href: "https://x.com/intent/follow?screen_name=whattapton",
					type: "external",
				},
				{
					id: "bybit",
					title: "Register on Bybit",
					reward: 50000,
					imageUrl: "/bybit.png",
					href: "https://www.bybit.com/invite?ref=4PDK73",
					type: "external",
				},
				{
					id: "binance",
					title: "Register on Binance",
					reward: 50000,
					imageUrl: "/binance.png",
					href: "https://www.binance.com/ru/activity/referral-entry/CPA?ref=CPA_00I8Y0O5AR",
					type: "external",
				},
			],
		},
		{
			title: "Bonuses",
			missions: [
				{
					id: "invite5",
					title: "Invite 5 friends",
					reward: 50000,
					imageUrl: "/camping.png",
					friends: 5,
					type: "friends",
				},
				{
					id: "invite10",
					title: "Invite 10 friends",
					reward: 300000,
					imageUrl: "/house.png",
					friends: 10,
					type: "friends",
				},
				{
					id: "invite100",
					title: "Invite 100 friends",
					reward: 1000000,
					imageUrl: "/houses.png",
					friends: 100,
					type: "friends",
				},
			],
		},
	];

	return (
		<Sheet open={sheet === "missions"}>
			<SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()}>
				<main className="w-screen h-screen flex flex-col gap-[30px] px-4 py-10 relative overflow-y-auto">
					<div className="flex flex-col items-center mx-auto gap-[18px]">
						<Image
							src="/money.png"
							alt="money-bag"
							width={160}
							height={160}
							className="w-[72px] h-[72px]"
						/>

						<h1 className="text-[30px] text-center font-bold">
							Earn more coins
						</h1>
					</div>

					<div className="flex flex-col gap-[25px] relative z-10">
						{mission_sheets.map((sheet, index) => (
							<div key={index} className="flex flex-col gap-3.5 self-stretch">
								{sheet.title && (
									<h2 className="text-[21px] font-bold">{sheet.title}</h2>
								)}

								<div className="flex flex-col bg-white/10 rounded-2xl p-4 gap-4">
									{sheet.missions.map((mission) => (
										<MissionItem
											key={mission.id}
											tg_id={user.tg_id}
											completed={user?.completedMissionsIDs.includes(
												mission.id,
											)}
											referrals={referralsNumber}
											{...mission}
										/>
									))}
								</div>
							</div>
						))}
					</div>

					<div
						className={cn(
							"opacity-50 fixed bottom-0 left-0 w-screen h-[90vh]",
							"[background:radial-gradient(ellipse_100%_90%_at_bottom,var(--app-color),transparent_100%)]",
						)}
					/>
				</main>
			</SheetContent>
		</Sheet>
	);
};

export default Missions;
