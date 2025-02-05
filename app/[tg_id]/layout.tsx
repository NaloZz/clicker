import prismadb from "@/lib/prismadb";

import EnergyProvider from "@/providers/EnergyProvider";

import CreateButton from "@/components/ui/CreateButton";

export default async function GameLayout({
	children,
	params: { tg_id },
}: { children: React.ReactNode; params: { tg_id: string } }) {
	try {
		const user = await prismadb.user.findUniqueOrThrow({
			where: { tg_id },
		});

		if (!user) {
			return (
				<main className="min-h-screen flex items-center justify-center">
					<CreateButton />
				</main>
			);
		}

		return (
			<>
				{children}
				<EnergyProvider user={user} />
			</>
		);
	} catch (error) {
		console.log(error);

		return (
			<main className="min-h-screen flex items-center justify-center">
				<CreateButton />
			</main>
		);
	}
}
