"use client";

import { debounce } from "lodash";
import { useAtomValue } from "jotai";
import { User } from "@prisma/client";
import { useHydrateAtoms } from "jotai/utils";
import { Fragment, useCallback, useEffect } from "react";

import { tokensAtom } from "@/lib/atoms";
import useTelegram from "@/hooks/useTelegram";
import { updateUser } from "@/lib/server-actions";

import CoinIcon from "@/components/icons/CoinIcon";

const Score = ({ user }: { user: User }) => {
	useHydrateAtoms([[tokensAtom, user.tokens]]);

	const count = useAtomValue(tokensAtom);

	const telegram = useTelegram();

	const debounceSave = useCallback(
		debounce(
			async (newTokens) =>
				await updateUser({
					tg_id: user.tg_id,
					tokens: newTokens,
				}),
			500,
		),
		[telegram],
	);

	useEffect(() => {
		if (count !== user.tokens) {
			telegram?.HapticFeedback.impactOccurred("medium");

			debounceSave(count);
		}
	}, [count]);

	const formattedCount = count.toLocaleString("en-US").split(",");

	return (
		<div className="flex justify-center items-center gap-3 self-stretch">
			<CoinIcon className="w-auto h-12" />

			<p
				suppressHydrationWarning
				className="text-[52px] font-extrabold leading-none font-[Montserrat]"
			>
				{formattedCount.map((text, index) => (
					<Fragment key={index}>
						<span suppressHydrationWarning className="font-[Montserrat] font-extrabold">
							{text}
						</span>
						{index !== formattedCount.length - 1 && ","}
					</Fragment>
				))}
			</p>
		</div>
	);
};

export default Score;
