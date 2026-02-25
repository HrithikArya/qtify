import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button/Button";
import "./FeedbackModal.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  description: ""
};

function FeedbackModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setForm(initialForm);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.85)" } } }}
    >
      <Box className="feedbackModal">
        <button className="closeBtn" onClick={onClose} type="button">
          <CloseIcon />
        </button>
        <h2>Feedback</h2>
        <form onSubmit={handleSubmit} className="feedbackForm">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Email ID</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter subject"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write your feedback"
            rows="4"
            required
          />

          <Button text="Submit Feedback" type="submit" />
        </form>
      </Box>
    </Modal>
  );
}

export default FeedbackModal;
