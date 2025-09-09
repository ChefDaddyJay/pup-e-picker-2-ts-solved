import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { useTabs } from "./Providers/definitions";

export function App() {
  const { activeTab } = useTabs();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs />
        {activeTab === 3 && <CreateDogForm />}
      </Section>
    </div>
  );
}
