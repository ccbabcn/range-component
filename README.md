# Range Component

This project contains a custom range component developed using Next.js and TypeScript.

> https://range-component.vercel.app/

```bash
#For running locally
npm install
npm run dev

#For testing
npm run test
npm run test:coverage #for coverage

```

## Exercise Overview

The component `<Range />` has two main usage modes:

### Normal Range

`/exercise1`

- User can drag the handlers freely within the max and min limits.
- User can type max and min values.
- Mix and max cannot cross.
- Mix and max values are fetched from https://www.mockable.io/

### Fixed Values Range

`/exercise2`

- User can drag the handlers only on fixed values from range.
- User cannot type max and min values.
- Mix and max cannot cross.
- Range of values are fetched from https://www.mockable.io/
