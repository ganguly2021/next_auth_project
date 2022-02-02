import React from "react";
import Sidebar from "./Sidebar";

function DashboardView({ rightContent }) {
  return (
    <main>
      <Sidebar />
      {rightContent}
    </main>
  );
}

export default DashboardView;
