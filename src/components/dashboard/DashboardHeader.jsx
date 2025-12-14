export default function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>
      <p className="text-gray-600">
        Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
      </p>
    </div>
  );
}
