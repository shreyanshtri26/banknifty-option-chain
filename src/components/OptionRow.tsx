import React from 'react';
import { OptionChainRow, Contract } from '../types';
import styles from '../styles/OptionChain.module.css';

interface OptionRowProps {
  row: OptionChainRow;
  callContract: Contract | undefined;
  putContract: Contract | undefined;
}

const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const OptionRow: React.FC<OptionRowProps> = ({ row }) => {
  const { CE, PE, strikePrice } = row;
  
  return (
    <tr className={styles.row}>
      {/* Call Option Data */}
      <td className={styles.callSection}>{formatNumber(CE.openInterest)}</td>
      <td className={`${styles.callSection} ${CE.changeinOpenInterest >= 0 ? styles.positive : styles.negative}`}>
        {formatNumber(CE.changeinOpenInterest)}
      </td>
      <td className={styles.callSection}>{formatNumber(CE.totalTradedVolume)}</td>
      <td className={styles.callSection}>{formatNumber(CE.impliedVolatility, 1)}</td>
      <td className={`${styles.callSection} ${styles.lastPrice}`}>{formatNumber(CE.lastPrice, 1)}</td>
      <td className={`${styles.callSection} ${CE.change >= 0 ? styles.positive : styles.negative}`}>
        {formatNumber(CE.change, 1)}
      </td>

      {/* Strike Price */}
      <td className={styles.strikePrice}>{formatNumber(strikePrice, 1)}</td>

      {/* Put Option Data */}
      <td className={`${styles.putSection} ${PE.change >= 0 ? styles.positive : styles.negative}`}>
        {formatNumber(PE.change, 1)}
      </td>
      <td className={`${styles.putSection} ${styles.lastPrice}`}>{formatNumber(PE.lastPrice, 1)}</td>
      <td className={styles.putSection}>{formatNumber(PE.impliedVolatility, 1)}</td>
      <td className={styles.putSection}>{formatNumber(PE.totalTradedVolume)}</td>
      <td className={`${styles.putSection} ${PE.changeinOpenInterest >= 0 ? styles.positive : styles.negative}`}>
        {formatNumber(PE.changeinOpenInterest)}
      </td>
      <td className={styles.putSection}>{formatNumber(PE.openInterest)}</td>
    </tr>
  );
};

export default React.memo(OptionRow);