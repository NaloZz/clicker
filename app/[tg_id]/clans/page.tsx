import Link from "next/link";
import Image from "next/image";

import { cn, numberFormat } from "@/lib/utils";
import prismadb from "@/lib/prismadb";

import UserIcon from "@/components/icons/UserIcon";

import CreateClanButton from "./components/CreateClanButton";

const ClansPage = async ({
	params: { tg_id },
}: { params: { tg_id: string } }) => {
	const clans = (await prismadb.clan.aggregateRaw({
		pipeline: [
			{
				$lookup: {
					from: "User",
					localField: "_id",
					foreignField: "clanId",
					as: "users",
				},
			},
			{
				$unwind: "$users",
			},
			{
				$group: {
					_id: "$_id",
					title: { $first: "$title" },
					avatarUrl: { $first: "$avatarUrl" },
					tg_id: { $first: "$tg_id" },
					total_tokens: { $sum: "$users.tokens" },
					members: { $count: {} },
				},
			},
			{
				$project: {
					_id: 0,
					title: 1,
					avatarUrl: 1,
					tg_id: 1,
					total_tokens: 1,
					members: 1,
				},
			},
			{
				$sort: {
					total_tokens: -1,
				},
			},
			{
				$limit: 25,
			},
		],
	})) as unknown as {
		title: string;
		total_tokens: number;
		members: number;
		avatarUrl: string;
		tg_id: string;
	}[];

	return (
		<main className="min-h-screen flex flex-col p-4 pt-10 relative">
			<div className="flex flex-col items-center mx-auto relative z-10">
				<h1 className="text-[30px] leading-none font-bold">Join Clan!</h1>

				<p className="text-center mt-[25px]">These clans recruiting now.</p>

				<p>Do you wanna join?</p>
			</div>

			<CreateClanButton />

			<div className="flex flex-col gap-6 p-4 rounded-2xl bg-white/10 mt-6 relative z-10">
				{clans && clans.length > 0 ? (
					clans.map((clan, index) => {
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
									className="w-6 h-6 shrink-0"
								/>
							);

						return (
							<ClanItem
								key={clan.tg_id}
								user_tg_id={tg_id}
								place={placeItem}
								{...clan}
							/>
						);
					})
				) : (
					<p className="text-center text-white/50 my-4">No clans yet.</p>
				)}
			</div>

			<div
				className={cn(
					"opacity-50 fixed bottom-0 left-0 w-screen h-[90vh]",
					"[background:radial-gradient(ellipse_100%_90%_at_bottom,var(--app-color),transparent_100%)]",
				)}
			/>
		</main>
	);
};

interface ClanItemProps {
	user_tg_id: string;
	title: string;
	total_tokens: number;
	members: number;
	avatarUrl: string;
	tg_id: string;
	place: React.ReactNode;
}

const ClanItem: React.FC<ClanItemProps> = async ({
	user_tg_id,
	title,
	total_tokens,
	members,
	avatarUrl,
	tg_id,
	place,
}) => {
	return (
		<Link
			href={`/${user_tg_id}/clans/${tg_id}`}
			className="flex items-center gap-3 self-stretch"
		>
			<div className="relative">
				<Image
					src={`data:image/png;base64,${avatarUrl}`}
					alt="clan-avatar"
					width={160}
					height={160}
					className="w-12 h-12 rounded-full"
				/>

				<div className="flex items-center justify-center p-0.5 rounded-full bg-appcolor text-black text-[9px] leading-none font-medium min-w-[50px] h-4 absolute bottom-0 left-1/2 translate-x-[-50%]">
					<UserIcon className="mb-0.5 mr-[1px]" />

					{numberFormat(members)}
				</div>
			</div>

			<div className="flex flex-col">
				<p className="text-base font-bold">{`${title.slice(0, 22)}...`}</p>

				<p className="text-sm text-white/80">{numberFormat(total_tokens)}</p>
			</div>

			<div className="text-sm text-appcolor ml-auto w-6 h-6 text-center">
				{place}
			</div>
		</Link>
	);
};

export default ClansPage;
