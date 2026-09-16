"use client";

export default function SocialSticky() {
  const whatsappNumber = "918247862319";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const instagramUrl =
    "https://www.instagram.com/tinysilvercollection";

  return (
    <div className="fixed right-3 top-1/2 z-[60] -translate-y-1/2 sm:right-5">
      <div
        className="
          flex flex-col
          overflow-hidden
          rounded-2xl
          border border-slate-200
          bg-white
          shadow-[0_10px_35px_rgba(15,23,42,0.20)]
        "
      >
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="
            px-1 py-1
            transition-all duration-300
            hover:bg-[#25D366]
            hover:text-white
          "
        >
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl
              bg-[#25D366]
              text-white
              shadow-[0_4px_12px_rgba(37,211,102,0.35)]
              transition-transform duration-300
              group-hover:scale-110
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.198-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M20.52 3.449A11.815 11.815 0 0012.05 0C5.495 0 .158 5.335.158 11.89c0 2.096.548 4.143 1.588 5.95L.067 24l6.303-1.653a11.86 11.86 0 005.674 1.444h.005c6.554 0 11.891-5.336 11.894-11.89a11.82 11.82 0 00-3.423-8.452zM12.05 21.785h-.004a9.87 9.87 0 01-5.03-1.378l-.36-.214-3.741.981.999-3.648-.235-.374a9.865 9.865 0 01-1.514-5.26c.003-5.445 4.434-9.874 9.884-9.874a9.82 9.82 0 016.987 2.898 9.825 9.825 0 012.893 6.994c-.003 5.445-4.435 9.875-9.879 9.875z" />
            </svg>
          </div>

          {/* Desktop text */}
          <span
            className="
              hidden
              pr-2
              text-sm font-semibold
              text-slate-700
              group-hover:text-white
              sm:block
            "
          >
          </span>
        </a>

        {/* Divider */}
        <div className="mx-2 h-px bg-slate-200" />

        {/* Instagram */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
          className="
          px-1 py-1
            transition-all duration-300
            hover:bg-gradient-to-tr
            hover:from-[#f09433]
            hover:via-[#dc2743]
            hover:to-[#833ab4]
            hover:text-white
          "
        >
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-xl
              bg-gradient-to-tr
              from-[#f09433]
              via-[#dc2743]
              to-[#833ab4]
              text-white
              shadow-[0_4px_12px_rgba(220,39,67,0.35)]
              transition-transform duration-300
              group-hover:scale-110
            "
          >
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
              <rect
                width="20"
                height="20"
                x="2"
                y="2"
                rx="5"
                ry="5"
              />

              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

              <line
                x1="17.5"
                x2="17.51"
                y1="6.5"
                y2="6.5"
              />
            </svg>
          </div>

          {/* Desktop text */}
          <span
            className="
              hidden
              pr-2
              text-sm font-semibold
              text-slate-700
              group-hover:text-white
              sm:block
            "
          >
          </span>
        </a>
      </div>
    </div>
  );
}