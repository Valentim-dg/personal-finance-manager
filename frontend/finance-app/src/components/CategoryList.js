import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Toast from "./Toast";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";

function CategoryList(props) {
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    categoryId: null,
  });

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // Remove após 4 segundos
  };

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

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, categoryId: id });
  };

  const handleConfirmDelete = () => {
    const id = confirmModal.categoryId;
    setConfirmModal({ isOpen: false, categoryId: null });

    axios
      .delete(`http://localhost:8080/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((c) => c.id !== id));
        showToast("Category deleted successfully!", "success");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);

        if (error.response && error.response.status === 500) {
          showToast(
            "Cannot delete category with associated transactions.",
            "error",
          );
        } else {
          showToast("Error deleting category. Please try again.", "error");
        }
      });
  };

  const handleCancelDelete = () => {
    setConfirmModal({ isOpen: false, categoryId: null });
  };

  return (
    <div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title="Delete Category"
        message="Are you sure you want to delete this category? Transactions using it will lose the category reference."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

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
              className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100 hover:shadow-md transition flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{category.name}</h4>
                <p className="text-sm text-gray-600">
                  {category.description || "No description"}
                </p>
              </div>

              <button
                onClick={() => handleDeleteClick(category.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition flex-shrink-0"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
