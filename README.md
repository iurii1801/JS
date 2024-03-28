## Отчет - Индивидуальная (лабораторная) работа №1

Важно! Чтобы запустить этот проект вам необходимо использовать Visual Studio Code с установленным Node.js.

##  Описание проекта
Консольное приложение для анализа транзакций.

## Структура проекта
1. файл `transactions.json`, содержащий указанные транзакции
2. файл `main.js`, содержащий весь код

## Класс `TransactionAnalyzer`
Данный класс отвечает за обработку и анализ транзакций.
- Конструктор: Принимает массив транзакций в качестве аргумента.
- Методы:
  1. `addTransaction()`: Добавляет новую транзакцию.
  2. `getAllTransactions()`: Возвращает список всех транзакций.
  3. `addTransaction(transactionData)`: Добавляет новую транзакцию в список транзакций.
  4. `getAllTransactions()`: Возвращает список всех транзакций.
  5. `getUniqueTransactionTypes()`: Возвращает массив уникальных типов транзакций.
  6. `calculateTotalAmount()`: Рассчитывает общую сумму всех транзакций.
  7. `calculateTotalAmountByDate(year, month, day)`: Вычисляет общую сумму транзакций за указанный год, месяц и день.
  8. `getTransactionByType(type)`: Возвращает транзакции указанного типа.
  9. `getTransactionsInDateRange(startDate, endDate)`: Возвращает транзакции, проведенные в указанном диапазоне дат.
  10. `getTransactionsByMerchant(merchantName)`: Возвращает транзакции, совершенные с указанным торговым местом или компанией.
  11. `calculateAverageTransactionAmount()`: Возвращает среднее значение транзакций.
  12. `getTransactionsByAmountRange(minAmount, maxAmount)`: Возвращает транзакции с суммой в заданном диапазоне.
  13. `calculateTotalDebitAmount()`: Вычисляет общую сумму дебетовых транзакций.
  14. `findMostTransactionsMonth()`: Возвращает месяц, в котором было больше всего транзакций.
  15. `findMostDebitTransactionMonth()`: Возвращает месяц, в котором было больше дебетовых транзакций.
  16. `mostTransactionTypes()`: Возвращает тип транзакций, которых было больше всего.
  17. `getTransactionsBeforeDate(date)`: Возвращает транзакции, совершенные до указанной даты.
  18. `findTransactionById(id)`: Возвращает транзакцию по ее уникальному идентификатору.
  19. `mapTransactionDescriptions()`: Возвращает новый массив, содержащий только описания транзакций.
 
  ## Объект `Transaction`

Это отдельная транзакция со всеми необходимыми данными.
Свойства:
* `transaction_id`: Идентификатор транзакции. Например: “1”.
* `transaction_date`: Дата транзакции. Например: “2019-01-01”.
* `transaction_amount`: Сумма транзакции. Например: “100.00”.
* `transaction_type`: Тип транзакции. Например: “debit” (дебет).
* `transaction_description`: Описание транзакции. Например: “Payment for groceries” (Оплата за продукты).
* `merchant_name`: Название продавца. Например: “SuperMart”.
* `card_type`: Тип карты. Например: “Visa”.

## Ответы на контрольные вопросы
1. Какие примитивные типы данных существуют в JavaScript?
   - number
   - undefined
   - boolean
   - string
   - symbol
   - bigint
2. Какие методы массивов вы использовали для обработки и анализа данных в вашем приложении, и как они помогли в выполнении задачи?

Я использовал один метод массивов для обработки и анализа данных - это:

`.filter()` - для того, чтобы создать массив из транзакций с опредленной датой.
  
 
```javascript
const all_transactions_by_month = this.transactions.filter(transaction => {
    let date_split = transaction.transaction_date.split("-");
    if((date_split[0]+"-"+date_split[1]) === month) {
        return true;
    } else {
        return false;
    }
});

