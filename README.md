<img height="100" alt="Help Map" src="https://github.com/user-attachments/assets/32b936fc-1c0e-4160-9e5a-cd1c6164e0ed" />

# Help Map

## Overview

Help Map is a web application developed by Code for Norway to assist individuals in need across Norway, such as the homeless, refugees, or those facing economic hardships. The platform enables users to locate places offering free essential services like food, clothing, and shelter on an interactive map. Users can also contribute by adding and editing locations to ensure the information remains up-to-date.

This project is built with [Nuxt 4](https://nuxt.com/), uses [Mapbox](https://www.mapbox.com/) for interactive mapping, and integrates [Supabase](https://supabase.com/) for backend services and data management.

## Features

- **Interactive Map**: Visualize locations providing free services using Mapbox.
- **User Contributions**: Users can add and edit locations to keep the map current.
- **Real-time Data**: Powered by Supabase for efficient data storage and retrieval.
- **Responsive Design**: Built with Nuxt 4 and Tailwind CSS for a seamless experience across devices.
- **Composable State Management**: Shared state handled via Nuxt's `useState` API.

## Tech Stack

- **Frontend**: Nuxt 4 (Vue 3-based framework)
- **State Management**: Nuxt `useState` composables
- **Mapping**: Mapbox for interactive and dynamic maps
- **Backend**: Supabase for authentication, database, and real-time updates

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or Yarn
- A Mapbox account and access token
- A Supabase account and project setup

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/codefornorway/help-map.git
   cd help-map
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the project root and add the following:

   ```
   MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_public_key
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

### Configuring Mapbox

- Obtain a Mapbox access token from [Mapbox](https://www.mapbox.com/).
- Ensure the token is added to your `.env` file as `MAPBOX_ACCESS_TOKEN`.
- Configure Mapbox in your Nuxt project (e.g., in a plugin or component).

### Configuring Supabase

- Create a Supabase project and note the project URL and public key.
- Add these to your `.env` file as `SUPABASE_URL` and `SUPABASE_KEY`.
- Set up the necessary database tables for storing location data (schema details to be added).

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, reach out to the Code for Norway team via [GitHub Issues](https://github.com/codefornorway/help-map/issues) or contact us at sefabulak@icloud.com.

---

_Built with ❤️ by Code for Norway_

![help-map](https://github.com/user-attachments/assets/8d539bc3-9ee4-4b20-a374-f51e88e7851f)

