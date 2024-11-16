
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/index";

const CarForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.car || null;

  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    tags: initialData?.tags || [],
    existingImages: initialData?.images || [],
    newImages: [],
    userId: user?.id,
  });
  const [newTag, setNewTag] = useState("");

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (
      formData.existingImages.length +
        formData.newImages.length +
        files.length >
      10
    ) {
      toast.error("Maximum 10 images allowed");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setFormData((prev) => ({
        ...prev,
        existingImages: prev.existingImages.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        newImages: prev.newImages.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const carFormData = new FormData();
      carFormData.append("userId", formData?.userId);
      carFormData.append("title", formData.title);
      carFormData.append("description", formData.description);
      carFormData.append("tags", JSON.stringify(formData.tags));
      carFormData.append(
        "existingImages",
        JSON.stringify(formData.existingImages)
      );
      formData.newImages.forEach((image) => {
        carFormData.append("images", image);
      });

      let response;
      if (initialData) {
        const id = initialData._id;
        response = await api.updateCar(id, carFormData, token);
      } else {
        response = await api.createCar(carFormData, token);
      }

      if (response.success) {
        toast.success(
          `Car ${initialData ? "updated" : "created"} successfully!`
        );
        navigate("/dashboard");
      } else {
        throw new Error(response.message || "An error occurred");
      }
    } catch (error) {
      toast.error(
        `Failed to ${initialData ? "update" : "create"} car: ${error.message}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-10 text-center">
          {initialData ? "Edit Car Details" : "Add a New Car"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-6 border border-gray-200"
        >
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Images (Max 10)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {formData.existingImages.map((image, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative border rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Existing Car ${index + 1}`}
                    className="object-cover w-full h-32"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
       </form>
      </div>
    </div>
  );
};

export default CarForm;