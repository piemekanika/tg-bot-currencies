import dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';

import { getMoexRates } from './api/getMoexRates.js'

const bot = new Telegraf(process.env.BOT_TOKEN);

const buildResponse = (rates) => {
    return `
По данным Московской биржи:
${rates}
    `;
}

bot.hears('Показать курсы', async (ctx) => {

    await ctx.reply(`Загрузка...`);

    await ctx.reply(buildResponse(await getMoexRates()));

})

await bot.launch();
