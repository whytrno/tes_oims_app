import { useEffect } from "react";

const TestCors = () => {
  useEffect(() => {
    fetch("https://apps.orecon.co.id/api/method/frappe.auth.get_logged_user", {
      method: "GET",
      credentials: "include", // penting supaya cookie dikirim
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log("CORS test success:", data);
          alert("CORS OK: Logged user = " + data.message);
        } else {
          alert("CORS test failed with status: " + res.status);
          console.error("Response status:", res.status);
        }
      })
      .catch((err) => {
        alert("CORS test error: " + err.message);
        console.error("CORS test error:", err);
      });
  }, []);

  return null;
}


export default TestCors