"use client";
import React, { useState } from "react";
import { CheckCircle, Edit2 } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import SubscriptionModal from "./SubscriptionModal";

function Subscription() {
  const [plans, setPlans] = useState([
    {
      title: "Basic",
      price: "₹0",
      duration: "",
      description: "Get started with essential job search features",
      features: [
        "Access to basic job listings",
        "Up to 5 job alerts",
        "Standard application tracking",
        "Basic profile analytics",
      ],
    },
    {
      title: "Pro",
      price: "₹199.99",
      duration: "| 30 days",
      description: "Access premium tools and insights for better visibility",
      features: [
        "Unlimited premium job listings",
        "Advanced application insights",
        "Unlimited job alerts",
        "Priority application status",
        "Resume optimization tools",
        "Interview preparation resources",
      ],
    },
    {
      title: "Premium",
      price: "₹499.99",
      duration: "| 60 days",
      description: "Access premium tools and insights for better visibility",
      features: [
        "Unlimited premium job listings",
        "Advanced application insights",
        "Unlimited job alerts",
        "Priority application status",
        "Resume optimization tools",
        "Interview preparation resources",
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPlanIndex, setEditPlanIndex] = useState(null);

  const handleAddClick = () => {
    setEditPlanIndex(null); // Add mode
    setIsModalOpen(true);
  };

  const handleEditClick = (index) => {
    setEditPlanIndex(index); // Edit mode
    setIsModalOpen(true);
  };

  const handleSubmitPlan = (newPlan) => {
    if (editPlanIndex !== null) {
      // Update existing plan
      const updated = [...plans];
      updated[editPlanIndex] = {
        ...newPlan,
        features: newPlan.details,
      };
      setPlans(updated);
    } else {
      // Add new plan
      setPlans([...plans, { ...newPlan, features: newPlan.details }]);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-normal">Subscription Plans</h1>
          <button
            onClick={handleAddClick}
            className="bg-primary text-white text-[16px] px-4 py-3 leading-none flex items-center justify-center gap-2 rounded-[10px] w-max"
          >
            Add Plan <FaPlus />
          </button>
        </div>

        {/* Plans List */}
        <div className="mt-6">
          <div className="w-full flex flex-wrap justify-between gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-[#FCFAFF] rounded-2xl shadow-md border border-[#D9D9D9] p-6 relative hover:shadow-lg transition-all w-full md:w-full lg:w-[48%]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-[22px] font-semibold text-gray-900">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEditClick(index)}
                    className="bg-gray-100 p-2 border border-[#9AA0B6] rounded-lg hover:bg-gray-200 transition"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.price}{" "}
                    {plan.duration && (
                      <span className="text-gray-400 text-sm font-normal">
                        {plan.duration}
                      </span>
                    )}
                  </h3>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-purple-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitPlan}
        initialData={editPlanIndex !== null ? plans[editPlanIndex] : null}
      />
    </section>
  );
}

export default Subscription;
