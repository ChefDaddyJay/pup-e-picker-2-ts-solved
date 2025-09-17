import { ReactNode, useEffect, useState } from "react";
import { TabContext, useDogs } from "../definitions";
import { TTab, TTabKey } from "../../types";
import { CreateDogTab } from "../../Components/CreateDog/CreateDogTab";

export const TabsProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<Record<TTabKey, TTab>>(
    {} as Record<TTabKey, TTab>
  );
  const [activeTab, setActiveTab] = useState("" as TTabKey);
  const { allDogs } = useDogs();

  useEffect(() => {
    const favorited = allDogs.filter((dog) => dog.isFavorite);
    const unfavorited = allDogs.filter((dog) => !dog.isFavorite);

    setTabs({
      "": { label: null, content: allDogs },
      favorited: {
        label: `favorited ( ${favorited.length} )`,
        content: favorited,
      },
      unfavorited: {
        label: `unfavorited ( ${unfavorited.length} )`,
        content: unfavorited,
      },
      "create a dog": {
        label: "create a dog",
        content: <CreateDogTab />,
      },
    });
  }, [allDogs]);

  return (
    <TabContext.Provider value={{ tabs, activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
