import { accountService } from "./accountService.mjs";

console.log("Ajout d'un compte :");
accountService.addAccount("Liu", "Inès");
accountService.addAccount("Machin", "Truc");

console.log("\nListe des comptes :");
const accounts = accountService.getAccountList();
console.log(accounts);

