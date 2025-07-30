# Platformatory Assignment

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (for local development)
- [npm](https://www.npmjs.com/get-npm) (for local development)

## Getting Started

### Running with Docker (Recommended)

This is the recommended way to run the project, as it sets up all the necessary services, including the application, a Temporal worker, a Temporal server, and a PostgreSQL database.

1.  **Build and start the services:**

    ```bash
    docker-compose up --build
    ```

2.  **Access the application:**

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

3.  **Access the Temporal UI:**

    Open [http://localhost:8080](http://localhost:8080) to view the Temporal UI.

### Local Development (Without Docker)

This method is suitable for making quick frontend changes. It only runs the Next.js development server. You will need to have a running instance of Temporal and PostgreSQL for all features to work.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  **Access the application:**

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https.vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
