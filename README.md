# Mindera Test Project

This is a Next.js project with Shopify Storefront API integration and HeroUI components.

### Clone the Repository

```sh
git clone <your-repo-url>
cd mindera-test
```

### Install Dependencies

```sh
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and add necessary environment variables:

```sh
NEXT_PUBLIC_SHOPIFY_STORE_URL=<your-store-url>
NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN=<your-access-token>
```

### Generate GraphQL Types (if using GraphQL)

```sh
npm run graph-gen
```

This will generate TypeScript types based on your GraphQL schema.

### Run the Development Server

```sh
npm run dev
```

The app will be available at `http://localhost:3000`

## Running Lint Checks

To check for linting issues, run:

```sh
npm run lint
```

## Build and Start for Production

```sh
npm run build
npm run start
```