const transactionsImport = require('./transactions.json');

// Добавляем метод `string()` ко всем транзакциям для их строкового представления
transactionsImport.forEach(transaction => {
    transaction.string = function() { return JSON.stringify(this); };
});

/**
 * Класс для анализа транзакций.
 */
class TransactionAnalyzer {
    /**
     * Создает экземпляр TransactionAnalyzer.
     * @param {Object[]} transactions - Массив транзакций.
     */
    constructor(transactions) {
        this.transactions = transactions;
    }

    /**
     * Добавляет новую транзакцию в список.
     * @param {Object} transactionDetails - Детали новой транзакции.
     */
    addTransaction(transactionDetails) {
        this.transactions.push({
            ...transactionDetails,
            transaction_id: (Number(this.transactions[this.transactions.length - 1].transaction_id) + 1).toString(),
            transaction_amount: Number(transactionDetails.transaction_amount),
            string() { return JSON.stringify(this); }
        });
    }

    /**
     * Возвращает список всех транзакций.
     * @returns {Object[]} Массив всех транзакций.
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Возвращает множество уникальных типов транзакций.
     * @returns {Set<string>} Множество уникальных типов транзакций.
     */
    getUniqueTransactionTypes() {
        return new Set(this.transactions.map(transaction => transaction.transaction_type));
    }

    /**
     * Вычисляет и возвращает общую сумму всех транзакций.
     * @returns {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((acc, transaction) => acc + transaction.transaction_amount, 0);
    }

    /**
     * Фильтрует и возвращает транзакции указанного типа.
     * @param {string} type - Тип транзакции (например, 'debit' или 'credit').
     * @returns {Object[]} Массив транзакций указанного типа.
     */
    getTransactionsByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Возвращает транзакции, проведенные в заданном диапазоне дат.
     * @param {string} startDate - Начальная дата в формате YYYY-MM-DD.
     * @param {string} endDate - Конечная дата в формате YYYY-MM-DD.
     * @returns {Object[]} Массив транзакций в указанном диапазоне дат.
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(transaction => 
            transaction.transaction_date >= startDate && transaction.transaction_date <= endDate);
    }

    /**
     * Вычисляет сумму транзакций за определенную дату.
     * @param {string} year - Год в формате YYYY.
     * @param {string} month - Месяц в формате MM.
     * @param {string} day - День в формате DD.
     * @returns {number} Сумма транзакций за указанную дату.
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((total, transaction) => {
            const [transYear, transMonth, transDay] = transaction.transaction_date.split('-');
            if ((year === undefined || year === transYear) &&
                (month === undefined || month === transMonth) &&
                (day === undefined || day === transDay)) {
                return total + transaction.transaction_amount;
            }
            return total;
        }, 0);
    }

    /**
     * Возвращает транзакции, проведенные в указанной торговой точке или компании.
     * @param {string} merchantName - Название торговой точки или компании.
     * @returns {Object[]} Массив транзакций с указанным торговым местом.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Вычисляет и возвращает среднюю сумму транзакций.
     * @returns {number} Средняя сумма всех транзакций.
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    /**
     * Возвращает транзакции с суммой в указанном диапазоне.
     * @param {number} minAmount - Минимальная сумма.
     * @param {number} maxAmount - Максимальная сумма.
     * @returns {Object[]} Массив транзакций в заданном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => 
            transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
    }

    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @returns {number} Сумма всех дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
        return this.transactions.reduce((total, transaction) => {
            if (transaction.transaction_type === 'debit') {
                return total + transaction.transaction_amount;
            }
            return total;
        }, 0);
    }

    /**
     * Определяет месяц с наибольшим количеством транзакций.
     * @returns {string} Месяц (в формате YYYY-MM), в котором было больше всего транзакций.
     */
    findMostTransactionsMonth() {
        const monthCounts = this.transactions.reduce((acc, transaction) => {
            const monthYear = transaction.transaction_date.slice(0, 7); // YYYY-MM
            acc[monthYear] = (acc[monthYear] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(monthCounts).reduce((a, b) => monthCounts[a] > monthCounts[b] ? a : b);
    }

    /**
     * Определяет месяц с наибольшим количеством дебетовых транзакций.
     * @returns {string} Месяц (в формате YYYY-MM), в котором было больше всего дебетовых транзакций.
     */
    findMostDebitTransactionMonth() {
        const debitCounts = this.transactions.reduce((acc, transaction) => {
            if (transaction.transaction_type === 'debit') {
                const monthYear = transaction.transaction_date.slice(0, 7); // YYYY-MM
                acc[monthYear] = (acc[monthYear] || 0) + 1;
            }
            return acc;
        }, {});

        return Object.keys(debitCounts).reduce((a, b) => debitCounts[a] > debitCounts[b] ? a : b);
    }

    /**
     * Определяет, каких транзакций больше всего: дебетовых, кредитовых или если их количество равно.
     * @returns {string} 'debit', 'credit' или 'equal' в зависимости от количества транзакций.
     */
    mostTransactionTypes() {
        const counts = { debit: 0, credit: 0 };
        this.transactions.forEach(transaction => {
            if (transaction.transaction_type === 'debit') counts.debit++;
            if (transaction.transaction_type === 'credit') counts.credit++;
        });
        return counts.debit === counts.credit ? 'equal' : (counts.debit > counts.credit ? 'debit' : 'credit');
    }

    /**
     * Возвращает транзакции, проведенные до указанной даты.
     * @param {string} date - Дата в формате YYYY-MM-DD.
     * @returns {Object[]} Массив транзакций до указанной даты.
     */
    getTransactionsBeforeDate(date) {
        return this.transactions.filter(transaction => transaction.transaction_date <= date);
    }

    /**
     * Находит транзакцию по ее уникальному идентификатору.
     * @param {string} id - Идентификатор транзакции.
     * @returns {Object} Транзакция с указанным идентификатором.
     */
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id);
    }

    /**
     * Возвращает массив описаний всех транзакций.
     * @returns {string[]} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
};

// Пример использования
const analyzer = new TransactionAnalyzer(transactionsImport);
console.log(analyzer.getAllTransactions());
