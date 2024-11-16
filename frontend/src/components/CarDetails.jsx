
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { api } from "../api/index";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          return;
        }
        const fetchedCar = await api.getCar(id, token);
        if (!fetchedCar.success) {
          toast.error(fetchedCar.message);
          navigate("/dashboard");
          return;
        }
        setCar(fetchedCar.car);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
        toast.error("Failed to load car details. Please try again.");
        navigate("/dashboard");
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        if (!token) {
          toast.error("Unauthorized! Please log in.");
          navigate("/login");
          return;
        }
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await api.deleteCar(id, token, userId);
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.success("Car deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Failed to delete car:", error);
        toast.error("Failed to delete car. Please try again.");
      }
    }
  };

  if (!car) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-gray-800 flex items-center gap-2 font-medium"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/car/edit/${id}`, { state: { car } })}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="relative">
            <div className="relative w-full h-0 pb-[56.25%]">
              <img
                src={car.images[currentImageIndex]}
                alt={car.title}
                className="absolute top-0 left-0 object-cover w-full h-full"
              />
            </div>

            {car.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? car.images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 w-8 h-8 flex justify-center items-center transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev === car.images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full hover:bg-black/70 w-8 h-8 flex justify-center items-center transition"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{car.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed whitespace-pre-wrap">
              {car.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
