const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should be a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });
  it("should be a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });
  it("should be a zero if input is zero", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should greet the user ", () => {
    const result = lib.greet("Ahmad");
    expect(result).toMatch(/Ahmad/);
    expect(result).toContain("Ahmad");
  });
});

describe("getCurrencies", () => {
  it("should return the array of currencies ", () => {
    const result = lib.getCurrencies();
    //Too general Ways
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //Too specific tests
    expect(result[0]).toContain("USD");
    expect(result[1]).toContain("AUD");
    expect(result[2]).toContain("EUR");
    expect(result.length).toBe(3);

    //A good Practice
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal Practice
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id ", () => {
    const result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it.each([[null], [undefined], [NaN], [0], [false], [""]])(
    "should throw if username is falsy (%p)",
    (type) => {
      expect(() => {
        lib.registerUser(type);
      }).toThrow();
    }
  );
});

describe("applyDiscount", () => {
  it("should apply a discount of 10% if the customer points are greater than 10 ", () => {
    db.getCustomerSync = function (customerId) {
      console.log("fake customer reading");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should notify the customer through email", () => {
    db.getCustomer = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    // expect(mail.send.mock.calls[0][0]).toBe("a");
    // expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
