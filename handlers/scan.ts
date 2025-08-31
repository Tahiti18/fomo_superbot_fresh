import { Context } from "grammy";

/**
 * /scan <address>
 * For now: validates the format a bit and replies with a stub message.
 */
export async function scanHandler(ctx: Context) {
  const text = ctx.message?.text ?? "";
  const parts = text.trim().split(/\s+/);
  const address = parts[1];

  if (!address) {
    return ctx.reply("Usage: /scan <token_address>");
  }

  // super-light sanity check, not strict
  if (!/^0x[a-fA-F0-9]{6,}$/.test(address)) {
    return ctx.reply("That doesn’t look like an EVM address. Try again.");
  }

  // TODO: replace this with real logic later
  await ctx.reply(`Scanning: ${address}\n(status: stub)`);
}
