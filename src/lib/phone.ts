export const sanitizePhone = (phone: string): string => {
  let clean = phone.replace(/\D/g, '');
  if (clean.startsWith('0')) {
    clean = clean.substring(1);
  }
  return clean;
};

/**
 * Checks if a phone number is a valid mobile phone (WhatsApp capable).
 * In Brazil, mobile numbers have 11 digits (DDD 2 digits + '9' + 8 digits) or 13 digits with DDI (55 + DDD + 9 + 8 digits).
 * Landlines (fixo) in Brazil typically start with 2, 3, 4, 5 after DDD (e.g. 4591-2040).
 */
export const isMobilePhone = (phone: string): boolean => {
  let clean = sanitizePhone(phone);
  if (!clean) return false;
  if (clean.startsWith('55') && clean.length >= 12) {
    clean = clean.substring(2);
  }
  if (clean.length === 11) {
    const ninthDigit = clean.substring(2, 3);
    return ninthDigit === '9';
  }
  if (clean.length === 10) {
    const firstDigit = clean.substring(2, 3);
    return ['9', '7', '8', '6'].includes(firstDigit);
  }
  if (clean.length >= 9 && clean.startsWith('9')) {
    return true;
  }
  return false;
};

export const formatWhatsAppLink = (phone: string, message: string): string | null => {
  let clean = sanitizePhone(phone);
  if (!clean) return null;

  if (!isMobilePhone(clean)) {
    return null; // Landline / fixed phone - do not generate wa.me link
  }

  if (!clean.startsWith('55')) {
    clean = `55${clean}`;
  }

  if (clean.length === 12) {
    const firstDigit = clean.substring(4, 5);
    if (['6', '7', '8', '9'].includes(firstDigit)) {
      clean = clean.substring(0, 4) + '9' + clean.substring(4);
    }
  }

  // WhatsApp exige DDI + DDD + 9 + 8 digitos (13 digitos).
  if (clean.length !== 13) return null;

  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};

/** Busca na internet o WhatsApp real da empresa quando so ha telefone fixo cadastrado. */
export const buildWhatsAppSearchUrl = (companyName: string, city?: string): string => {
  const normalizedName = companyName.toLowerCase();
  const includeCity = city && !normalizedName.includes(city.toLowerCase());
  const query = `${companyName}${includeCity ? ` ${city}` : ''} WhatsApp`.trim();
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};
