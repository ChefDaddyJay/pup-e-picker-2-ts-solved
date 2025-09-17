import { ReactNode } from "react";
import { useTabs } from "../Providers/definitions";
import { Tab } from "./Tab";
import { TTabKey } from "../types";

export const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const { tabs, activeTab } = useTabs();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {Object.entries(tabs).map(
            ([key, tab]) =>
              tab.label && (
                <Tab
                  key={key}
                  tabKey={key as TTabKey}
                  label={tab.label}
                  active={activeTab === key}
                />
              )
          )}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
