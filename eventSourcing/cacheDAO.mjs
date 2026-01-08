import { accountCache } from "./cache.mjs";

export const cacheDAO = {
    saveAccount(account) {
        accountCache[account.id] = account;
    }
}