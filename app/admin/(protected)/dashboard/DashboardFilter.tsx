"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRange = searchParams.get("range") || "all";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(`/admin/dashboard?range=${value}`);
  };

  return (
    <div className="relative">
      <select 
        name="range"
        value={currentRange}
        onChange={handleChange}
        className="appearance-none bg-white border border-[#c5c6cc] text-[#25314d] text-sm font-semibold py-2 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C9A66B] cursor-pointer"
      >
        <option value="today">Today</option>
        <option value="7d">Last 7 Days</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
        <option value="all">All Time</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#827e9c]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}
