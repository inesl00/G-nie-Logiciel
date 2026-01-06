import { ACCOUNT_LIST } from "./database.mjs";
import { Account } from "./account.mjs";

export const accountCommandDAO = {
    insertAccount(account) {
        ACCOUNT_LIST.push(account);
        console.log(ACCOUNT_LIST);
    },
    updateAccount(account) {
        const index = ACCOUNT_LIST.findIndex((acc) => acc.id == account.id);
        if (index != -1) {
            ACCOUNT_LIST[index] = account;
            console.log(ACCOUNT_LIST);
        }
        else {
            console.log("Compte introuvable");
        }
    },
    restore(id){
        const account = ACCOUNT_LIST.find((acc) => acc.id == id);
        if (account) {
            return new Account(account.id, account.lastName, account.firstName, account.creationDate);
        }
    },
};