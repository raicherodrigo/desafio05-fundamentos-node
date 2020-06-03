import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public validateValue(valueRec: number, type: 'income' | 'outcome'): boolean {
    const { income, outcome, total }: Balance = this.getBalance();
    if (type === 'outcome' && valueRec > total) {
      return true;
    }
    return false;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((sum, currentValue) => {
      if (currentValue.type === 'income') {
        return sum + currentValue.value;
      }
      return sum;
    }, 0);

    const outcome = this.transactions.reduce((sum, currentValue) => {
      if (currentValue.type === 'outcome') {
        return sum + currentValue.value;
      }
      return sum;
    }, 0);

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
