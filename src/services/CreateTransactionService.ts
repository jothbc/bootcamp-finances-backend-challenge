import TransactionsRepository,{Balance} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title:string;
  value:number;
  type: 'income'|'outcome';
}
interface TransactionWithBalance{
  transactions:Transaction[];
  balance:Balance;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
    if(type!='income' && type!='outcome'){
      throw new Error('Type is incorrect');
    }

    if(type=='outcome'){
      const balance = this.transactionsRepository.getBalance();
      if(value>balance.total){
        throw new Error ('Insufficient funds.');
      }
    }
    const transaction = this.transactionsRepository.create({title,value,type});

    return transaction;
  }
  public findAll():TransactionWithBalance{

    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    const transactionWithBalance = {
      transactions,
      balance
    }
    return transactionWithBalance;
  }
}

export default CreateTransactionService;
