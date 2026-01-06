import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const newAccount = new Account(null, lastName, firstName);
        accountCommandDAO.insertAccount(newAccount);
    },
    saveAccount(id, lastName, firstName) {
        const updatedAccount = new Account(id, lastName, firstName);
        accountCommandDAO.updateAccount(updatedAccount);
    },
};