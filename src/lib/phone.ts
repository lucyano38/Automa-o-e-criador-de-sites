export const sanitizePhone = (phone: string): string => {
  // Remove non-numeric characters
  let clean = phone.replace(/\D/g, '');
  
  // Remove leading '0' if present
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  
  return clean;
};

export const formatWhatsAppLink = (phone: string, message: string): string => {
  let clean = sanitizePhone(phone);
  
  // Ensure it has DDI 55
  if (!clean.startsWith('55')) {
    clean = `55${clean}`;
  }
  
  // Handle mobile number formatting (if length is 12, it might be missing the '9')
  // Original length 12: 55 + DDD (2) + FirstDigit (1) + Suffix (7) = 12
  // Should be 13: 55 + DDD (2) + '9' (1) + FirstDigit (1) + Suffix (7) = 13
  if (clean.length === 12) {
    const ddd = clean.substring(2, 4);
    const firstDigit = clean.substring(4, 5);
    
    // Check if it's a mobile prefix (6,7,8,9)
    if (['6', '7', '8', '9'].includes(firstDigit)) {
        clean = clean.substring(0, 4) + '9' + clean.substring(4);
    }
  }
  
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};
