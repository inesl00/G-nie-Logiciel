const bankDAO = require('./bankDAO');
const bankTransfer = require('./bankTransfer');

const bank = {
    getBalance: function(accountId){
        return bankDAO.retrieveBalance(accountId);
    },

    transferMoney: function(accountId, amount){
        bankTransfer.transfer(accountId, amount);
        bankDAO.debitAccount(accountId, amount);
    }
}
module.exports = bank;