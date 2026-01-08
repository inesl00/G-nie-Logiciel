import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";

console.log("Ajout d'un compte :");
accountCommand.addAccount("Liu", "Inès");
accountCommand.addAccount("Machin", "Truc");

console.log("\nListe des comptes :");
const accounts = accountQuery.getAccountList();
console.log(accounts);

console.log("\nMise à jour d'un compte :");
const firstAccountId = accounts[0].id;
accountCommand.saveAccount(firstAccountId, "Liu", "Ines");

console.log("\nRécupération d'un compte :");
const account = accountQuery.getAccount(firstAccountId);
console.log(account);