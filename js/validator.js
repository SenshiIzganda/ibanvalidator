/**
 * validator.js
 * IBAN validation logic implementing ISO 13616 standard.
 *
 * Key steps for validation:
 *  1. Strip spaces, uppercase.
 *  2. Check the country code exists in our database.
 *  3. Verify the total length matches the expected length.
 *  4. Verify all characters are alphanumeric.
 *  5. Rearrange: move first 4 chars to end, convert letters to numbers (A=10…Z=35).
 *  6. Compute MOD-97; remainder must equal 1.
 */

/**
 * Strips spaces and converts to uppercase.
 * @param {string} iban
 * @returns {string}
 */
function normalizeIBAN(iban) {
  return iban.replace(/\s+/g, '').toUpperCase();
}

/**
 * Formats an IBAN string by grouping into blocks of 4 characters.
 * @param {string} iban - Raw IBAN (may contain spaces).
 * @returns {string} - Formatted IBAN, e.g. "GB29 NWBK 6016 1331 9268 19"
 */
function formatIBAN(iban) {
  const normalized = normalizeIBAN(iban);
  return normalized.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Computes MOD-97 on a large numeric string using chunked arithmetic to avoid
 * JavaScript's integer precision limits.
 * @param {string} numericString - String of digits only.
 * @returns {number} - Remainder (0–96).
 */
function mod97(numericString) {
  let remainder = 0;
  for (let i = 0; i < numericString.length; i += 7) {
    const chunk = remainder + numericString.slice(i, i + 7);
    remainder = parseInt(chunk, 10) % 97;
  }
  return remainder;
}

/**
 * Converts an IBAN to the numeric string required by the MOD-97 algorithm.
 * Moves the first 4 characters to the end, then replaces each letter with
 * its numeric value (A=10, B=11, …, Z=35).
 * @param {string} normalizedIban - Uppercase, no-spaces IBAN.
 * @returns {string}
 */
function ibanToNumeric(normalizedIban) {
  const rearranged = normalizedIban.slice(4) + normalizedIban.slice(0, 4);
  return rearranged
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      // Letters A-Z → 10-35
      return code >= 65 && code <= 90 ? (code - 55).toString() : ch;
    })
    .join('');
}

/**
 * Validates an IBAN string and returns a detailed result object.
 *
 * @param {string} rawIban - The IBAN to validate (may have spaces, lowercase).
 * @returns {{
 *   valid: boolean,
 *   error: string|null,
 *   iban: string,
 *   formatted: string,
 *   countryCode: string,
 *   checkDigits: string,
 *   bban: string,
 *   countryInfo: object|null,
 *   bankCode: string|null,
 *   branchCode: string|null,
 *   accountNumber: string|null
 * }}
 */
function validateIBAN(rawIban) {
  const result = {
    valid: false,
    error: null,
    iban: '',
    formatted: '',
    countryCode: '',
    checkDigits: '',
    bban: '',
    countryInfo: null,
    bankCode: null,
    branchCode: null,
    accountNumber: null,
  };

  if (!rawIban || typeof rawIban !== 'string') {
    result.error = 'Please enter an IBAN.';
    return result;
  }

  const iban = normalizeIBAN(rawIban);

  if (iban.length < 4) {
    result.error = 'IBAN is too short.';
    return result;
  }

  result.iban = iban;
  result.formatted = formatIBAN(iban);
  result.countryCode = iban.slice(0, 2);
  result.checkDigits = iban.slice(2, 4);
  result.bban = iban.slice(4);

  // 1. Validate characters: IBAN must be alphanumeric only
  if (!/^[A-Z0-9]+$/.test(iban)) {
    result.error = 'IBAN must contain only letters and digits.';
    return result;
  }

  // 2. Check digits must be numeric
  if (!/^\d{2}$/.test(result.checkDigits)) {
    result.error = 'Check digits (characters 3–4) must be numeric.';
    return result;
  }

  // 3. Validate country code
  const countryInfo = IBAN_COUNTRIES[result.countryCode];
  if (!countryInfo) {
    result.error = `Unknown country code "${result.countryCode}". This country does not use IBAN or is not yet supported.`;
    return result;
  }

  result.countryInfo = countryInfo;

  // 4. Validate length
  if (iban.length !== countryInfo.length) {
    result.error = `Wrong length for country ${countryInfo.name} (${result.countryCode}) — expected ${countryInfo.length} characters, got ${iban.length}.`;
    return result;
  }

  // 5. Validate check digits via MOD-97
  const numericIban = ibanToNumeric(iban);
  if (mod97(numericIban) !== 1) {
    result.error = 'Invalid check digits — the IBAN failed the MOD-97 verification.';
    return result;
  }

  // 6. Extract bank code, branch code, account number from BBAN
  if (countryInfo.bankCode) {
    const { start, length } = countryInfo.bankCode;
    result.bankCode = result.bban.slice(start, start + length);
  }
  if (countryInfo.branchCode) {
    const { start, length } = countryInfo.branchCode;
    result.branchCode = result.bban.slice(start, start + length);
  }
  if (countryInfo.accountNumber) {
    const { start, length } = countryInfo.accountNumber;
    result.accountNumber = result.bban.slice(start, start + length);
  }

  result.valid = true;
  return result;
}

/**
 * Returns the flag emoji for a given 2-letter country code.
 * Uses Unicode regional indicator symbols (U+1F1E6 to U+1F1FF).
 * @param {string} countryCode - ISO 3166-1 alpha-2 code.
 * @returns {string} Flag emoji, e.g. "🇬🇧"
 */
function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  // XK (Kosovo) is not a standard ISO code, use a placeholder
  if (countryCode === 'XK') return '🇽🇰';
  const chars = countryCode
    .toUpperCase()
    .split('')
    .map((ch) => String.fromCodePoint(0x1f1e6 + ch.charCodeAt(0) - 65));
  return chars.join('');
}

// Export for use in other modules / Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeIBAN, formatIBAN, mod97, ibanToNumeric, validateIBAN, getFlagEmoji };
}
