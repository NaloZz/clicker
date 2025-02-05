import Link from "next/link";
import Image from "next/image";
import { User } from "@prisma/client";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

import InviteButton from "@/components/ui/InviteButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import JoinButton from "./components/JoinButton";

const ClanPage = async ({
	params: { tg_id, clanId },
	searchParams,
}: {
	params: { tg_id: string; clanId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	try {
		const clan = await prismadb.clan.findUniqueOrThrow({
			where: { tg_id: clanId },
			include: { users: { take: 10, orderBy: { tokens: "desc" } } },
		});

		if (!clan) {
			return (
				<main className="min-h-screen flex flex-col p-4 pt-10 relative">
					No clan
				</main>
			);
		}

		const joined = String(searchParams.joined || "false") === "true";

		const ref_text = `🏆+2.5k Whattap as a first-time bonus
💎+50k Whattap if you have Telegram Premium`;

		const ref_link = `https://t.me/${process.env.NEXT_PUBLIC_BOT_HANDLE}?start=rp_${tg_id}_${clanId}`;

		return (
			<main className="min-h-screen flex flex-col p-4 pt-10 relative">
				<div className="flex flex-col items-center relative z-10">
					<Image
						src={`data:image/png;base64,${clan?.avatarUrl}`}
						alt="clan-avatar"
						width={160}
						height={160}
						className="w-[100px] h-[100px] rounded-full"
					/>

					<Link
						href={`https://t.me/${clan.username}`}
						className="flex items-start justify-center gap-3 mt-6"
					>
						<h1 className="text-[30px] leading-none font-bold truncate max-w-[85vw]">
							{clan.title}
						</h1>

						<ExternalLink className="w-[26px] h-[26px] text-white/50 shrink-0" />
					</Link>

					{clan.description && (
						<p className="text-[15px] leading-none mt-5">{clan.description}</p>
					)}
				</div>

				<div className="flex flex-col gap-5 mt-[26px] relative z-10">
					<div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/10">
						<InviteButton ref_link={ref_link} ref_text={ref_text} />

						<JoinButton tg_id={tg_id} clanId={clan.id} joined={joined} />
					</div>

					<div className="flex flex-col gap-6 p-4 rounded-2xl bg-white/10">
						{clan.users.map((user, index) => {
							const place = index + 1;

							const placeItem =
								place > 3 ? (
									place
								) : (
									<Image
										src={
											{ 1: "/first.png", 2: "/second.png", 3: "/third.png" }[
												place as 1 | 2 | 3
											]
										}
										alt={`${place} place`}
										width={160}
										height={160}
										className="w-6 h-6"
									/>
								);

							return <UserItem key={user.id} place={placeItem} {...user} />;
						})}
					</div>
				</div>

				<div
					className={cn(
						"fixed bottom-0 left-0 w-screen h-[90vh] opacity-50",
						"[background:radial-gradient(ellipse_100%_90%_at_bottom,var(--app-color),transparent_100%)]",
					)}
				/>
			</main>
		);
	} catch (error) {
		console.log(error);

		return (
			<main className="min-h-screen flex flex-col p-4 pt-10 relative">
				No clan
			</main>
		);
	}
};

interface UserItemProps extends User {
	place: React.ReactNode;
}

const UserItem: React.FC<UserItemProps> = ({ first_name, tokens, place }) => {
	return (
		<div className="flex items-center gap-3 self-stretch">
			<Avatar>
				<AvatarFallback>{first_name.slice(0, 2).toUpperCase()}</AvatarFallback>
			</Avatar>

			<div className="flex flex-col">
				<p className="text-base font-bold">{first_name}</p>

				<p className="text-sm text-white/80 font-medium">
					{tokens.toLocaleString("en-US").replaceAll(",", " ")}
				</p>
			</div>

			<div className="text-sm text-appcolor ml-auto w-6 h-6 text-center flex items-center justify-center">
				{place}
			</div>
		</div>
	);
};

export default ClanPage;
