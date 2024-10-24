import { Contract, OptionChainData } from '../types';

const API_BASE_URL = 'https://prices.algotest.xyz';

export const fetchContracts = async (): Promise<Contract[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contracts`);
    if (!response.ok) {
      throw new Error('Failed to fetch contracts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return [];
  }
};

export const fetchOptionChain = async (): Promise<OptionChainData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/option-chain-with-ltp?underlying=BANKNIFTY`);
    if (!response.ok) {
      throw new Error('Failed to fetch option chain');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching option chain:', error);
    return { data: [] };
  }
};