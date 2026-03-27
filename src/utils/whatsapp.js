export const getWhatsAppLink = (message) => {
  // Wait for user to provide the actual number. Using a generic placeholder for now.
  const phoneNumber = "917666202907";
  const encodedMessage = encodeURIComponent(message || "Hello, I would like to inquire about booking the multipurpose hall.");
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
