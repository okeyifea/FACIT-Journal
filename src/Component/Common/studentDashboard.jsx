import React, { useState } from "react";
import PaperCard from "./ReusePaperCard.jsx";
import {
  Dashboard,
  Tabs,
  Tab,
  EmptyMessage
} from "../../Style/StudentDashboardStyle.jsx";

const StudentView = ({ papers, onDelete, onResubmit }) => {
  const [activeGroup, setActiveGroup] = useState("pendingStaff");

  if (!Array.isArray(papers)) return <EmptyMessage>No papers found.</EmptyMessage>;

  const groups = {
    pendingStaff: [],
    pendingOfficer: [],
    approved: [],
    rejected: []
  };

  papers.forEach((paper) => {
    const reviews = paper.reviews || [];

    const staffApproved = reviews.some(
      (r) => r.role === "staff" && r.decision === "approved"
    );
    const officerApproved = reviews.some(
      (r) => r.role === "officer" && r.decision === "approved"
    );
    const staffRejected = reviews.some(
      (r) => r.role === "staff" && r.decision === "rejected"
    );
    const officerRejected = reviews.some(
      (r) => r.role === "officer" && r.decision === "rejected"
    );

    if (paper.status === "approved" || officerApproved) {
      groups.approved.push(paper);
    } else if (
      paper.status === "rejected_final" ||
      paper.status === "rejected"
    ) {
      groups.rejected.push(paper);
    } else if (staffRejected || officerRejected || staffApproved) {
      groups.pendingOfficer.push(paper);
    } else {
      groups.pendingStaff.push(paper);
    }
  });

  const renderPapers = (list) => {
    if (list.length === 0) {
      return <EmptyMessage>No papers in this section.</EmptyMessage>;
    }

    return list.map((paper) => (
      <PaperCard
        key={paper.id}
        paper={paper}
        allowDelete
        onDelete={onDelete}
        onResubmit={onResubmit}
      />
    ));
  };

  return (
    <Dashboard>
      <Tabs>
        <Tab
          onClick={() => setActiveGroup("pendingStaff")}
          $active={activeGroup === "pendingStaff"}
        >
          Under Review
        </Tab>

        <Tab
          onClick={() => setActiveGroup("pendingOfficer")}
          $active={activeGroup === "pendingOfficer"}
        >
          Awaiting Officer Approval
        </Tab>

        <Tab onClick={() => setActiveGroup("approved")} $active={activeGroup === "approved"}>
          Review Completed
        </Tab>

        <Tab onClick={() => setActiveGroup("rejected")} $active={activeGroup === "rejected"}>
          Rejected Submissions
        </Tab>
      </Tabs>

      {/* Active group content */}
      {activeGroup === "pendingStaff" && renderPapers(groups.pendingStaff)}
      {activeGroup === "pendingOfficer" && renderPapers(groups.pendingOfficer)}
      {activeGroup === "approved" && renderPapers(groups.approved)}
      {activeGroup === "rejected" && renderPapers(groups.rejected)}
    </Dashboard>
  );
};

export default StudentView;
