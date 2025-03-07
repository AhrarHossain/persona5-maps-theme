# Persona5 Maps Theme

A custom Google Maps implementation inspired by the Persona 5 Royal aesthetic. This project features a uniquely styled map centered on Melbourne, Victoria, with custom styling and markers. It demonstrates best practices in handling sensitive API keys using environment variables and modern tooling with Vite.

## Overview

This project uses the Google Maps JavaScript API to display a custom-themed map. The map incorporates:

- **Persona 5 Royal–inspired styling:** Bold colors and high-contrast elements to capture the game's unique visual identity.
- **Custom marker:** A custom PNG marker is used to indicate locations on the map.
- **Environment variable configuration:** The Google Maps API key is securely managed via an `.env` file and injected at build time, ensuring that sensitive information is not exposed in the repository.

## Prerequisites

- [Node.js]
- [npm]
- A Google Cloud Platform account with the **Google Maps JavaScript API** enabled.
- A valid **Google Maps API key**.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/persona5-maps-theme.git
   cd persona5-maps-theme/vanilla

2. **Install dependencies**
    
    ```bash
    npm install

## Configuration

**Create .env File:**

At the root of the vanilla folder, create a file named .env and add your Google Maps API key as follows:

    VITE_GOOGLE_MAPS_API_KEY=YOUR_REAL_API_KEY_HERE

*Important: The .env file is included in .gitignore to prevent your API key from being committed to the repository. For local testing, each user must create their own .env file with their own API key.*

## Running the Project Locally

1. **Start the development server:**

    ```bash
    npm run dev
    ```

    *Note: Please make sure to run the project in the "vanilla" directory*
            (for windows): use the command 'cd vanilla' if you're not in the correct directory

2. **Open your browser:**

    Visit the URL provided by Vite to see the map in action.

## Technologies Used

- Google Maps JavaScript API.

- Vite - A modern build tool for frontend development.

- HTML, CSS, and JavaScript.




