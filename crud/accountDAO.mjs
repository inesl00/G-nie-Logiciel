import { Account } from "./account.mjs";
import { ACCOUNT_LIST } from "./database.mjs";

export const accountDAO = {
  insertAccount(account) {
    ACCOUNT_LIST.push(account);
    console.log(ACCOUNT_LIST);
  },
  retrieveAccountList() {
    return ACCOUNT_LIST.map(function (account) {
        const {creationDate, ...accountWithoutDate} = account;
        return accountWithoutDate;
    });
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
  retrieveAccount(id) {},
};