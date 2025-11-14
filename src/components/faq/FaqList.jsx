"use client";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import Swal from "sweetalert2";
import AddEditFAQModal from "../common/modal/AddEditFaQ";
import {
  createFAQAPI,
  getAllFAQAPI,
  toggleFAQStatusAPI,
  deleteFAQByIdAPI,
  updateFAQByIdAPI,
} from "@/src/services/allAPI";

export default function FAQList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔹 Fetch all FAQs
  const fetchFAQs = async () => {
    try {
      setIsLoading(true);
      const response = await getAllFAQAPI();

      if (response?.status === 200 && response?.data?.faqs) {
        setFaqs(response.data.faqs);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  // 🔹 Toggle Status with Confirmation
  const handleToggleStatus = async (faqId, index) => {
    const currentStatus = faqs[index].isActive;

    const result = await Swal.fire({
      title: currentStatus
        ? "Are you sure you want to block this FAQ?"
        : "Do you want to activate this FAQ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: currentStatus ? "Yes, Block it!" : "Yes, Activate it!",
    });

    if (result.isConfirmed) {
      try {
        const updatedFaqs = [...faqs];
        updatedFaqs[index].isActive = !updatedFaqs[index].isActive;
        setFaqs(updatedFaqs);

        const response = await toggleFAQStatusAPI(faqId);

        if (response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: currentStatus
              ? "FAQ has been blocked!"
              : "FAQ has been activated!",
            timer: 1200,
            showConfirmButton: false,
          });
          await fetchFAQs();
        } else {
          throw new Error("Failed to toggle status");
        }
      } catch (error) {
        console.error("Error toggling FAQ status:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to update status",
          text: "Please try again later.",
        });
      }
    }
  };

  // 🟢 Delete FAQ Function
  const handleDeleteFAQ = async (faqId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This FAQ will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteFAQByIdAPI(faqId);

        if (response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "FAQ deleted successfully!",
            timer: 1200,
            showConfirmButton: false,
          });
          await fetchFAQs();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to delete FAQ",
            text: "Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Unable to delete FAQ.",
        });
      }
    }
  };

  const handleAddClick = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEditClick = (faq, index) => {
    setEditData({ ...faq, index });
    setModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (editData) {
        const response = await updateFAQByIdAPI(editData._id, {
          question: formData.question,
          answer: formData.answer,
          isActive: formData.active,
        });

        if (response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "FAQ Updated Successfully!",
            timer: 1200,
            showConfirmButton: false,
          });
          await fetchFAQs();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Update FAQ",
            text: "Please try again later.",
          });
        }
      } else {
        const response = await createFAQAPI({
          question: formData.question,
          answer: formData.answer,
          isActive: formData.active,
        });

        if (response?.status === 201 || response?.status === 200) {
          Swal.fire({
            icon: "success",
            title: "FAQ Added Successfully!",
            timer: 1200,
            showConfirmButton: false,
          });
          await fetchFAQs();
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Add FAQ",
            text: "Please try again later.",
          });
        }
      }

      setModalOpen(false);
      setEditData(null);
    } catch (error) {
      console.error("Error saving FAQ:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to save FAQ. Please try again.",
      });
    }
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 gap-6 md:py-10 py-0 pb-3 mb-4">
        <div>
          <h2 className="md:text-[24px] text-[20px] font-normal w-max text-[#A9A9A9] leading-none">
            <span className="text-black">FAQ Management</span>
          </h2>
          <p className="text-[16px] text-gray-600 mt-3">
            View, edit, and manage all frequently asked questions
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-all"
        >
          + Add FAQ
        </button>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex justify-center items-center w-full py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-2 text-primary">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="min-w-full text-left text-sm border-collapse table-fixed">
            <thead>
              <tr className="md:text-[18px] text-[16px] text-black border-b border-gray-200">
                <th className="py-3 px-6 font-semibold">Question</th>
                <th className="py-3 px-6 font-semibold">Answer</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-5 px-6 text-black font-medium w-[30%] break-words whitespace-normal">
                      {faq.question}
                    </td>
                    <td className="py-5 px-6 text-gray-800 w-[40%] break-words whitespace-normal">
                      {faq.answer}
                    </td>
                    <td className="py-5 px-6 w-[15%]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            faq.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span className="capitalize text-gray-800">
                          {faq.isActive ? "Active" : "Blocked"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-center w-[15%]">
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => handleEditClick(faq, index)}
                          className="text-gray-700 hover:text-blue-600 transition"
                        >
                          <FiEdit2 size={18} />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(faq._id, index)}
                          className="text-gray-700 hover:text-primary transition"
                        >
                          {faq.isActive ? (
                            <MdToggleOn size={30} className="text-green-500" />
                          ) : (
                            <MdToggleOff size={30} className="text-gray-400" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteFAQ(faq._id)}
                          className="text-gray-700 hover:text-red-600 transition"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No FAQs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <AddEditFAQModal
          onClose={() => setModalOpen(false)}
          onSaved={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
}
