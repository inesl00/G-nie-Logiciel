const bankDAO = {
    retrieveBalance: function(accountId){
        console.log("Retrieve balance for account: " + accountId);
    },

    debitAccount: function(accountId, amount){
        console.log("Debit " + amount + " from account: " + accountId);
    }
}
module.exports = bankDAO;