import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { accountQueryDAO } from "./accountQueryDAO.mjs";
import { cacheDAO } from "./cacheDAO.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const newAccount = new Account(null, lastName, firstName);
        accountCommandDAO.insertAccount(newAccount);
        
        const {creationDate, ...accountWithoutDate} = newAccount;
        accountQueryDAO.insertAccountSummary(accountWithoutDate);

        const {lastName: ln, firstName: fn, ...accountforCache} = newAccount;
        accountforCache.name = `${firstName} ${lastName}`;
        cacheDAO.saveAccount(accountforCache);
    },
    saveAccount(id, lastName, firstName) {
        const updatedAccount = accountCommandDAO.restore(id);
        if (updatedAccount) {
            updatedAccount.lastName = lastName;
            updatedAccount.firstName = firstName;
        }
        accountCommandDAO.updateAccount(updatedAccount);

        const {creationDate, ...accountWithoutDate} = updatedAccount;
        accountQueryDAO.saveAccountSummary(accountWithoutDate);

        const {lastName: ln, firstName: fn, ...accountforCache} = updatedAccount;
        accountforCache.name = `${firstName} ${lastName}`;
        cacheDAO.saveAccount(accountforCache);
    },
};
