
export const API_URL = "http://localhost:5000";

export const signupUser = async (payload) => {
  console.log("Signup data being sent:", payload); // Debug log

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Send all fields
    });

    // Check for non-JSON response (like 404 or HTML error page)
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server did not return JSON");
    }

    const result = await response.json();
    return result; // { success: true/false, message }
  } catch (error) {
    console.error("Signup API error:", error);
    return { success: false, message: "Network error or invalid response from server" };
  }
};

export const loginUser = async (data) => {
  console.log("Login data:", data); // Debug log
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result; // { success: true/false, user/message }
  } catch (error) {
    console.error("Login API error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
};
