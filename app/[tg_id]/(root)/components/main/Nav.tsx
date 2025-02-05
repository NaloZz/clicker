"use client";

import Image from "next/image";
import { useSetAtom } from "jotai";
import { ButtonHTMLAttributes, Fragment } from "react";

import { sheetAtom } from "@/lib/atoms";
import useTelegram from "@/hooks/useTelegram";

import { SheetRoute } from "@/types";

const Nav = () => {
	const telegram = useTelegram();

	const setSheet = useSetAtom(sheetAtom);

	const routes: { label: string; imageUrl: string; value: SheetRoute }[] = [
		{ label: "Shop", imageUrl: "/shop.png", value: "shop" },
		{ label: "Friends", imageUrl: "/frens.png", value: "friends" },
		{
			label: "Missions",
			imageUrl: "/missions.png",
			value: "missions",
		},
	];

	return (
		<nav className="flex items-center rounded-2xl bg-white/40 backdrop-blur self-stretch overflow-hidden relative z-10">
			{routes.map((route) => (
				<Fragment key={route.value}>
					<NavItem
						label={route.label}
						imageUrl={route.imageUrl}
						onClick={() => {
							telegram?.HapticFeedback.impactOccurred("soft");
							setSheet(route.value);
						}}
					/>

					<div className="w-[1px] h-10 rounded-full bg-white/30 last:hidden" />
				</Fragment>
			))}
		</nav>
	);
};

interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	imageUrl: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, imageUrl, ...props }) => {
	return (
		<button
			className="flex flex-col items-center gap-1.5 py-2 flex-1 transition-colors duration-100 active:bg-white/20"
			{...props}
		>
			<Image
				src={imageUrl}
				alt="icon"
				width={72}
				height={72}
				className="w-6 h-6"
			/>

			<p className="text-xs font-medium">{label}</p>
		</button>
	);
};

export default Nav;
