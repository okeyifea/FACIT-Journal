import { useEffect, useState } from "react";
import { API_URL } from "../../server/API/Auth";

import StaffView from "./Common/staffDashboard.jsx";
import StudentView from "./Common/studentDashboard.jsx";
import OfficerView from "./Common/OfficerDashboard.jsx";
import Layout from "./Common/layout.jsx";
import { HomeText } from "../Style/HomeStyle.jsx";
import { useToast } from "./Common/Toast.jsx";
import Modal from "./Common/Modal.jsx";

const Dashboard = ({ user, setUser }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    actions: null
  });

  const fetchDashboard = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = storedUser?.token || localStorage.getItem("token");
    if (!token || !user?.role) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/dashboard/${user.role}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  // Review handler
  const handleReview = async (paperId, decision, comment) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = storedUser?.token || localStorage.getItem("token");

    console.log("The token:", token)
    try {
      const res = await fetch(`${API_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paperId, decision, comment })
      });


      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Review failed");
      }
      const actionLabel = decision === "approved" ? "Approved" : "Rejected";

      addToast(`${actionLabel} submitted successfully`);
      fetchDashboard(); 
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  const handleDelete = async (paperId) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = storedUser?.token || localStorage.getItem("token");
    if (!token) return;

    setModal({
      open: true,
      title: "Confirm Delete",
      message: "Are you sure you want to delete this paper? This action cannot be undone.",
      actions: [
        {
          label: "Cancel",
          variant: "ghost",
          onClick: () =>
            setModal({ open: false, title: "", message: "", actions: null })
        },
        {
          label: "Delete",
          variant: "danger",
          onClick: async () => {
            setModal({ open: false, title: "", message: "", actions: null });
            try {
              const res = await fetch(`${API_URL}/api/research/${paperId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
              const contentType = res.headers.get("content-type") || "";
              const body = contentType.includes("application/json")
                ? await res.json()
                : await res.text();
              if (!res.ok) {
                const msg =
                  typeof body === "string"
                    ? body
                    : body?.message || "Delete failed";
                throw new Error(msg);
              }
              const result = typeof body === "string" ? { message: body } : body;
              setModal({
                open: true,
                title: "Delete Successful",
                message: result.message || "Paper deleted",
                actions: [
                  {
                    label: "Close",
                    onClick: () =>
                      setModal({ open: false, title: "", message: "", actions: null })
                  }
                ]
              });
              fetchDashboard();
            } catch (err) {
              setModal({
                open: true,
                title: "Delete Failed",
                message: err.message || "Failed to delete paper",
                actions: [
                  {
                    label: "Close",
                    onClick: () =>
                      setModal({ open: false, title: "", message: "", actions: null })
                  }
                ]
              });
            }
          }
        }
      ]
    });
  };

  const handleResubmit = async (paperId, file) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const token = storedUser?.token || localStorage.getItem("token");
    if (!token) return;
    if (!file) {
      alert("Please select a PDF to resubmit.");
      return;
    }

    try {
      const data = new FormData();
      data.append("pdf", file);
      const res = await fetch(`${API_URL}/api/research/${paperId}/resubmit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Resubmit failed");
      alert(result.message || "Paper resubmitted");
      fetchDashboard();
    } catch (err) {
      alert(err.message || "Failed to resubmit paper");
    }
  };

  if (!user) return <p>Please log in to view the dashboard.</p>;
  if (loading) return <p>Loading dashboard...</p>;

  return (
    <Layout user={user} setUser={setUser}>
      <div style={{ padding: "20px" }}>
        <HomeText>
          <h1 style={{ fontSize: "35px", fontWeight: "800", margin: "0", color: "white"}}>
            {user.role?.toUpperCase()} DASHBOARD
          </h1>
        </HomeText>

        {user.role === "student" && (
          <StudentView
            papers={data || []}
            onDelete={handleDelete}
            onResubmit={handleResubmit}
          />
        )}
        {user.role === "staff" && (
          <StaffView
            data={data || { pendingStaffReview: [], myPapers: [] }}
            onReview={handleReview}
            onResubmit={handleResubmit}
            onDelete={handleDelete}
          />
        )}
        {user.role === "officer" && <OfficerView data={data || { staffPapers: [], studentPapers: [] }} onReview={handleReview} />}
      </div>
      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        actions={modal.actions}
        onClose={() => setModal({ open: false, title: "", message: "", actions: null })}
      />
    </Layout>
  );
};

export default Dashboard;
