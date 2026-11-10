# 01_Gateway

A full-stack web application featuring user authentication and account management with a modern, responsive user interface.

## Features

- User Registration (Signup)
- User Login
- Password Reset
- Secure Password Hashing
- Form Validation
- API Integration
- Responsive User Interface
- User Authentication and Session Management

## Tech Stack

- **Frontend:** Next.js, React.js
- **Styling:** CSS / Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Authentication:** JWT / bcrypt (if configured in your backend)
- **Backend:** Node.js / Express.js (if applicable)
- **Database:** Add your database here

## Project Structure

```text
01_gateway/
├── app/
├── components/
├── public/
├── package.json
├── README.md
└── ...
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/biman-nandi/gateway.git
```

### 2. Navigate to the Project

```bash
cd 01_gateway
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the required environment variables.

```env
# Add your environment variables here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm run start` | Start production server |
| `npm run lint` | Run lint checks (if configured) |

## Contributing

Contributions, issues, and feature requests are welcome.

## License

This project is available for educational and development purposes.