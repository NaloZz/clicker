"use client";

import { cn } from "@/lib/utils";
import useTelegram from "@/hooks/useTelegram";

import { Button, ButtonProps } from "@/components/ui/button";

interface InviteButtonProps extends ButtonProps {
	ref_link: string;
	ref_text: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({
	ref_link,
	ref_text,
	className,
}) => {
	const telegram = useTelegram();

	const onInvite = () => {
		telegram?.openTelegramLink(
			`https://t.me/share/url?url=${ref_link}&text=${ref_text}`,
		);
	};

	return (
		<Button onClick={onInvite} className={cn("bg-appcolor", className)}>
			Invite a friend
		</Button>
	);
};

export default InviteButton;
