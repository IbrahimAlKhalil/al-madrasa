# Al-Madrasa

After encountering several challenges with WordPress that caused difficulties for both myself and my clients, some of them expressed a desire to use CMS solutions developed with Node.js. Unfortunately, none of the Node.js options available at the time met my expectations. To address this, I took the initiative to create a project that fulfills my specific requirements for building and managing websites for clients, without relying on WordPress. This endeavor combines Directus v9, a Node.js-based headless CMS, with Next.js, a powerful server-side rendering (SSR) framework.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Architecture Overview](#architecture-overview)
- [Theme Customizer](#theme-customizer)
- [CLI](#cli)
- [License](#license)

## Introduction

Al-Madrasa is designed to provide freelancers and developers with a reliable and customizable alternative to WordPress for building websites. By leveraging the power of Directus v9 and Next.js, you can create and manage website content easily while having the flexibility to design and develop themes using Next.js.

The project follows a multitenancy architecture, allowing you to serve multiple websites from a single Node.js instance or a cluster, with isolated tenant databases for each website. The main database holds information about the tenants, such as domain, database name, and themes.

## Features

- **Headless CMS**: Directus v9 serves as the headless CMS, providing a user-friendly interface for content management.
- **Next.js Integration**: Next.js, a powerful SSR framework, enables server-side rendering and efficient client-side interactions for dynamic and performant websites.
- **Multitenancy Support**: Serve multiple websites from a single Node.js instance or cluster, with isolated tenant databases for each website.
- **PostgreSQL Database**: Utilize the robustness and scalability of PostgreSQL for storing your website data.
- **JWT Token-Based Authentication**: Tenant identification is handled through JWT tokens, allowing secure switching between tenant databases.
- **Customizable Themes**: Al-Madrasa includes a default theme named 'Al-Munir' and provides a theme customizer, similar to WordPress, allowing you to customize the appearance and functionality of your websites.
- **CLI**: Al-Madrasa includes a CLI built using the Commander package to ease development tasks, utilizing Docker internally to run and pull necessary dependencies.
- **Deployment**: Al-Madrasa can be deployed with PM2 for production environments.

## Getting Started

To get started with Al-Madrasa, follow the steps below:

### Prerequisites

Before installation, ensure you have the following prerequisites:

- Node.js (version >= 12.20.0)
- PostgreSQL (version >= 9.3)
- Docker - Only required for CLI usage

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IbrahimAlKhalil/al-madrasa.git
   cd al-madrasa
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create the `.env` file:

   - In the project's root directory, create a `.env` file based on the `.env.example` file.
   - Configure the necessary environment variables, such as database connection details, app secret, etc., following the instructions in the `.env.example` file.

4. Start the application:

   ```bash
   ./am.mjs dev
   ```

   - This script will pull the PostgreSQL Docker image if it does not already exist, create the required databases, run migrations, and launch the application.

5. Create an admin user:

   ```bash
   ./am.mjs user create-admin --email email@example.com
   ```

   - This command will create an admin user in the main database, allowing you to access the application, later you will need to do a Password Reset to claim this account.

6. Create a bot user:

   ```bash
   ./am.mjs user create-bot --email email@example.com
   ```

   - This command will create a bot user and return a token. Add the bot user token to the `.env` file using the `BOT_USER_TOKEN=` variable. The CLI requires a bot user for certain functionalities.

7. Restart the application:

   ```bash
   ./am.mjs dev
   ```
   
   - From now on just run this command to start the application.

8. Access the application:

   - Open your web browser and visit `http://127.0.0.1:8000`.
   - Or visit `http://127.0.0.1:8000/admin` for the dashboard.

## Architecture Overview

Al-Madrasa follows a three-database architecture: main, template, and tenant.

- **Main Database**: The main database stores information about tenants, such as domain, database name, themes, etc. It acts as the central control and manages the tenant databases.

- **Template Database**: The template database serves as a template for creating new tenant databases. It contains the necessary structure and configuration that each tenant database should have.

- **Tenant Databases**: Each tenant has its own isolated database that stores its specific data, including website content, settings, and other related information.

The application utilizes JWT tokens to identify tenants and determine the corresponding database to serve from. An admin user can switch between the main database and any tenant's database to manage content and configurations.

## Theme Customizer

Al-Madrasa offers a user-friendly theme customizer, similar to the WordPress Customizer, which allows you to easily personalize the appearance and functionality of your websites. This feature is accessible when you log in to your template or tenant dashboard. You can effortlessly switch between tenants by navigating to `Settings` and then selecting `Project Settings`. After switching to a new tenant, remember to enable the customizer module for the first time in the `Settings` section as well. Additionally, you can set your website's theme by going to `Content`, then `Misc`, and finally `Website`. By default, Al-Madrasa provides a theme called 'Al-Munir', but you can create your own unique theme by following these steps.

## CLI

Al-Madrasa includes a CLI tool built using the Commander package to ease development tasks. The CLI internally uses Docker to run and pull necessary dependencies. To use the CLI, execute the `am.mjs -h` to see what you can do with it.

## License

Al-Madrasa is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html). See the [LICENSE](LICENSE) file for more details.

---

Thank you! I hope it serves as a powerful solution for your website development needs. If you have any questions or need further assistance, please don't hesitate to reach out to me via [hm.ibrahimalkhalil@gmail.com](mailto:hm.ibrahimalkhalil@gmail.com) or create an issue on the repository. Happy coding!