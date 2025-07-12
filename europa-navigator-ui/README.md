# Europa Navigator UI

A React + TypeScript + Vite project for simulating Europa robot navigation.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

   This will start the app at [http://localhost:5173](http://localhost:5173) (default Vite port).

3. **Build for production:**

   ```sh
   npm run build
   ```

4. **Preview the production build:**

   ```sh
   npm run preview
   ```

## Linting

To check code quality and lint errors:

```sh
npm run lint
```

## Notes

- The UI expects a backend running at `http://localhost:3000/simulate` for simulation requests.
- You can change the backend URL in [`src/components/SimulatorForm.tsx`](src/components/SimulatorForm.tsx) if needed.

---
Original template info below:

...