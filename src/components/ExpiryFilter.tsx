import React from 'react';

interface ExpiryFilterProps {
  expiries: string[];
  selectedExpiry: string;
  onExpiryChange: (expiry: string) => void;
}

const ExpiryFilter: React.FC<ExpiryFilterProps> = ({ expiries, selectedExpiry, onExpiryChange }) => {
  return (
    <div className="expiry-filter">
      <label htmlFor="expiry-select">Select Expiry:</label>
      <select
        id="expiry-select"
        value={selectedExpiry}
        onChange={(e) => onExpiryChange(e.target.value)}
      >
        {expiries.map((expiry) => (
          <option key={expiry} value={expiry}>
            {expiry}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpiryFilter;