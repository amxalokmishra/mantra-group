import React, { useState, useEffect } from "react";
import "../App.css"; // Import CSS file for styling

interface FormData {
  name: string;
  employeeId: string;
  city: string;
  gender: string;
}

const initialFormData: FormData = {
  name: "",
  employeeId: "",
  city: "",
  gender: "",
};

function Input({
  onSubmit,
  submitted,
}: {
  onSubmit: () => void;
  submitted: boolean;
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (submitted) {
      setFormData(initialFormData); // Reset form data when submitted prop changes
    }
  }, [submitted]); // Reset form data when submitted prop changes

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/formdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    onSubmit(); // Notify parent component about form submission
  };

  return (
    <div className="form-container">
      <h2>Employee Information Form</h2>
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter Name"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="number"
            name="employeeId"
            value={formData.employeeId}
            placeholder="Enter Employee ID"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select City
            </option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
                required
              />
              Female
            </label>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default Input;
