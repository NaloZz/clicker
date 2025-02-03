"use server";

import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);

export const createClan = async ({ query_id }: { query_id: string }) => {
 try {
  await bot.answerWebAppQuery(query_id, {
   id: "0",
   type: "article",
   title: "Hello Mini App!",
   input_message_content: {
    message_text: "/create",
   },
  });
 } catch (error) {
  console.log(error);
 }
};

export const invite = async ({ query_id }: { query_id: string }) => {
	try {
		bot.answerWebAppQuery(query_id, {
			id: "0",
			type: "article",
			title: "Hello Mini App!",
			input_message_content: {
				message_text: "/invite",
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export const checkMember = async ({
	tg_id,
	channelId,
}: { tg_id: number; channelId: number }) => {
	try {
		const member = await bot.getChatMember(channelId, tg_id);

		if (
			member.status === "member" ||
			member.status === "administrator" ||
			member.status === "creator"
		) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
		return false;
	}
};
