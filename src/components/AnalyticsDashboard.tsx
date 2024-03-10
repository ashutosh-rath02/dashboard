"use client";
import { Card } from "@tremor/react";
import React from "react";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
}

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
}: AnalyticsDashboardProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid w-full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4 p-6">
          <p className="text-tremor-default text-dark-tremor-content">
            Avg. visitors/day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="flex flex-col gap-4 p-6">
          <p className="text-tremor-default text-dark-tremor-content">
            Visitors today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorsToday}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
