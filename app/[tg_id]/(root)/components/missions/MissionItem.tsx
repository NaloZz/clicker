"use client";

import Image from "next/image";
import { useState } from "react";
import { useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import useTelegram from "@/hooks/useTelegram";
import { checkMember } from "@/lib/bot-actions";
import { sheetAtom, tokensAtom } from "@/lib/atoms";
import { completeMission } from "@/lib/server-actions";

import { Mission } from "@/types";

interface MissionItemProps extends Mission {
	completed?: boolean;
	referrals: number;
	tg_id: string;
}

const MissionItem: React.FC<MissionItemProps> = ({
	id,
	href,
	title,
	reward,
	imageUrl,
	completed,
	friends,
	referrals,
	tg_id,
	channelId,
	type,
}) => {
	const [loading, setLoading] = useState(false);

	const setTokens = useSetAtom(tokensAtom);

	const setSheet = useSetAtom(sheetAtom);

	const telegram = useTelegram();

	const router = useRouter();

	const onClick = async () => {
		try {
			setLoading(true);

			if (type === "telegram") {
				const m = await checkMember({
					tg_id: Number(tg_id),
					channelId: channelId!,
				});

				if (!m) {
					toast.error("Task not completed", { icon: "ℹ️" });

					telegram?.openTelegramLink(href!);
				} else {
					await completeMission({
						tg_id,
						increment: Number(reward),
						missionId: id,
					});
				}
			}

			if (type === "friends") {
				if (referrals >= friends!) {
					await completeMission({
						tg_id,
						increment: Number(reward),
						missionId: id,
					});

					setTokens((prev) => prev + Number(reward));

					toast.success("Task completed");
				} else {
					toast.error("Task not completed", { icon: "ℹ️" });
				}
			}

			if (type === "display") {
				setSheet("friends");
			}

			if (type === "external") {
				telegram?.openLink(href!);

				await completeMission({
					tg_id,
					increment: Number(reward),
					missionId: id,
				});

				setTokens((prev) => prev + Number(reward));

				toast.success("Task completed");
			}

			router.refresh();
		} catch (error) {
			console.log(error);

			toast.error("Error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={onClick}
			disabled={completed || loading}
			className={cn("flex items-center gap-3", completed && "opacity-50")}
		>
			<div className="p-4 rounded-full bg-white/5">
				<Image
					src={imageUrl}
					alt="task-image"
					width={160}
					height={160}
					className="w-8 h-8"
				/>
			</div>

			<div className="flex flex-col items-start gap-[5px]">
				<p className="text-[15px] text-left font-bold leading-tight">{title}</p>

				<p className="text-xs leading-none font-bold">
					{typeof reward === "number"
						? `+${reward.toLocaleString("en-US").replaceAll(",", " ")}`
						: reward}
				</p>
			</div>

			{completed ? (
				<Check className="w-5 h-5 text-white/70 ml-auto" />
			) : (
				<ChevronRight className="w-5 h-5 text-white/70 ml-auto" />
			)}
		</button>
	);
};

export default MissionItem;
