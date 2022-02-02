import React from "react";
import Sidebar from "./Sidebar";

function DashboardView({ rightContent }) {
  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-md-3 col-lg-2 d-md-block sidebar collapse">
          <Sidebar />
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {rightContent}
        </main>
      </div>
    </div>
  );
}

export default DashboardView;
