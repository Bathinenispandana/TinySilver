"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Loader2, MapPin, X } from "lucide-react";

type LocationData = {
  pincode: string;
  state: string;
  district: string;
  city: string;
};

export default function DeliveryLocation() {
  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeliverable, setIsDeliverable] = useState<boolean | null>(null);

  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");

    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);

        setLocation(parsed.location);
        setPincode(parsed.location.pincode);
        setIsDeliverable(parsed.deliverable);
        setMessage(
          parsed.deliverable
            ? `Delivery available in ${parsed.location.city}.`
            : "Currently unavailable for this location."
        );
      } catch {
        localStorage.removeItem("deliveryLocation");
      }
    }
  }, []);

  const handlePincodeChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 6);

    setPincode(onlyNumbers);
    setMessage("");
    setIsDeliverable(null);
    setLocation(null);
  };

  const checkPincode = async () => {
    if (pincode.length !== 6) {
      setMessage("Please enter a valid 6-digit pincode.");
      setIsDeliverable(false);
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setLocation(null);

      const response = await fetch(`/api/pincode/${pincode}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        setIsDeliverable(false);
        setMessage(data.message || "Unable to find this pincode.");
        return;
      }

      setLocation(data.location);
      setIsDeliverable(data.deliverable);
      setMessage(data.message);

      if (data.deliverable) {
        localStorage.setItem(
          "deliveryLocation",
          JSON.stringify({
            location: data.location,
            deliverable: true,
          })
        );
      } else {
        localStorage.removeItem("deliveryLocation");
      }
    } catch (error) {
      console.error(error);

      setIsDeliverable(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      checkPincode();
    }
  };

  const clearLocation = () => {
    setPincode("");
    setLocation(null);
    setMessage("");
    setIsDeliverable(null);

    localStorage.removeItem("deliveryLocation");
  };

  const displayLocation = location
    ? `${location.city}, ${location.state}`
    : "India";

  return (
    <div className="relative">
      {/* LOCATION BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5"
        aria-label="Select delivery location"
      >
        <MapPin className="h-10 w-10 shrink-0 text-slate-300" strokeWidth={1.8} />

        <div className="min-w-0">
          <p className="text-sm text-slate-400">Deliver to</p>

          <p className="max-w-[130px] truncate text-lg font-semibold leading-tight text-white">
            {displayLocation}
          </p>
        </div>

        <ChevronDown
          className={`ml-1 h-5 w-5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* PINCODE POPUP */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[360px] rounded-xl border border-slate-200 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Choose your location
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                We currently deliver across Telangana and Andhra Pradesh.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={pincode}
              onChange={(e) => handlePincodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              className="h-11 flex-1 rounded-lg border border-slate-300 px-3 text-sm text-black outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />

            <button
              onClick={checkPincode}
              disabled={loading || pincode.length !== 6}
              className="flex h-11 min-w-[80px] items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check"
              )}
            </button>
          </div>

          {message && (
            <div
              className={`mt-4 rounded-lg border p-3 text-sm ${
                isDeliverable
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <div className="flex gap-2">
                {isDeliverable ? (
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <X className="mt-0.5 h-4 w-4 shrink-0" />
                )}

                <div>
                  <p>{message}</p>

                  {location && (
                    <p className="mt-1 font-medium">
                      {location.district}, {location.state} -{" "}
                      {location.pincode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {location && isDeliverable && (
            <button
              onClick={clearLocation}
              className="mt-4 text-sm font-medium text-slate-600 underline hover:text-slate-900"
            >
              Change location
            </button>
          )}
        </div>
      )}
    </div>
  );
}