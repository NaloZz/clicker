import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { ChevronRight } from "lucide-react";

import CoinIcon from "@/components/icons/CoinIcon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { non_premium_ref_reward, premium_ref_reward } from "@/constants";

export const Friend: React.FC<User> = ({
	first_name,
	last_name,
	tg_username,
	tokens,
	tg_premium,
}) => {
	const profit = tg_premium ? premium_ref_reward : non_premium_ref_reward;

	return (
		<Link
			href={`https://t.me/${tg_username}`}
			className="flex items-center self-stretch gap-3"
		>
			<Avatar>
				<AvatarFallback>{first_name.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<div className="flex items-center gap-1">
					<p>
						{first_name.replace(/[^a-zA-Z0-9 ]/g, "")}
						{last_name && (
							<span>&nbsp;{last_name.replace(/[^a-zA-Z0-9 ]/g, "")}</span>
						)}
					</p>

					{tg_premium && (
						<Image
							src="/premium.png"
							alt="premium"
							width={100}
							height={100}
							className="w-4 h-4"
						/>
					)}
				</div>

				<div className="flex items-center">
					<div className="flex items-end gap-1">
						<CoinIcon className="w-4 h-4" />
						<p className="text-sm font-semibold leading-[15px]">
							{tokens.toLocaleString("en-US")}
						</p>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-1 ml-auto">
				<span className="text-sm text-money font-medium">{`+${
					profit / 1000
				}k`}</span>

				<ChevronRight className="text-white/30 w-5 h-5" />
			</div>
		</Link>
	);
};
