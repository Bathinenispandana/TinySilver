import React from "react";
import { CheckCircle2, Package, Truck, Home, CircleDashed } from "lucide-react";

interface OrderTrackerProps {
  status: string;
}

export default function OrderTracker({ status }: OrderTrackerProps) {
  const steps = [
    { 
      id: "PAID", 
      label: "Order Placed", 
      icon: CheckCircle2,
      theme: {
        bg: "bg-emerald-500",
        border: "border-emerald-500",
        iconCurrent: "text-emerald-500",
      }
    },
    { 
      id: "PROCESSING", 
      label: "Processing", 
      icon: Package,
      theme: {
        bg: "bg-blue-500",
        border: "border-blue-500",
        iconCurrent: "text-blue-500",
      }
    },
    { 
      id: "DISPATCHED", 
      label: "Dispatched", 
      icon: Truck,
      theme: {
        bg: "bg-purple-500",
        border: "border-purple-500",
        iconCurrent: "text-purple-500",
      }
    },
    { 
      id: "DELIVERED", 
      label: "Delivered", 
      icon: Home,
      theme: {
        bg: "bg-teal-500",
        border: "border-teal-500",
        iconCurrent: "text-teal-500",
      }
    },
  ];

  const getStepState = (stepId: string, currentStatus: string) => {
    if (currentStatus === "CANCELLED") return "cancelled";
    if (currentStatus === "PENDING") return "pending";

    const currentIndex = steps.findIndex(s => s.id === currentStatus);
    const stepIndex = steps.findIndex(s => s.id === stepId);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const currentStatusIndex = steps.findIndex(s => s.id === status);

  if (status === "CANCELLED") {
    return (
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center">
        <h3 className="text-red-800 font-bold text-lg">Order Cancelled</h3>
        <p className="text-red-600 text-sm mt-1">This order has been cancelled and will not be fulfilled.</p>
      </div>
    );
  }

  if (status === "PENDING") {
    return (
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center">
        <h3 className="text-orange-800 font-bold text-lg">Awaiting Payment</h3>
        <p className="text-orange-600 text-sm mt-1">We are waiting for payment confirmation before processing your order.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-slate-200 py-8 px-4 md:px-8">
      <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider mb-10 text-center">Tracking Details</h3>
      
      <div className="relative flex justify-between items-center max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const state = getStepState(step.id, status);
          const Icon = state === "upcoming" ? CircleDashed : step.icon;
          const isSegmentFilled = index < currentStatusIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ring-4 ring-white ${
                    state === "completed" ? `${step.theme.bg} text-white shadow-sm scale-100` :
                    state === "current" ? `bg-white ${step.theme.iconCurrent} border-[2px] ${step.theme.border} shadow-md scale-110` :
                    "bg-white border-2 border-slate-200 text-slate-300 scale-100"
                  }`}
                >
                  <Icon className={`w-4 h-4 md:w-4 md:h-4 ${state === "completed" ? "opacity-100" : state === "current" ? "animate-pulse" : ""}`} />
                </div>
                <span className={`text-[10px] md:text-xs font-semibold absolute -bottom-6 whitespace-nowrap transition-colors duration-300 ${
                  state === "completed" || state === "current" ? "text-[#0f172a]" : "text-slate-400"
                }`}>
                  {step.label}
                </span>
              </div>

              {/* Connecting Line to next step */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-slate-100 -mx-1 md:-mx-2 relative rounded-full z-0">
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-in-out ${step.theme.bg}`}
                    style={{ width: isSegmentFilled ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="h-6"></div> {/* Spacer for absolute text */}
    </div>
  );
}
