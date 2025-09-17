import { CreateDogForm } from "./Components/CreateDog/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { InputStateProvider } from "./Providers/Components/InputStateProvider";
import { useTabs } from "./Providers/definitions";

export function App() {
  const { activeTab } = useTabs();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs />
        {/* InputStateProvider allows the user's input to 
            persist across tab changes. */}
        <InputStateProvider>
          {activeTab === "create a dog" && <CreateDogForm />}
        </InputStateProvider>
      </Section>
    </div>
  );
}
