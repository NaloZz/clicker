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
				title: "Join our ULT100x TG channel",
				reward: 50000,
				imageUrl: "/logowhattap.png",
				href: "https://t.me/ult100x",
				type: "external",
			},
		],
	},
]; // ✅ Лишние `]` и `}` убраны


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
