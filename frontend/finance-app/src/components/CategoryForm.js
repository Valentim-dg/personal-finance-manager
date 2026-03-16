import React, { useState } from "react";
import axios from "axios";

function CategoryForm(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const categorie = {
      name: name,
      description: description,
    };

    axios
      .post("http://localhost:8080/api/categories", categorie)
      .then((response) => {
        setName("");
        setDescription("");
        props.onCategoryAdded();
      })
      .catch((error) => {
        console.error("Error creating categorie:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="e.g., Food"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Optional"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-2 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition font-medium shadow-md"
      >
        ➕ Add Category
      </button>
    </form>
  );
}

export default CategoryForm;
