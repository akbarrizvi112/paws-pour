# 🐾 Paws & Pour

**Modern Pet & Treat Management Dashboard**

Paws & Pour is a sleek, responsive, and feature-rich admin dashboard designed for efficient management of pet profiles, treat inventory, and safety monitoring. Built with modern web technologies, it provides a premium user experience for pet care professionals and pet parents alike.

---

## 🚀 Key Features

- **📊 Dynamic Dashboard**: Real-time overview of pet activities, safety logs, and treat distributions using interactive charts.
- **🐶 Pet Profiles**: Comprehensive management of pet information, health status, and care requirements.
- **🍖 Treat Database**: Inventory tracking for treats, including dietary information and stock levels.
- **⚙️ Rule Engine**: Configurable automation rules for scheduled pet care and safety alerts.
- **🛡️ Safety Logs**: Detailed audit trail of all safety-related events and system actions.
- **💳 Subscription Management**: Track and manage membership plans and billing cycles.
- **🔐 Secure Authentication**: JWT-based login system for authorized access.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### Production Build

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist/` folder.


---

## 📂 Project Structure

```text
src/
├── api/          # Axios configuration and API instances
├── components/   # Reusable UI components (UI, Layout, Dashboard, etc.)
├── data/         # Mock data and constants
├── hooks/        # Custom React hooks
├── pages/        # Main application pages (Dashboard, Pets, etc.)
├── services/     # Business logic and API service layers
└── utils/        # Helper functions
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.
