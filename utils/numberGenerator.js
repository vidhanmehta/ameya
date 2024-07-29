class UniqueNumberGenerator {
  constructor() {
    this.generatedNumbers = new Set();
  }

  generate() {
    let number;
    do {
      number = Math.floor(Math.random() * 90000000) + 10000000; // Generates an 8-digit number between 10000000 and 99999999
    } while (this.generatedNumbers.has(number));

    this.generatedNumbers.add(number);
    return number;
  }
}

export const generator = new UniqueNumberGenerator();

