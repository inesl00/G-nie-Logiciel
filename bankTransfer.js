const bankTransfer = {
    transfer: function (accountId, amount) {
        console.log("Transfer " + amount + " for account " + accountId);
        return Promise.resolve();
    }
}
module.exports = bankTransfer;

