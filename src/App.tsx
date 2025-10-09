import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { HeroUIProvider } from "@heroui/react";

import "@/styles/global.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  );
}

export default App;
