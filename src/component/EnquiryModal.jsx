import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./enquiryModal.css";

function EnquiryModal({ onClose }) {
  const [submission, setSubmission] = useState({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmission({ status: "sending", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = [
      "Solar Enquiry",
      `Name: ${formData.get("name")}`,
      `Address: ${formData.get("address")}`,
      `Requirement: ${formData.get("requirement")}`,
      `Mobile Number: ${formData.get("mobile")}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/919310490600?text=${encodeURIComponent(message)}`;

    try {
      window.location.assign(whatsappUrl);
      setSubmission({
        status: "success",
        message:
          "Your enquiry has been prepared in WhatsApp. Please send the message to continue.",
      });
      form.reset();
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to open WhatsApp. Please try again.",
      });
    }
  }

  return createPortal(
    <main
      aria-labelledby="enquiry-modal-heading"
      aria-modal="true"
      className="enquiry-modal"
      onClick={onClose}
      role="dialog"
    >
      <section
        className="enquiry-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close enquiry form"
          className="enquiry-modal__close"
          onClick={onClose}
          type="button"
        >
          &times;
        </button>
        <div className="enquiry-modal__heading">
          <span className="enquiry-modal__eyebrow">We’re here to help</span>
          <h1 id="enquiry-modal-heading">Send us an enquiry</h1>
            <p>
              Your details will be sent securely to our WhatsApp Business
              account.
            </p>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label htmlFor="modal-enquiry-name">Name</label>
          <input
            autoComplete="name"
            autoFocus
            id="modal-enquiry-name"
            maxLength={100}
            name="name"
            placeholder="Your full name"
            required
          />

          <label htmlFor="modal-enquiry-address">Address</label>
          <textarea
            autoComplete="street-address"
            id="modal-enquiry-address"
            maxLength={300}
            name="address"
            placeholder="Your address or project location"
            required
            rows={2}
          />

          <label htmlFor="modal-enquiry-requirement">Requirement</label>
          <textarea
            id="modal-enquiry-requirement"
            maxLength={1000}
            name="requirement"
            placeholder="What solar solution or service do you need?"
            required
            rows={2}
          />

          <label htmlFor="modal-enquiry-mobile">Mobile number</label>
          <input
            autoComplete="tel-national"
            id="modal-enquiry-mobile"
            inputMode="numeric"
            maxLength={10}
            name="mobile"
            pattern="[0-9]{10}"
            placeholder="10-digit mobile number"
            required
            title="Enter a 10-digit mobile number"
            type="tel"
          />

          <p
            aria-live="polite"
            className={`enquiry-form__message enquiry-form__message--${submission.status}`}
            role={submission.status === "error" ? "alert" : "status"}
          >
            {submission.message}
          </p>
          <button
            className="enquiry-form__submit"
            disabled={submission.status === "sending"}
            type="submit"
          >
            {submission.status === "sending" ? "Sending..." : "Send enquiry"}
          </button>
        </form>
      </section>
    </main>,
    document.body,
  );
}

export default EnquiryModal;
