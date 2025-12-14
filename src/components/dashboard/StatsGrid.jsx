import { useEffect, useState } from "react";
import { FiBox, FiShoppingCart, FiAlertCircle } from "react-icons/fi";
import StatCard from "./StatCard";
import { getSweetDashboardStats } from "../../services/dashboardService";
import { useAuth } from "../../hooks/useAuth";

export default function StatsGrid() {
  const { role } = useAuth();          
  const [stats, setStats] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await getSweetDashboardStats();
        setStats(res.data.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [role]);

  /* ===== SAFE RETURNS AFTER HOOKS ===== */

  if (role !== "ROLE_ADMIN") {
    return null;
  }

  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard
        title="Total Sweets"
        value={stats.totalSweets}
        icon={FiBox}
        color="bg-purple-600"
      />

      <StatCard
        title="Available Stock"
        value={stats.totalStock}
        icon={FiShoppingCart}
        color="bg-green-600"
      />

      <StatCard
        title="Low Stock Items"
        value={stats.lowStockItems}
        icon={FiAlertCircle}
        color="bg-yellow-500"
      />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="bg-white p-6 shadow-sm animate-pulse rounded-lg">
      <div className="h-4 bg-gray-300 w-24 mb-3"></div>
      <div className="h-8 bg-gray-300 w-16"></div>
    </div>
  );
}
