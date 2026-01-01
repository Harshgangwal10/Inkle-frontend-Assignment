# Customer Tax Requests Management

A modern React application for managing customer tax requests, built with Vite, React 19, and Tailwind CSS. This project demonstrates real-world UI/UX implementation using @tanstack/react-table for advanced table functionality.

## Features

- **Data Table**: Displays customer tax requests with columns for Entity (name), Gender, Request Date, Country, and Actions
- **Country Filtering**: Filter table data by country using a dropdown populated from an external API
- **Pagination**: Navigate through large datasets with built-in pagination (10 items per page)
- **Edit Functionality**: Click the edit icon to open a modal for updating customer name and country
- **Country Dropdown**: Dynamic country selection in the edit modal, sourced from an API
- **API Integration**: Fetches data from MockAPI and supports PUT requests for updates
- **Responsive Design**: Clean, pixel-perfect UI with hover effects and loading states
- **Error Handling**: Graceful error states for API failures and empty data scenarios

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Table Library**: @tanstack/react-table
- **HTTP Client**: Axios
- **Icons**: Lucide React

## APIs Used

- **Taxes API**: `https://685013d7e7c42cfd17974a33.mockapi.io/taxes`

  - GET: Fetch all tax requests
  - PUT: Update a specific tax request by ID

- **Countries API**: `https://685013d7e7c42cfd17974a33.mockapi.io/countries`
  - GET: Fetch list of countries for dropdowns

## Getting Started

### Prerequisites

- Node.js 
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd inkle-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production

## Project Structure

```
inkle-frontend/
├── public/
├── src/
│   ├── api/
│   │   ├── countries.js    # Countries API functions
│   │   └── tax.js          # Taxes API functions
│   ├── components/
│   │   ├── CountryFilter.jsx   # Country filter dropdown
│   │   ├── EditModal.jsx       # Edit modal component
│   │   └── Table.jsx           # Main table component
│   ├── pages/
│   │   └── Home.jsx            # Main page component
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
├── package.json
├── vite.config.js
└── README.md
```

## Key Components

### Table Component

- Uses @tanstack/react-table for advanced table features
- Implements column filtering, pagination, and custom cell rendering
- Handles loading and empty states

### Edit Modal

- Modal dialog for editing customer information
- Form validation and API integration for updates
- Country dropdown populated from external API

### Country Filter

- Dropdown component for filtering table by country
- Integrates with table's filtering system



