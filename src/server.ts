import express from "express";
import { Bot, webhookCallback } from "grammy";
import type { Context } from "grammy";
import { scanHandler } from "./handlers/scan";

const PORT = parseInt(process.env.PORT || "8080", 10);
const BOT_TOKEN = process.env.BOT_TOKEN!;
const BOT_SECRET = process.env.BOT_SECRET || ""; // optional secret for webhook path hardening

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing!");
}

const app = express();
app.use(express.json());

// --- Telegram bot ---
const bot = new Bot<Context>(BOT_TOKEN);

// Basic commands
bot.command("start", async (ctx) => {
  await ctx.reply(
    "Welcome to FOMO Superbot 🚀\n\nTry:\n/status – check liveness\n/scan <token_address> – scan a token (stub)"
  );
});

bot.command("status", async (ctx) => {
  await ctx.reply("FOMO Superbot is alive ✅");
});

// New: /scan
bot.command("scan", scanHandler);

// Health endpoint for Railway
app.get("/health", (_req, res) => res.send("OK"));

// Telegram webhook endpoint
const webhookPath = BOT_SECRET ? `/tg/webhook/${BOT_SECRET}` : "/tg/webhook";
app.use(webhookPath, webhookCallback(bot, "express"));

// Root info
app.get("/", (_req, res) => res.send("FOMO Superbot API"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
