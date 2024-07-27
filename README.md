![sattrack-header](./sattrack-readme-header.png)
# sattrack-next

## About the project
Monitor live flight data for multiple satellites and man-made objects in earth orbit via TLE propagation. TLE data supplied by N2YO. Calculations made using satellite.js (https://github.com/shashwatak/satellite-js). Build with Next.js and shadcn.

## Getting started
### Prerequisities
- Node.js 18.0.0 or better
- npm 8.0.0 or better

### Enviroments variables
Before running the application a few enviroment variables are required. These are described in ```.env.template```. After you cloned the project make sure to create a new ```.env``` and add them in there.

### Installation
Clone the project:
```
git clone https://github.com/noahshotz/sattrack-next.git
```

Navigate into the directory:
```
cd sattrack-next
```

Install dependencies:
```
npm install
```

Run locally:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
