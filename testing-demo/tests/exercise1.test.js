const lib = require("../exercise1");

describe("fizzbuzz", () => {
  it.each([[null], [undefined], [Boolean], [String]])(
    "should throw Error if datatype not a number (%p)",
    (type) => {
      expect(() => {
        lib.fizzBuzz(type);
      }).toThrow();
    }
  );
  it("should return FizzBuzz if the number is divisble by 3 and 5 ", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
  });
  it("should return Fizz if the number is divisble by 3  ", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toMatch(/Fizz/);
  });
  it("should return Fizz if the number is divisble by 5  ", () => {
    const result = lib.fizzBuzz(10);
    expect(result).toMatch(/Buzz/);
  });
  it("should return input if the number is not divisble by 3 or 5  ", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
