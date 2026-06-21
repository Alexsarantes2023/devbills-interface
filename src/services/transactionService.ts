import type { TransactionFilter, Transaction, TransactionSummary, MonthlyItem, CreateTransactionDTO } from '../types/transactions';
import { api } from './api';

export const getTransactions = async (
    filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>("/transactions", {
        params: filter,
    });

    return response.data;
};

export const getTransactionsSummary = async (month: number, year: number): Promise<TransactionSummary> => {
    const response = await api.get<TransactionSummary>("/transactions/summary", {
        params: { month, year },
    });
    return response.data;
};

export const getTransactionsMontly = async (
    month: number, //month é declarado, mas seu valor nunca é lido.
    year: number, // year é declarado, mas seu valor nunca é lido.
    months?: number, // months é declarado, mas seu valor nunca é lido.
): Promise<{ history:MonthlyItem[] }> => { 
    const response = await api.get("/transactions/historical", {
        params: {
            month,
            year,
            months,
        },
    });

    return response.data;
};

export const deleteTransactions = async (id: string): Promise<void> => {
    await api.delete(`/transactions/${id}`);
};

export const createTransaction = async (
    transactionData: CreateTransactionDTO,
): Promise<Transaction> => {
    const response = await api.post<Transaction>('/transactions', transactionData);

    return response.data;
};