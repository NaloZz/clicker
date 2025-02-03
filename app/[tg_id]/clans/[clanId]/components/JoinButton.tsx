"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { joinClan, leaveClan } from "@/lib/server-actions";

import { Button } from "@/components/ui/button";

const JoinButton = ({
	tg_id,
	clanId,
	joined,
}: { tg_id: string; clanId: string; joined?: boolean }) => {
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const onLeave = async () => {
		try {
			setLoading(true);

			const leave = leaveClan({ tg_id });

			await toast.promise(leave, {
				loading: "Leaving",
				success: "You left clan",
				error: "Error",
			});

			router.push(`/${tg_id}`);

			router.refresh();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const onJoin = async () => {
		try {
			setLoading(true);

			const join = joinClan({ tg_id, clanId });

			await toast.promise(join, {
				loading: "Loading",
				success: "You joined clan",
				error: "Error",
			});

			router.push(`/${tg_id}`);

			router.refresh();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (joined) {
		return (
			<Button onClick={onLeave} disabled={loading} className="bg-white/20">
				Leave clan
			</Button>
		);
	}

	return (
		<Button onClick={onJoin} disabled={loading} className="bg-white/20">
			Join clan
		</Button>
	);
};

export default JoinButton;
