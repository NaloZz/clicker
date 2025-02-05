"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import useTelegram from "@/hooks/useTelegram";
import { createUser } from "@/lib/server-actions";

import { Button } from "@/components/ui/button";

const CreateButton = () => {
	const [loading, setLoading] = useState(false);

	const telegram = useTelegram();

	const router = useRouter();

	const onClick = async () => {
		if (telegram) {
			try {
				setLoading(true);

				const { id, username, is_premium, first_name, last_name } =
					telegram?.initDataUnsafe.user;

				const result = await createUser({
					tg_id: String(id),
					tg_username: username ?? "no username",
					tg_premium: is_premium,
					first_name,
					last_name: last_name ?? "",
				});

				if (result === "exist") {
					return toast.error("User exist");
				}
				if (result === "error") {
					return toast.error("Error while creating");
				}

				router.refresh();
				toast.success("Success");
			} catch (error) {
				console.log(error);
				toast.error("Error");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Button onClick={onClick} disabled={loading}>
			Create account
			{loading && <LoaderCircle className="w-4 h-4 animate-spin ml-2" />}
		</Button>
	);
};

export default CreateButton;
