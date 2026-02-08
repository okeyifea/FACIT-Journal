import React, { useState } from "react";
import PaperCard from "./ReusePaperCard.jsx";
import { Dashboard, Tabs, Tab, EmptyMessage } from "../../Style/StudentDashboardStyle.jsx";

const OfficerView = ({ data, onReview }) => {
  const [activeGroup, setActiveGroup] = useState("staff");

  const staffPapers = data?.staffPapers || [];
  const studentPapers = data?.studentPapers || [];

  const renderList = (list, emptyText) => {
    if (list.length === 0) {
      return <EmptyMessage>{emptyText}</EmptyMessage>;
    }
    return list.map((paper) => (
      <PaperCard key={paper.id} paper={paper} showActions onReview={onReview} />
    ));
  };

  return (
    <Dashboard>
      <Tabs>
        <Tab
          onClick={() => setActiveGroup("staff")}
          $active={activeGroup === "staff"}
        >
          Staff Papers ({staffPapers.length})
        </Tab>
        <Tab
          onClick={() => setActiveGroup("student")}
          $active={activeGroup === "student"}
        >
          Student Papers ({studentPapers.length})
        </Tab>
      </Tabs>

      {activeGroup === "staff" &&
        renderList(staffPapers, "No staff papers pending review.")}
      {activeGroup === "student" &&
        renderList(studentPapers, "No student papers pending your review.")}
    </Dashboard>
  );
};

export default OfficerView;
