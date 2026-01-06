import { ACCOUNT_LIST } from "./database.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
    return ACCOUNT_LIST.map(function (account) {
        const {creationDate, ...accountWithoutDate} = account;
        return accountWithoutDate;
    });
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