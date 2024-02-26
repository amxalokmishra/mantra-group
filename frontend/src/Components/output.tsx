import React, { useEffect, useState } from "react";
import "../App.css"; // Import CSS file for styling

interface FormData {
  _id: string;
  name: string;
  employeeId: string;
  city: string;
  gender: string;
}

function Output({
  onFetch,
  submitted,
}: {
  onFetch: () => void;
  submitted: boolean;
}) {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<FormData | null>(null);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array to run effect only once

  useEffect(() => {
    if (submitted) {
      fetchData(); // Fetch data when the submitted state changes
      onFetch();
    }
  }, [submitted]); // Fetch data when submitted state changes

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/formdata");
      if (!response.ok) {
        throw new Error("Failed to fetch form data");
      }
      const data = await response.json();
      setFormDataList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedData(formDataList[index]);
  };

  const handleSave = async () => {
    if (editedData) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/formdata/${editedData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update form data");
        }
        // Refresh data after saving
        fetchData();
        setEditIndex(null);
        setEditedData(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (key: keyof FormData, value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, [key]: value });
    }
  };

  const handleGenderChange = (value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, gender: value });
    }
  };

  return (
    <div className="output-container">
      <h2> Display :</h2>
      {formDataList.map((formData, index) => (
        <div key={index}>
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editedData?.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <input
                type="text"
                value={editedData?.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
              />
              {/* Dropdown select element for city */}
              <select
                value={editedData?.city}
                onChange={(e) => handleChange("city", e.target.value)}
              >
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Tokyo">Tokyo</option>
              </select>
              <label>
                Male
                <input
                  type="radio"
                  value="Male"
                  checked={editedData?.gender === "Male"}
                  onChange={() => handleGenderChange("Male")}
                />
              </label>
              <label>
                Female
                <input
                  type="radio"
                  value="Female"
                  checked={editedData?.gender === "Female"}
                  onChange={() => handleGenderChange("Female")}
                />
              </label>
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p onClick={() => handleEdit(index)}>Name: {formData.name}</p>
              <p>Employee ID: {formData.employeeId}</p>
              <p>City: {formData.city}</p>
              <p>Gender: {formData.gender}</p>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Output;
