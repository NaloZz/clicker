import prismadb from "@/lib/prismadb";
import EnergyProvider from "@/providers/EnergyProvider";
import CreateButton from "@/components/ui/CreateButton";

export default async function GameLayout({
	children,
	params: { tg_id },
}: { children: React.ReactNode; params: { tg_id: string } }) {
	try {
		// Проверяем, есть ли пользователь
		let user = await prismadb.user.findUnique({
			where: { tg_id },
		});

		// Если пользователя нет → создаём его
		if (!user) {
			user = await prismadb.user.create({
				data: {
					tg_id,
					tg_username: "unknown",
					first_name: "New",
					last_name: "",
					tokens: 0,
					batteryLvl: 0,
					chargerLvl: 0,
					multitapLvl: 0,
				},
			});
		}

		return (
			<>
				{children}
				<EnergyProvider user={user} />
			</>
		);
	} catch (error) {
		console.log("Ошибка в GameLayout:", error);

		return (
			<main className="min-h-screen flex items-center justify-center">
				<CreateButton />
			</main>
		);
	}
}
