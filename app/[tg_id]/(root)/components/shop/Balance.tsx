"use client";

import { useAtomValue } from "jotai";

import { tokensAtom } from "@/lib/atoms";

const Balance = () => {
	const tokens = useAtomValue(tokensAtom);
	return (
		<p className="text-[52px] font-bold leading-none">
			{tokens?.toLocaleString("en-US")}
		</p>
	);
};

export default Balance;
