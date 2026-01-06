import { Account } from "./account.mjs";
import { accountDAO } from "./accountDAO.mjs";

export const accountService = {
  addAccount(lastName, firstName) {
    const newAccount = new Account(null, lastName, firstName);
    accountDAO.insertAccount(newAccount);
  },
  getAccountList() {
    return accountDAO.retrieveAccountList();
  },
  saveAccount(id, lastName, firstName) {
    const updatedAccount = accountDAO.restore(id);
    if (updatedAccount) {
        updatedAccount.lastName = lastName;
        updatedAccount.firstName = firstName;
    }
    accountDAO.updateAccount(updatedAccount);
  },
  getAccount(id) {
    return accountDAO.retrieveAccount(id);
  },
};