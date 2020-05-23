import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface RequestDTO{
  title:string;
  value:number;
  type: 'income'|'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income=0,outcome=0,balance;
    this.transactions.forEach(element => {
      if(element.type=='income'){
        income+=element.value;
      }else{
        outcome+=element.value;
      }
    });
    balance = {
      income,
      outcome,
      total: (income-outcome)
    }
    return balance;
  }

  public create({title,value,type}:RequestDTO): Transaction {
    const transaction = new Transaction({title,value,type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
