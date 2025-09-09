import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { TabsProvider } from "./Providers/Components/TabProvider";
import { DogsProvider } from "./Providers/Components/DogsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <DogsProvider>
      <TabsProvider>
        <App />
      </TabsProvider>
    </DogsProvider>
  </React.StrictMode>
);
