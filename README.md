# BANKNIFTY Option Chain Viewer

A real-time option chain viewer for BANKNIFTY built with React and TypeScript. This application provides live updates of option prices, volumes, and other metrics using WebSocket connections.


## 🚀 Features

- Real-time option chain data updates via WebSocket
- Multiple expiry date filters
- Clean and responsive UI
- Detailed option metrics including:
  - Call/Put prices
  - Open Interest
  - Trading volumes
  - Strike prices
- Type-safe implementation using TypeScript
- Efficient state management and rendering
- Error handling and loading states

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenVPN Client (for API access)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/shreyanshtri26/banknifty-option-chain.git
cd banknifty-option-chain
```

2. Install dependencies:
```bash
npm install
```

3. Set up VPN connection:
- Download OpenVPN Client from: https://openvpn.net/client/
- Import the provided VPN profile into your OpenVPN client
- Connect to the VPN

## 🚀 Running the Application

1. Start the development server:
```bash
npm start
```

2. Build for production:
```bash
npm run build
```

3. Run tests:
```bash
npm test
```

## 🏗️ Project Structure

```
option-chain/
├── src/
│   ├── components/
│   │   ├── OptionChain.tsx    # Main option chain table component
│   │   ├── OptionRow.tsx      # Individual option row component
│   │   └── ExpiryFilter.tsx   # Expiry date filter component
│   ├── hooks/
│   │   └── useWebSocket.ts    # WebSocket connection management
│   ├── services/
│   │   └── api.ts            # API integration functions
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Main application component
│   └── index.tsx             # Application entry point
├── public/
└── package.json
```

## 🔌 API Integration

The application integrates with the following endpoints:

1. Contracts API:
```
GET https://prices.algotest.xyz/contracts
```

2. Option Chain API:
```
GET https://prices.algotest.xyz/option-chain-with-ltp?underlying=BANKNIFTY
```

3. WebSocket Updates:
```
WSS https://prices.algotest.xyz/mock/updates
```

## 🔄 WebSocket Subscription Format

```javascript
{
  msg: {
    Type: 'subscribe',
    datatypes: 'ltp',
    underlyings: [
      {
        underlying: 'BANKNIFTY',
        cash: true,
        options: [expiry],
      },
    ],
  },
}
```

## 🎨 Styling

The project uses CSS modules for styling. Main style files:
- `src/styles/OptionChain.module.css`
- `src/styles/ExpiryFilter.module.css`

## 🧪 Testing

The project includes unit tests and integration tests using Jest and React Testing Library. Run tests with:

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📱 Responsive Design

The application is fully responsive and works well on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔧 Performance Optimizations

- React.memo for option rows to prevent unnecessary re-renders
- Debounced WebSocket updates
- Efficient state management using React hooks
- Virtualized list for large option chains

## 🚨 Error Handling

The application handles various error scenarios:
- API connection failures
- WebSocket disconnections
- Data validation errors
- Network timeout errors

## 📈 Future Improvements

- Add more technical indicators
- Implement Greeks calculations
- Add charting capabilities
- Include historical data analysis
- Add export functionality
- Implement user preferences storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
