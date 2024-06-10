#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue.bold("\n\t Welcome To Muhammad Mehdi Raza OOP My Bank\n\t"));

// Bank account interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    Withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

// creating a bank account class
class BankAccountImpl implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // debit Money
    Withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green.bold(`Withdrawal of $${amount} successfully.`));
            console.log(chalk.yellow.bold(`Remaining Balance $${this.balance}`));
        } else {
            console.log('Insufficient Balance');
        }
    }

    // credit Money
    deposit(amount: number): void {
        if (amount <= 0) {
            console.log(chalk.red.bold("Invalid deposit amount."));
            return;
        }

        if (amount >= 100) {
            amount -= 1;
            console.log(chalk.green.bold(`Processing fee of $1 deducted.`));
        }

        this.balance += amount;
        console.log(chalk.yellow.bold(`Deposit of $${amount} successful. Current Balance is: $${this.balance}`));
    }

    // check balance
    checkBalance(): void {
        console.log(chalk.green.bold(`Your current Balance is $${this.balance}`));
    }
}

/// creating a class for customer
class Customer {
    firstName: string;
    lastName: string;
    Gender: string;
    age: number;
    MobileNumber: number;
    Account: BankAccount;

    constructor(firstName: string, lastName: string, Gender: string, age: number, MobileNumber: number, Account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = Gender;
        this.age = age;
        this.MobileNumber = MobileNumber;
        this.Account = Account;
    }
}

// create bank accounts
const accounts: BankAccount[] = [
    new BankAccountImpl(1102, 500),
    new BankAccountImpl(1103, 1500),
    new BankAccountImpl(1104, 5000),
];

// create customers
const customers: Customer[] = [
    new Customer("Farman", "Ahsan", "Male", 18, 124651234, accounts[0]),
    new Customer("Ali", "Zaidi", "Male", 45, 768654334, accounts[1]),
    new Customer("Abu", "Talib", "Male", 23, 2345678901, accounts[2]),
];

// function to interact bank Account
async function main() {
    do {
        const answer = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your Account Number"
        });

        const customer = customers.find(customer => customer.Account.accountNumber === answer.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.lastName}\n\t`);

            const ans = await inquirer.prompt([{
                name: "options",
                type: "list",
                message: "Select one operation",
                choices: ["Deposit", "Withdraw", "CheckBalance", "Exit"]
            }]);

            switch (ans.options) {
                case "Deposit":
                    const depositAns = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Deposit"
                    });
                    customer.Account.deposit(depositAns.amount);
                    break;

                case "Withdraw":
                    const withdrawAns = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw"
                    });
                    customer.Account.Withdraw(withdrawAns.amount);
                    break;

                case "CheckBalance":
                    customer.Account.checkBalance();
                    break;

                case "Exit":
                    console.log(chalk.red.bold("Exiting Bank Program"));
                    console.log(chalk.green.bold("\n\tThank you for using our Bank services!\n\t"));
                    return;
            }
        } else {
            console.log(chalk.red.bold("Invalid Account Number! Please try again"));
        }
    } while (true);
}

main();