import React, { useMemo, useState } from "react";
import { API_URL } from "../../../server/API/Auth.js";
import {
  Card,
  Title,
  Meta,
  Status,
  Review,
  Rejection,
  Link,
  Actions,
  Textarea,
  ErrorText,
  ButtonRow,
  Button,
  ResubmitRow,
  FileInput,
  DeleteRow,
  DeleteButton
} from "../../Style/ReusePaperCardStyle.jsx";

import AprovalIcon from "./Icons/approval.svg";
import PendingIcon from "./Icons/pending.svg";
import RejectIcon from "./Icons/Rejection.png";

const PaperCard = ({
  paper,
  showActions,
  onReview,
  allowDelete,
  onDelete,
  onResubmit
}) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [resubmitFile, setResubmitFile] = useState(null);

  const rejectedReview = useMemo(() => {
    return paper.reviews?.find((r) => r.decision === "rejected") || null;
  }, [paper.reviews]);

  const hasReviews = (paper.reviews || []).length > 0;
  const staffRejected = (paper.reviews || []).some(
    (r) => r.role === "staff" && r.decision === "rejected"
  );
  const officerRejected = (paper.reviews || []).some(
    (r) => r.role === "officer" && r.decision === "rejected"
  );
  const canDelete =
    allowDelete &&
    ((paper.status === "pending" && !hasReviews) ||
      staffRejected ||
      (paper.author_role === "staff" &&
        officerRejected &&
        (paper.status === "rejected" || paper.status === "rejected_final")) ||
      paper.status === "Closed");
  const staffApproved = (paper.reviews || []).some(
    (r) => r.role === "staff" && r.decision === "approved"
  );
  const officerApproved = (paper.reviews || []).some(
    (r) => r.role === "officer" && r.decision === "approved"
  );

  const iconStyle = {
  width: "20px",
  height: "20px",
  marginLeft: "6px",
  verticalAlign: "middle"
};

  const staffReviewLabel = staffRejected
    ? <img src={RejectIcon} alt="Rejection" style={iconStyle}/>
    : staffApproved
    ? <img src={AprovalIcon} alt="Approved" style={iconStyle}/>
    : <img src={PendingIcon} alt="Pending" style={iconStyle}/>;
  const officerReviewLabel = officerRejected
    ? <img src={RejectIcon} alt="Rejection" style={iconStyle}/>
    : officerApproved
    ? <img src={AprovalIcon} alt="Approved" style={iconStyle}/>
    : <img src={PendingIcon} alt="Pending" style={iconStyle}/>;

  const handleApprove = () => {
    setError("");
    onReview?.(paper.id, "approved");
  };

  const handleReject = () => {
    if (!comment.trim()) {
      setError("Comment is required for rejection.");
      return;
    }
    setError("");
    onReview?.(paper.id, "rejected", comment.trim());
    setComment("");
  };

  return (
    <Card>
      <Title>{paper.title}</Title>
      <Meta>
        <Status>Status: {paper.status}</Status>
        {paper.author_role !== "staff" && (
          <Review>
            <strong>Staff Review: </strong>{staffReviewLabel}
          </Review>
        )}
        <Review>
          <strong>Officer Review: </strong> {officerReviewLabel}
        </Review>
      </Meta>

      {rejectedReview && (
        <Rejection>
          <strong style={{color: "white"}}>Rejection Reason  :  </strong> {rejectedReview.comment || "No reason provided."}
        </Rejection>
      )}

      {paper.pdf_path && (
        <div>
          <Link
            href={`${API_URL}/${paper.pdf_path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Document
          </Link>
        </div>
      )}

      {showActions && (
        <Actions>
          <div>
            <Textarea
              rows={3}
              placeholder="Comment (required for rejection)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {error && <ErrorText>{error}</ErrorText>}
          </div>
          <ButtonRow>
            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={handleReject} $variant="ghost">
              Reject
            </Button>
          </ButtonRow>
        </Actions>
      )}

      {officerRejected && onResubmit && paper.resubmission_count < 1 && (
        <ResubmitRow>
          <FileInput
            type="file"
            accept="application/pdf"
            onChange={(e) => setResubmitFile(e.target.files?.[0] || null)}
          />
          <Button onClick={() => onResubmit(paper.id, resubmitFile)}>
            Resubmit
          </Button>
        </ResubmitRow>
      )}

      {canDelete && (
        <DeleteRow>
          <DeleteButton onClick={() => onDelete?.(paper.id)}>
            Delete Paper
          </DeleteButton>
        </DeleteRow>
      )}
    </Card>
  );
};

export default PaperCard;
