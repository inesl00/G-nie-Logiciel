import { accountService } from "./accountService.mjs";

console.log("Ajout d'un compte :");
accountService.addAccount("Liu", "Inès");
accountService.addAccount("Machin", "Truc");

console.log("\nListe des comptes :");
const accounts = accountService.getAccountList();
console.log(accounts);

console.log("\nMise à jour d'un compte :");
const firstAccountId = accounts[0].id;
accountService.saveAccount(firstAccountId, "Liu", "Ines");

console.log("\nRécupération d'un compte :");
const account = accountService.getAccount(firstAccountId);
console.log(account);