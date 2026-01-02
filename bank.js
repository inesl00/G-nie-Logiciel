const bankDAO = require('./bankDAO');

const bank = {
    getBalance: function(){
        return bankDAO.retrieveBalance();
    }
}
module.exports = bank;