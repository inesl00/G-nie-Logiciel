const bank = require('./bank');
const bankDAO = require('./bankDAO');

test('getBalance call retrieveBalance without executing', () => {
    const spy = jest.spyOn(bankDAO, 'retrieveBalance').mockImplementation(() => {});

    bank.getBalance();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
});
