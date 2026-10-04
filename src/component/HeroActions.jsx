import { useState } from "react";
import EnquiryModal from "./EnquiryModal";

function HeroActions() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={() => setIsEnquiryOpen(true)}
        className="rounded-full bg-green-700 px-9 py-3 text-center text-base font-semibold text-white shadow-lg transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Enquiry
      </button>
      <a
        href="tel:+919310490600"
        className="rounded-full border border-white bg-white/95 px-7 py-3 text-center text-base font-semibold text-green-800 shadow-lg transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Call Us
      </a>
      <div className="absolute">
        {isEnquiryOpen && (
          <EnquiryModal onClose={() => setIsEnquiryOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default HeroActions;
