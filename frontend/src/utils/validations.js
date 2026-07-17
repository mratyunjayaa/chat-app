export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') return false;
  
  // Strip out hidden zero-width layout-breaking characters
  const sanitized = username.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  
  // Enforces safe alphanumeric handles between 2 and 25 characters
  const validUserRegex = /^[a-zA-Z0-9_-]{2,25}$/;
  return validUserRegex.test(sanitized);
};

export const validateMessage = (message) => {
  if (!message || typeof message !== 'string') return false;
  
  const sanitized = message.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  return sanitized.length > 0 && sanitized.length <= 4000;
};

export const escapeHTML = (rawString) => {
  if (!rawString || typeof rawString !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  return rawString.replace(/[&<>"'/]/g, (match) => map[match]);
};