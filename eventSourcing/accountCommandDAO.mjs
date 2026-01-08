import { ACCOUNT_LIST } from "./database.mjs";
import { Account } from "./account.mjs";
import { eventList } from "./eventStore.mjs";

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
    restoreEvent(id) {
        const events = eventList.filter(event => event.accountId == id);
        if (events.length == 0) return null;
        let restoredAccount = null;

        events.forEach(event => {
            switch (event.name) {
                case "accountAdded":
                    const p = event.payload;
                    
                    restoredAccount = new Account(p.id, p.lastName, p.firstName, p.creationDate);
                    break;
                case "accountUpdated":
                    const mergedData = { ...restoredAccount, ...event.payload };

                    restoredAccount = new Account(
                        mergedData.id, 
                        mergedData.lastName, 
                        mergedData.firstName, 
                        mergedData.creationDate
                    );
                    break;
                case "accountDeleted":
                    restoredAccount = null;
                    break;
            }
        });
        return restoredAccount;
    },
};