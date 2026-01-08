import { ACCOUNT_LIST } from "./database.mjs";
import { accountSummaryList } from "./queryDatabase.mjs";
import { accountCache } from "./cache.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
        return accountSummaryList;
    },
    retrieveAccount(id) {
        return accountCache[id];
    },
    insertAccountSummary(account) {
        accountSummaryList.push(account);
    },
    saveAccountSummary(account) {
        const index = accountSummaryList.findIndex((acc) => acc.id == account.id);
        if (index != -1) {
            accountSummaryList[index] = account;
        }
    },
};