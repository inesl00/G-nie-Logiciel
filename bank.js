const bankDAO = require('./bankDAO');
const bankTransfer = require('./bankTransfer');

const bank = {
    getBalance: function(accountId){
        return bankDAO.retrieveBalance(accountId);
    },

    transferMoney: async function(accountId, amount){
        await bankTransfer.transfer(accountId, amount);
        bankDAO.debitAccount(accountId, amount);
    }
}
module.exports = bank;