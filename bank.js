const bankDAO = require('./bankDAO');

const bank = {
    getBalance: function(accountId){
        return bankDAO.retrieveBalance(accountId);
    }
}
module.exports = bank;