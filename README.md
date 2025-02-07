### Set Up Environment Variables

Create a `.env` file in the root directory and add necessary environment variables:

```sh
NEXT_PUBLIC_SHOPIFY_STORE_URL=<your-store-domain> e.g: mindera-test-store
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