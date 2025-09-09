import { ReactNode, useState } from "react";
import { TabContext } from "../definitions";

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
