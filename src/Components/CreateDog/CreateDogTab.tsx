import { useTabs } from "../../Providers/definitions";

export function CreateDogTab() {
  const { activeTab, setActiveTab } = useTabs();

  return (
    <div
      className={`selector ${activeTab === "create a dog" ? "active" : ""}`}
      onClick={() =>
        setActiveTab(activeTab === "create a dog" ? "" : "create a dog")
      }
    >
      create dog
    </div>
  );
}
