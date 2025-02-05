import { cn } from "@/lib/utils";
import prismadb from "@/lib/prismadb";
import { getClan } from "@/lib/server-actions";

import CreateButton from "@/components/ui/CreateButton";  // Используйте правильный путь в зависимости от настроек проекта

import Shop from "./components/shop";
import Nav from "./components/main/Nav";
import Clan from "./components/main/Clan";
import Coin from "./components/main/Coin";
import Friends from "./components/friends";
import Score from "./components/main/Score";
import Missions from "./components/missions";
import EnergyBar from "./components/main/EnergyBar";

export default async function Home({
  params: { tg_id },
}: { params: { tg_id: string } }) {
  try {
    const user = await prismadb.user.findUniqueOrThrow({
      where: { tg_id },
      include: { Clan: true, referrals: true },
    });

    const clan = await getClan({ tg_id: user.Clan?.tg_id });

    return (
      <main className="min-h-screen flex flex-col items-center p-4 pt-2 overflow-x-hidden relative">
        <Clan tg_id={tg_id} clan={clan} clanId={user.clanId} />

        <div className="flex flex-col gap-8 items-center w-full relative z-10 mt-8">
          <Score user={user} />

          <Coin user={user} />
        </div>

        <div className="flex flex-col gap-5 self-stretch mt-auto w-[calc(100vw-32px)] fixed bottom-8 z-10">
          <Nav />

          {/* 🔥 Текст "BURN IT ALL" */}
          <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 text-white text-2xl font-extrabold z-20">
            BURN IT ALL
          </div>

          {/* 🔥 Размытие + картинка огня */}
          <div className="absolute bottom-0 left-0 w-full h-full bg-opacity-50">
            <img 
              src="/whattapcoinmin.gif" 
              alt="Fire Background" 
              className="w-full h-full object-cover blur-lg opacity-80"
            />
          </div>

          {/* 🔥 Радужный градиентный фон убран, оставлена только гифка с огнем */}
          <div
            className={cn(
              "fixed bottom-0 left-0 w-screen h-screen z-0"
            )}
          />

        </div> {/* конец блока с основным контентом */}

      </main>
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
