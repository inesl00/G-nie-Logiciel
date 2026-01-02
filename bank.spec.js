const bank = require('./bank');
const bankDAO = require('./bankDAO');

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
