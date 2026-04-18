import { useState } from "react";

export default function ReportFoundItem() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !location) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/report-found", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, location }),
      });

      const data = await res.json();
      setMessage(data.message);

      // clear form
      setName("");
      setDescription("");
      setLocation("");

    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <h2 className="report-title">Report Found Item</h2>

        <form className="report-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location Found"
            className="input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit" className="report-btn">
            Submit Report
          </button>
        </form>

        {message && <p className="report-message">{message}</p>}
      </div>
    </div>
  );
}