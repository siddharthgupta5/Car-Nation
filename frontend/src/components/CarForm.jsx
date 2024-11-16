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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {initialData ? "Edit Car" : "Add New Car"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (Max 10)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {formData.existingImages.map((image, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative aspect-w-3 aspect-h-2"
                >
                  <img
                    src={image}
                    alt={`Existing Car ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 w-8 h-8 flex justify-center items-center"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {formData.newImages.map((image, index) => (
                <div
                  key={`new-${index}`}
                  className="relative aspect-w-3 aspect-h-2"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`New Car ${index + 1}`}
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, false)}
                    className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 w-8 h-8 flex justify-center items-center"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {formData.existingImages.length + formData.newImages.length <
                10 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-500">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="text-sm text-gray-600">Add Images</span>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-400"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-black"
            >
              {initialData ? "Update Car" : "Create Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;