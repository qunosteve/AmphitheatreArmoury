import { Lucid, Blockfrost } from "https://deno.land/x/lucid/mod.ts"

const lucid = await Lucid.new(
  new Blockfrost(
    "https://cardano-mainnet.blockfrost.io/api/v0",
    "<project_id>",
  ),
);