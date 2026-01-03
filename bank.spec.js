const bank = require('./bank');
const bankDAO = require('./bankDAO');
const bankTransfer = require('./bankTransfer');

test('getBalance call retrieveBalance without executing', () => {
    const spy = jest.spyOn(bankDAO, 'retrieveBalance').mockImplementation(() => {});

    bank.getBalance();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});

test('getBalance call retrieveBalance with accountId', () => {
    const spy = jest.spyOn(bankDAO, 'retrieveBalance').mockImplementation(() => {});
    const accountId = "12345";

    bank.getBalance(accountId);

    expect(spy).toHaveBeenCalledWith(accountId);
    spy.mockRestore();
});

test('getBalance return the balance retrieved from DAO', () => {
    const spy = jest.spyOn(bankDAO, 'retrieveBalance').mockReturnValue(15);
    const accountId = "12345";

    const result = bank.getBalance(accountId);

    expect(result).toBe(15);
    spy.mockRestore();
});

test('transferMoney call transfer with accountId and amount', async () => {
    const spy = jest.spyOn(bankTransfer, 'transfer').mockImplementation(() => {});
    const accountId = "12345";
    const amount = 15;

    await bank.transferMoney(accountId, amount);

    expect(spy).toHaveBeenCalledWith(accountId, amount);
    spy.mockRestore();
});

test('transferMoney call transfer and debitAccount with accountId and amount', async () => {
    const spyTransfer = jest.spyOn(bankTransfer, 'transfer').mockImplementation(() => {});
    const spyDebit = jest.spyOn(bankDAO, 'debitAccount').mockImplementation(() => {});
    const accountId = "12345";
    const amount = 15;

    await bank.transferMoney(accountId, amount);

    expect(spyTransfer).toHaveBeenCalledWith(accountId, amount);
    expect(spyDebit).toHaveBeenCalledWith(accountId, amount);
    spyTransfer.mockRestore();
    spyDebit.mockRestore();
});

test('transferMoney call transfer with error', async () => {
    const spyTransfer = jest.spyOn(bankTransfer, 'transfer').mockRejectedValue(new Error("Transfer error"));
    const spyDebit = jest.spyOn(bankDAO, 'debitAccount').mockImplementation(() => {});
    const accountId = "12345";
    const amount = 15;

    try {
        await bank.transferMoney(accountId, amount);
    } catch (e) {
        console.log("Caught error: " + e.message);
    }
   

    expect(spyTransfer).toHaveBeenCalledWith(accountId, amount);
    expect(spyDebit).not.toHaveBeenCalled();
    spyTransfer.mockRestore();
    spyDebit.mockRestore();
});