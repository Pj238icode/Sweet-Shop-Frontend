import { FiPlusCircle, FiBox } from "react-icons/fi";
import ActionCard from "./ActionCard";

export default function ActionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <ActionCard
        title="Add New Sweet"
        description="Add a new sweet to inventory"
        icon={FiPlusCircle}
        buttonText="Add Sweet"
      />
      <ActionCard
        title="Manage Inventory"
        description="View and update stock"
        icon={FiBox}
        buttonText="View Inventory"
      />
    </div>
  );
}
