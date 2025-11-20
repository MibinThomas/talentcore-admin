// app/admin/subscription/page.jsx or components/Subscription.jsx
"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuCircleCheck, LuPencil } from "react-icons/lu";
import SubscriptionModal from "./SubscriptionModal";
import {
  getAllSubscriptionPlansAPI,
  createSubscriptionPlanAPI,
  updateSubscriptionPlanAPI,
  toggleSubscriptionPlanStatusAPI,
} from "@/src/services/allAPI";
import Swal from "sweetalert2";

function Subscription() {
  const [plans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const fetchPlans = async () => {
    try {
      const result = await getAllSubscriptionPlansAPI();
      if (result.status === 200) {
        setPlans(result.data.plans || []);
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleSubmitPlan = async (planData, planId) => {
    try {
      if (planId) {
        const res = await updateSubscriptionPlanAPI(planId, planData);
        if (res.success || res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Plan updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        const res = await createSubscriptionPlanAPI(planData);
        if (res.success || res.status === 201 || res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Plan created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      await fetchPlans(); // Refresh list
    } catch (error) {
      console.error("Save failed:", error);
      Swal.fire({
        icon: "error",
        title: res?.response.data.message,
      });
      throw error;
    }
  };

 const handleToggleStatus = async (planId) => {
  try {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to change the plan status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!confirmResult.isConfirmed) return; // Stop if canceled

    const result = await toggleSubscriptionPlanStatusAPI(planId);

    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchPlans();
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed to toggle status.",
    });
    console.error("Toggle status failed:", error);
  }
};


  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 ">
          <h1 className="text-[24px] font-normal text-gray-900">Subscription Plans</h1>
          <button
            onClick={() => handleOpenModal()}
            className="bg-primary text-white text-[16px] px-6 py-3 leading-none flex items-center justify-center gap-2 rounded-[10px] hover:bg-primary/90 transition shadow-md"
          >
            Add Plan <FaPlus />
          </button>
        </div>

        {/* Plans Grid - Your Original Beautiful Design */}
        <div className="w-full flex flex-wrap justify-start gap-8">
          {plans.length === 0 ? (
            <div className="text-center w-full py-20">
              <p className="text-xl text-gray-500">No subscription plans yet.</p>
              <p className="text-gray-400 mt-2">Click "Add Plan" to create your first plan!</p>
            </div>
          ) : (
            plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-[#FCFAFF] rounded-2xl shadow-md border border-[#D9D9D9] p-6 relative hover:shadow-lg transition-all w-full lg:w-[48%]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[22px] font-semibold text-gray-900">
                      {plan.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleOpenModal(plan)}
                    className="bg-gray-100 p-2 border border-[#9AA0B6] rounded-lg hover:bg-gray-200 transition"
                  >
                    <LuPencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <span className="border-r border-gray-400 me-4 pe-3">
                      ₹{plan.price}
                    </span>
                    {plan.validityDays && (
                      <span className="text-gray-400 text-sm font-normal">
                        {plan.validityDays} days
                      </span>
                    )}
                  </h3>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {plan.description?.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <LuCircleCheck className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.atsAccess && (
                    <li className="flex items-center">
                      <LuCircleCheck className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                      <span className="font-medium">ATS Optimization Access</span>
                    </li>
                  )}
                </ul>

                <div className="w-full flex justify-end">
                  <button 
                    onClick={() => handleToggleStatus(plan._id)}
                  className={`${plan?.status ? "bg-red-500" : "bg-green-500"} leading-none text-white text-[16px] rounded-[5px] py-2 px-6`}>
                  {plan?.status ? "Block" : "Unblock"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPlan}
        initialData={editingPlan}
      />
    </section>
  );
}

export default Subscription;