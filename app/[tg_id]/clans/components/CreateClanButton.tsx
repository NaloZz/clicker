"use client";

import Image from "next/image";
import { useState } from "react";

import useTelegram from "@/hooks/useTelegram";
import { createClan } from "@/lib/bot-actions";

import {
 Sheet,
 SheetClose,
 SheetContent,
 SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { clan_price } from "@/constants";

const CreateClanButton = () => {
 const telegram = useTelegram();

 const [loading, setLoading] = useState(false);

 const onCreate = async () => {
  try {
   setLoading(true);

   if (telegram) {
    await createClan({ query_id: telegram.initDataUnsafe.query_id });
   }
  } catch (error) {
  } finally {
   setLoading(false);
  }
 };

 return (
  <Sheet>
   <SheetTrigger asChild>
    <Button className="bg-grey self-stretch mt-[33px] relative z-10">
     Soon
    </Button>
   </SheetTrigger>

   <SheetContent side="bottom">
    <div className="flex flex-col items-center pt-[34px]">
     <Image
      src="/ninja.png"
      alt="ninja"
      width={160}
      height={160}
      className="w-[72px] h-[72px]"
     />

     <h1 className="text-[26px] font-bold mt-5">Connect wallet</h1>

     <p className="text-sm text-center mt-2.5 max-w-[220px]">
      Invite friends to your community and earn dotcoins even faster
     </p>

     <p className="flex items-end text-2xl font-medium mt-4">
      {clan_price.toLocaleString("en-US").replaceAll(",", " ")}
      <span className="text-[13px] text-white/50 translate-y-[5%]">
       &nbsp;/ per clan
      </span>
     </p>

     <SheetClose asChild>
      <Button
       onClick={onCreate}
       disabled={loading}
       className="mt-8 self-stretch bg-gradient-to-r from-transparent to-appcolor"
      >
       {loading ? "Loading..." : "Get"}
      </Button>
     </SheetClose>
    </div>
   </SheetContent>
  </Sheet>
 );
};

export default CreateClanButton; 
