import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { accountSummaryList } from "./queryDatabase.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const newAccount = new Account(null, lastName, firstName);
        accountCommandDAO.insertAccount(newAccount);
        
        this.addAccountInQueryDB(newAccount);
    },
    addAccountInQueryDB(account) {
        const {creationDate, ...accountWithoutDate} = account;
        accountSummaryList.push(accountWithoutDate);
    },
    saveAccount(id, lastName, firstName) {
        const updatedAccount = accountCommandDAO.restore(id);
        if (updatedAccount) {
            updatedAccount.lastName = lastName;
            updatedAccount.firstName = firstName;
        }
        accountCommandDAO.updateAccount(updatedAccount);

        this.saveAccountInQueryDB(updatedAccount);
    },
    saveAccountInQueryDB(account) {
        const index = accountSummaryList.findIndex((acc) => acc.id == account.id);
        if (index != -1) {
            const {creationDate, ...accountWithoutDate} = account;
            accountSummaryList[index] = accountWithoutDate;
        }
    },
};