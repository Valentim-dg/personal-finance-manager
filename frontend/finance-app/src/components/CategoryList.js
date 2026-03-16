import React, { useState, useEffect } from "react";
import axios from "axios";

function CategoryList(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [props.refreshKey]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-700">
        All Categories
      </h3>

      {categories.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No categories yet
        </p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-md transition"
            >
              <h4 className="font-semibold text-gray-800">{category.name}</h4>
              <p className="text-sm text-gray-600">
                {category.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
