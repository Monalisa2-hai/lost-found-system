import { useState } from "react";

export default function ReportItem() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemName || !description || !location || !dateLost ) {
      setMessage("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName,
          description,
          location,
          dateLost,
        }),
      });

      const data = await res.json();
      setMessage(data.message);

    } catch (err) {
      setMessage("Error connecting to server");
    }
  }

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <h2 className="report-title">Report Lost Item</h2>

        <form className="report-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder="Item Name"
            className="input-field"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="input-field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Seen Location"
            className="input-field"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label>Date Lost</label>
           <input
            type="date"
            className="input-field"
             value={dateLost}
           onChange={(e) => setDateLost(e.target.value)}
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