import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import ActionsGrid from "../components/dashboard/ActionsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import SweetsSection from "../components/sweets/SweetsSection";

export default function Dashboard() {
  return (
       <DashboardLayout>
      <DashboardHeader />
      <StatsGrid />
    
      <SweetsSection/>
    
    </DashboardLayout>
  );
}
