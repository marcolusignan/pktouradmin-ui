# 🃏 Poker Tournament Admin UI

A lightweight Angular application to manage players in a poker tournament. The app allows you to create players, update their scores, view the leaderboard ranked by score, and reset the tournament entirely.

## 🚀 Features

* ✅ **Create Player**: Add a new player by name.
* 🔄 **Update Score**: Modify a player's score directly from the table.
* 📊 **Ranked List**: View all players ranked by score in real-time.
* 🗑️ **Reset Tournament**: Clear all players and scores with a single click.
* 📦 **Toast Notifications**: Get instant feedback on actions (success or error).

## 🛠️ Tech Stack

* **Frontend**: [Angular 20](https://angular.io/)
* **Styling**: CSS (no UI library dependency)
* **Forms**: ReactiveFormsModule + FormsModule
* **State**: Local state management using RxJS (where needed)
* **Backend**: Compatible with a Kotlin Ktor REST API (not included)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/marcolusignan/pktouradmin-ui
cd poker-tournament-admin-ui

# Install dependencies
npm install

# Start the development server
ng serve
```

Navigate to: `http://localhost:4200`

## ⚙️ Environment Setup

Create a file `src/environments/environment.ts` with the following:

```ts
export const environment = {
  production: false,
  API_URL: 'http://localhost:8080', // or your backend URL
  API_LOGIN: 'admin',
  API_PASSWORD: 'secret'
};
```

⚠️ Never expose real credentials in production environments.

## 🧪 Available Commands

```bash
# Run the app locally
./start.sh

# Run the app in dev server with Docker
./start.sh --docker-dev

# Run the app in dev server with Docker
./start.sh --docker-prod

# Stop docker app
./stop.sh
```
