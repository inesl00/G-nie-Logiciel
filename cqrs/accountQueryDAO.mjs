import { ACCOUNT_LIST } from "./database.mjs";
import { accountSummaryList } from "./queryDatabase.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
        return accountSummaryList;
    },
    retrieveAccount(id) {
        const account = ACCOUNT_LIST.find((acc) => acc.id == id);
        if (!account) return null;
        const {lastName, firstName, ...rest} = account;
        return {
            id: rest.id,
            name: `${lastName} ${firstName}`,
            ...rest,
        };
    },
};