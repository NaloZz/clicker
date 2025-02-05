import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { cn, numberFormat } from "@/lib/utils";

import UserIcon from "@/components/icons/UserIcon";
import { buttonVariants } from "@/components/ui/button";

interface ClanProps {
	tg_id: string;
	clan: {
		title: string;
		total_tokens: number;
		members: number;
		avatarUrl: string;
		tg_id: string;
	} | null;
	clanId: string | null;
}

const Clan: React.FC<ClanProps> = ({ tg_id, clan, clanId }) => {
	if (clan && clanId) {
		return (
			<Link
				href={`/${tg_id}/clans/${clan.tg_id}?joined=true`}
				className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/10 self-stretch relative z-10"
			>
				<div className="w-12 h-12 rounded-full relative overflow-hidden">
					<Image
						src={`data:image/png;base64,${clan.avatarUrl}`}
						alt="clan-avatar"
						fill
						className="absolute object-cover"
					/>
				</div>

				<div className="flex flex-col">
					<p className="text-base font-bold truncate max-w-[100%]">
						{clan.title}
					</p>

					<div className="flex items-center">
						<UserIcon className="w-3 h-3 mr-0.5" />

						<p className="text-sm">{numberFormat(clan.members)}</p>
					</div>
				</div>

				<p
					suppressHydrationWarning
					className="text-[15px] text-money font-bold ml-auto"
				>
					{numberFormat(clan.total_tokens)}
				</p>
			</Link>
		);
	}

	return (
		<Link
			href={`/${tg_id}/clans`}
			className={cn(
				buttonVariants({ variant: "default" }),
				"bg-white/10 relative z-10 self-stretch leading-4",
			)}
		>
			Join clan
			<ChevronRight className="w-4 h-4 text-white/50 ml-1.5" />
		</Link>
	);
};

export default Clan;
