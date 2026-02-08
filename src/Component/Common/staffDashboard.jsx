import React, { useState } from "react";
import PaperCard from "./ReusePaperCard.jsx";
import { Tab } from "../../Style/StudentDashboardStyle.jsx";

const StaffView = ({ data, onReview, onResubmit, onDelete }) => {
  const [activeSection, setActiveSection] = useState("staff");

  const pendingStaffReview = data?.pendingStaffReview || [];
  const myPapers = data?.myPapers || [];

  const awaitingOfficerReview = myPapers.filter(
    (paper) => paper.status === "pending"
  );
  const approvedPapers = myPapers.filter(
    (paper) => paper.status === "approved"
  );
  const rejectedPapers = myPapers.filter(
    (paper) => paper.status === "rejected" || paper.status === "rejected_final"
  );

  const sections = [
    {
      key: "staff",
      label: "Awaiting Staff Review",
      papers: pendingStaffReview,
      showActions: true
    },
    {
      key: "officer",
      label: "Awaiting Officer Review",
      papers: awaitingOfficerReview,
      allowDelete: true
    },
    {
      key: "approved",
      label: "Approved",
      papers: approvedPapers
    },
    {
      key: "rejected",
      label: "Rejected",
      papers: rejectedPapers,
      allowDelete: true
    }
  ];

  return (
    <>
      {/* Section Tabs */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          borderBottom: "1px solid #ddd",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        {sections.map(section => (
          <Tab
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            $active={activeSection === section.key}
          >
            {section.label} ({section.papers.length})
          </Tab>
        ))}
      </div>

      {/* Section Content */}
      {sections.map(
        section =>
          activeSection === section.key && (
            <div key={section.key}>
              {section.papers.length === 0 ? (
                <p>No papers found.</p>
              ) : (
                section.papers.map(paper => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    showActions={section.showActions}
                    onReview={onReview}
                    onResubmit={onResubmit}
                    allowDelete={section.allowDelete}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          )
      )}
    </>
  );
};

export default StaffView;
