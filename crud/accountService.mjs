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
    const updatedAccount = new Account(id, lastName, firstName);
    accountDAO.updateAccount(updatedAccount);
  },
  getAccount(id) {
    return accountDAO.retrieveAccount(id);
  },
};