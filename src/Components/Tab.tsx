import { useTabs } from "../Providers/definitions";
import { TTabKey } from "../types";

export function Tab({
  tabKey,
  label,
  active,
}: {
  tabKey: TTabKey;
  label: string;
  active: boolean;
}) {
  const { setActiveTab } = useTabs();

  return (
    <div
      className={`selector ${active ? "active" : ""}`}
      onClick={() => setActiveTab(active ? "" : tabKey)}
    >
      {label}
    </div>
  );
}
