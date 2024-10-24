import React, { useState, useEffect } from 'react';
import OptionChain from './components/OptionChain';
import ExpiryFilter from './components/ExpiryFilter';
import { fetchContracts, fetchOptionChain } from './services/api';
import useWebSocket from './hooks/useWebSocket';
import { Contract, OptionChainData } from './types';
import './styles/global.css';

const App: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [optionChainData, setOptionChainData] = useState<OptionChainData | null>(null);
  const [selectedExpiry, setSelectedExpiry] = useState<string>('');
  const [expiries, setExpiries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [spotPrice, setSpotPrice] = useState<number | null>(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const [contractsData, optionChainResponse] = await Promise.all([
          fetchContracts(),
          fetchOptionChain(),
        ]);

        setContracts(contractsData);
        setOptionChainData(optionChainResponse);
        
        if (optionChainResponse.data[0]) {
          setSpotPrice(optionChainResponse.data[0].CE.underlyingValue);
        }

        const expiryList = [...new Set(contractsData
          .filter(contract => contract.instrumenttype !== 'FUTIDX')
          .map(contract => contract.expiry))]
          .sort();
        
        setExpiries(expiryList);
        setSelectedExpiry(expiryList[0]);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const { data: wsData } = useWebSocket(selectedExpiry);

  useEffect(() => {
    if (wsData && optionChainData) {
      setOptionChainData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          data: prevData.data.map(row => {
            const callUpdate = wsData.find(item => item.token === row.CE.token);
            const putUpdate = wsData.find(item => item.token === row.PE.token);
            return {
              ...row,
              CE: callUpdate ? { ...row.CE, lastPrice: callUpdate.price } : row.CE,
              PE: putUpdate ? { ...row.PE, lastPrice: putUpdate.price } : row.PE,
            };
          }),
        };
      });
    }
  }, [wsData]);

  if (loading) {
    return <div className="loading">Loading option chain data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>BANKNIFTY Option Chain</h1>
        {spotPrice && <p>Spot Price: ₹{spotPrice.toLocaleString('en-IN')}</p>}
      </header>
      
      <ExpiryFilter
        expiries={expiries}
        selectedExpiry={selectedExpiry}
        onExpiryChange={setSelectedExpiry}
        spotPrice={spotPrice}
      />
      
      {optionChainData && (
        <OptionChain 
          data={optionChainData.data} 
          contracts={contracts}
          selectedExpiry={selectedExpiry}
        />
      )}
    </div>
  );
};

export default App;