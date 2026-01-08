import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { accountQueryDAO } from "./accountQueryDAO.mjs";
import { cacheDAO } from "./cacheDAO.mjs";
import { Event } from "./event.mjs";
import { eventStore } from "./eventStore.mjs";
import { eventList } from "./eventStore.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const newAccount = new Account(null, lastName, firstName);
        
        const {creationDate, ...accountWithoutDate} = newAccount;
        accountQueryDAO.insertAccountSummary(accountWithoutDate);

        const {lastName: ln, firstName: fn, ...accountforCache} = newAccount;
        accountforCache.name = `${firstName} ${lastName}`;
        cacheDAO.saveAccount(accountforCache);

        const event = new Event("accountAdded", newAccount.id, newAccount);
        eventStore.addEvent(event);
    },
    saveAccount(id, lastName, firstName) {
        const lastAccount = eventList.findLast(event => event.accountId === id).payload;
        if (!lastAccount) return;
        
        const copyAccount = {...lastAccount};
        copyAccount.lastName = lastName;
        copyAccount.firstName = firstName;
        
        const event = new Event("accountUpdated", id, copyAccount);
        eventStore.addEvent(event);

        const {creationDate, ...accountWithoutDate} = copyAccount;
        accountQueryDAO.saveAccountSummary(accountWithoutDate);

        const {lastName: ln, firstName: fn, ...accountforCache} = copyAccount;
        accountforCache.name = `${firstName} ${lastName}`;
        cacheDAO.saveAccount(accountforCache);
    },
};
