import { useAuth } from "../../hooks/useAuth";
import UserSweetsGrid from "./UserSweetsGrid";
import AdminSweetsTable from "./AdminSweetsTable";

export default function SweetsSection() {
  const { role } = useAuth();

  const isUser = role === "ROLE_USER";
  const isAdmin = role === "ROLE_ADMIN";

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {isUser ? "Purchase Sweets" : "Sweets"}
      </h2>

      {isAdmin ? <AdminSweetsTable /> : <UserSweetsGrid />}
    </div>
  );
}
