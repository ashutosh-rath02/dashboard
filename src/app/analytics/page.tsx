import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import { analytics } from "@/utils/analytics";
import React from "react";

const Page = async () => {
  const TRACKING_DAYS = 7;

  const pageview = await analytics.retrieveDays("pageview", 2);

  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative w-full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard avgVisitorsPerDay="" />
      </div>
    </div>
  );
};

export default Page;
