"use client";

export default function SocialSticky() {
  const whatsappNumber = "918247862319";

  const whatsappUrl = `https://wa.me/${918247862319}`;

  // Replace with your actual Instagram profile URL
  const instagramUrl =
    "https://www.instagram.com/tinysilvercollection";

  return (
    <div className="fixed right-3 top-1/2 z-[60] -translate-y-1/2 sm:right-5">
      <div
        className="
          flex flex-col items-center
          rounded-2xl
          border border-slate-200
          bg-white
          p-1.5
          shadow-[0_12px_35px_rgba(15,23,42,0.18)]
        "
      >
        {/* ================= WHATSAPP ================= */}
        <div className="group relative">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl
              text-[#25D366]
              transition-all duration-300
              hover:scale-105
              hover:bg-[#25D366]
              hover:text-white
              focus:outline-none
            "
          >
            {/* WhatsApp SVG */}
            <svg
              viewBox="0 0 32 32"
              className="h-6 w-6"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 3C8.82 3 3 8.82 3 16c0 2.28.59 4.43 1.62 6.3L3 29l6.87-1.58A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.65c-2.02 0-3.98-.54-5.7-1.56l-.41-.24-4.08.94.97-3.97-.27-.42A10.57 10.57 0 0 1 5.35 16C5.35 10.12 10.12 5.35 16 5.35S26.65 10.12 26.65 16 21.88 26.65 16 26.65zm5.84-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.81 1.04-.99 1.25-.18.21-.36.24-.68.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.59-1.91-1.78-2.23-.18-.32-.02-.49.14-.65.14-.14.32-.36.48-.54.16-.18.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.08 1.31 3.29c.16.21 2.26 3.45 5.48 4.84.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.89-.77 2.16-1.51.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
            </svg>
          </a>

          {/* Tooltip */}
          <span
            className="
              pointer-events-none
              absolute right-full top-1/2 mr-3
              -translate-y-1/2
              whitespace-nowrap
              rounded-lg
              bg-[#0f172a]
              px-3 py-2
              text-xs font-semibold text-white
              opacity-0
              shadow-lg
              translate-x-2
              transition-all duration-200
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            Chat on WhatsApp
          </span>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="my-1.5 h-px w-7 bg-slate-200" />

        {/* ================= INSTAGRAM ================= */}
        <div className="group relative">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl
              text-[#dc2743]
              transition-all duration-300
              hover:scale-105
              hover:bg-gradient-to-tr
              hover:from-[#f09433]
              hover:via-[#dc2743]
              hover:to-[#833ab4]
              hover:text-white
              focus:outline-none
            "
          >
            {/* Instagram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>

          {/* Tooltip */}
          <span
            className="
              pointer-events-none
              absolute right-full top-1/2 mr-3
              -translate-y-1/2
              whitespace-nowrap
              rounded-lg
              bg-[#0f172a]
              px-3 py-2
              text-xs font-semibold text-white
              opacity-0
              shadow-lg
              translate-x-2
              transition-all duration-200
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            Follow on Instagram
          </span>
        </div>
      </div>
    </div>
  );
}