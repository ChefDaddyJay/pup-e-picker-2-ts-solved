import { ReactNode } from "react";
import { useDogs, useTabs } from "../Providers/definitions";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, setActiveTab } = useTabs();
  const { allDogs: dogs } = useDogs();
  const favorited = dogs.reduce(
    (count, dog) => (dog.isFavorite ? count + 1 : count),
    0
  );
  const unfavorited = dogs.length - favorited;

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          <div
            className={`selector ${activeTab === 1 ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === 1 ? 0 : 1)}
          >
            favorited ( {favorited} )
          </div>

          <div
            className={`selector ${activeTab === 2 ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === 2 ? 0 : 2)}
          >
            unfavorited ( {unfavorited} )
          </div>
          <div
            className={`selector ${activeTab === 3 ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === 3 ? 0 : 3)}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
