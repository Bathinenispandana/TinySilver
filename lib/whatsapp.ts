export const WHATSAPP_NUMBER = "919247507140";

export function sendWhatsAppMessage(message: string) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank");
}