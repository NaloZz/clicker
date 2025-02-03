"use client";

import Image from "next/image";
import { useAtomValue } from "jotai";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import { sheetAtom } from "@/lib/atoms";

import CoinIcon from "@/components/icons/CoinIcon";
import InviteButton from "@/components/ui/InviteButton";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Friend } from "./Friend";

import { non_premium_ref_reward, premium_ref_reward } from "@/constants";

const Friends = ({ tg_id, friends }: { tg_id: string; friends: User[] }) => {
	const sheet = useAtomValue(sheetAtom);

	const empty = friends.length === 0;

	const ref_text = `🏆+2.5k WhatTapCoin as a first-time bonus
💎+50k WhatTapCoin if you have Telegram Premium`;

	const ref_link = `https://t.me/${process.env.NEXT_PUBLIC_BOT_HANDLE}?start=rp_${tg_id}`;

	return (
		<Sheet open={sheet === "friends"}>
			<SheetContent side="right" onOpenAutoFocus={(e) => e.preventDefault()}>
				<main className="w-screen h-screen flex flex-col gap-10 px-4 pt-10 pb-24 relative overflow-y-auto">
					<h1 className="text-4xl text-center font-bold tracking-tight self-stretch">
						{!empty && <span>{friends.length}&nbsp;</span>}
						Friends
					</h1>

					<div className="flex flex-col gap-3 relative z-10">
						<h2 className="text-2xl text-money font-semibold tracking-tight">
							Invite friends to get bonuses
						</h2>

						<div className="flex flex-col items-center justify-center p-4 gap-6 bg-white/10 rounded-2xl self-stretch">
							<div className="flex items-start gap-3.5 self-stretch">
								<CoinIcon className="w-12 h-12" />

								<div className="flex flex-col gap-0.5">
									<p className="font-medium">Invite friend</p>

									<div className="flex items-end gap-1">
										<CoinIcon className="w-4 h-4" />

										<p className="text-sm leading-[15px]">
											<span className="text-money font-medium">
												{non_premium_ref_reward.toLocaleString("en-US")}
											</span>
											&nbsp;for you and your friend
										</p>
									</div>
								</div>
							</div>

							<div className="flex items-start gap-3.5 self-stretch">
								<Image
									src="/premium.png"
									alt="premium"
									width={100}
									height={100}
									className="w-12 h-12"
								/>

								<div className="flex flex-col gap-0.5">
									<p className="font-medium">Friend with Telegram Premium</p>

									<div className="flex items-end gap-1">
										<CoinIcon className="w-4 h-4" />

										<p className="text-sm leading-[15px]">
											<span className="text-money font-medium">
												{premium_ref_reward.toLocaleString("en-US")}
											</span>
											&nbsp;for you and your friend
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-3 relative z-10">
						<h2 className="text-2xl font-semibold tracking-tight">
							Friends List
						</h2>

						<div
							className={cn(
								"flex flex-col items-center justify-center p-4 gap-6 bg-white/10 rounded-2xl backdrop-blur-3xl [-webkit-backdrop-filter:blur(64px)] self-stretch",
								empty && "min-h-64",
							)}
						>
							{empty && <p className="text-white/30 text-sm">No friends yet</p>}

							{friends.map((friend) => (
								<Friend key={friend.id} {...friend} />
							))}
						</div>
					</div>

					<InviteButton
						ref_link={ref_link}
						ref_text={ref_text}
						className="fixed bottom-8 left-4 w-[calc(100%-32px)] z-20"
					/>

					<div
						className={cn(
							"opacity-50 fixed bottom-0 left-0 w-screen h-[35vh] z-0",
							"[background:radial-gradient(ellipse_80%_90%_at_bottom,var(--app-color),transparent_100%)]",
						)}
					/>
				</main>
			</SheetContent>
		</Sheet>
	);
};

export default Friends;
