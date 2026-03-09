/**
 * app.js
 * UI logic, event handlers, and DOM manipulation for the IBAN Validator.
 * Depends on: iban-data.js (IBAN_COUNTRIES, SAMPLE_IBANS) and validator.js.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     DOM references
  ───────────────────────────────────────────── */
  const ibanInput = document.getElementById('iban-input');
  const validateBtn = document.getElementById('validate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const exampleBtn = document.getElementById('example-btn');
  const resultSection = document.getElementById('result-section');
  const errorSection = document.getElementById('error-section');
  const errorMessage = document.getElementById('error-message');
  const copyBtn = document.getElementById('copy-btn');
  const printBtn = document.getElementById('print-btn');
  const charCounter = document.getElementById('char-counter');
  const inputWrapper = document.getElementById('input-wrapper');

  /* Result display fields */
  const resFormatted = document.getElementById('res-formatted');
  const resCountry = document.getElementById('res-country');
  const resCountryCode = document.getElementById('res-country-code');
  const resCheckDigits = document.getElementById('res-check-digits');
  const resBban = document.getElementById('res-bban');
  const resBankCode = document.getElementById('res-bank-code');
  const resBranchCode = document.getElementById('res-branch-code');
  const resAccountNumber = document.getElementById('res-account-number');
  const resLength = document.getElementById('res-length');

  /* Rows that are conditionally shown */
  const bankCodeRow = document.getElementById('bank-code-row');
  const branchCodeRow = document.getElementById('branch-code-row');
  const accountNumberRow = document.getElementById('account-number-row');

  /* ─────────────────────────────────────────────
     Helpers
  ───────────────────────────────────────────── */

  /**
   * Formats IBAN input in real-time as the user types.
   * Keeps cursor position after formatting.
   */
  function handleInput() {
    const raw = ibanInput.value.replace(/\s+/g, '').toUpperCase();
    const cursorPos = ibanInput.selectionStart;

    // Count non-space chars before cursor in old value
    const oldValue = ibanInput.value;
    const charsBeforeCursor = oldValue.slice(0, cursorPos).replace(/\s/g, '').length;

    // Format: groups of 4 separated by spaces
    const formatted = raw.replace(/(.{4})(?=.)/g, '$1 ');
    ibanInput.value = formatted;

    // Restore cursor: find position after charsBeforeCursor non-space chars
    let newCursor = 0;
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (formatted[i] !== ' ') count++;
      if (count === charsBeforeCursor) {
        newCursor = i + 1;
        break;
      }
    }
    ibanInput.setSelectionRange(newCursor, newCursor);

    // Update character counter (excluding spaces)
    const len = raw.length;
    charCounter.textContent = `${len} character${len !== 1 ? 's' : ''}`;

    // Clear result sections on new input
    hideResults();
    inputWrapper.classList.remove('input-valid', 'input-invalid');
  }

  /** Hides both result and error sections */
  function hideResults() {
    resultSection.classList.add('hidden');
    errorSection.classList.add('hidden');
  }

  /** Displays the error section with a given message */
  function showError(message) {
    hideResults();
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
    inputWrapper.classList.add('input-invalid');
    inputWrapper.classList.remove('input-valid');
    // Scroll to error
    errorSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /** Displays the success result card */
  function showResult(result) {
    hideResults();

    const { countryInfo, countryCode, formatted, checkDigits, bban, bankCode, branchCode, accountNumber, iban } = result;
    const flag = getFlagEmoji(countryCode);

    resFormatted.textContent = formatted;
    resCountry.textContent = `${flag} ${countryInfo.name}`;
    resCountryCode.textContent = countryCode;
    resCheckDigits.textContent = checkDigits;
    resBban.textContent = bban;
    resLength.textContent = `${iban.length} / ${countryInfo.length} (expected)`;

    // Bank code
    if (bankCode) {
      resBankCode.textContent = bankCode;
      bankCodeRow.classList.remove('hidden');
    } else {
      bankCodeRow.classList.add('hidden');
    }

    // Branch code
    if (branchCode) {
      resBranchCode.textContent = branchCode;
      branchCodeRow.classList.remove('hidden');
    } else {
      branchCodeRow.classList.add('hidden');
    }

    // Account number
    if (accountNumber) {
      resAccountNumber.textContent = accountNumber;
      accountNumberRow.classList.remove('hidden');
    } else {
      accountNumberRow.classList.add('hidden');
    }

    resultSection.classList.remove('hidden');
    inputWrapper.classList.add('input-valid');
    inputWrapper.classList.remove('input-invalid');

    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ─────────────────────────────────────────────
     Core actions
  ───────────────────────────────────────────── */

  /** Runs validation and updates the UI */
  function runValidation() {
    const raw = ibanInput.value.trim();
    if (!raw) {
      showError('Please enter an IBAN to validate.');
      return;
    }
    const result = validateIBAN(raw);
    if (result.valid) {
      showResult(result);
    } else {
      showError(result.error);
    }
  }

  /** Clears the form and resets all state */
  function clearForm() {
    ibanInput.value = '';
    charCounter.textContent = '0 characters';
    hideResults();
    inputWrapper.classList.remove('input-valid', 'input-invalid');
    ibanInput.focus();
  }

  /** Loads a random sample IBAN into the input */
  function loadExample() {
    const randomIndex = Math.floor(Math.random() * SAMPLE_IBANS.length);
    const sample = SAMPLE_IBANS[randomIndex];
    ibanInput.value = formatIBAN(sample);
    charCounter.textContent = `${sample.length} character${sample.length !== 1 ? 's' : ''}`;
    hideResults();
    inputWrapper.classList.remove('input-valid', 'input-invalid');
    ibanInput.focus();
  }

  /** Copies the formatted IBAN to the clipboard */
  function copyToClipboard() {
    const text = resFormatted.textContent;
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="btn-icon">✅</span> Copied!';
        copyBtn.disabled = true;
        setTimeout(() => {
          copyBtn.innerHTML = original;
          copyBtn.disabled = false;
        }, 2000);
      })
      .catch((_err) => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span class="btn-icon">✅</span> Copied!';
          copyBtn.disabled = true;
          setTimeout(() => {
            copyBtn.innerHTML = original;
            copyBtn.disabled = false;
          }, 2000);
        } catch (_) {
          alert('Could not copy to clipboard. Please copy manually: ' + text);
        }
        document.body.removeChild(textarea);
      });
  }

  /* ─────────────────────────────────────────────
     Event listeners
  ───────────────────────────────────────────── */

  ibanInput.addEventListener('input', handleInput);

  ibanInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runValidation();
    }
  });

  validateBtn.addEventListener('click', runValidation);
  clearBtn.addEventListener('click', clearForm);
  exampleBtn.addEventListener('click', loadExample);
  copyBtn.addEventListener('click', copyToClipboard);
  printBtn.addEventListener('click', () => window.print());

  /* ─────────────────────────────────────────────
     Keyboard accessibility: focus management
  ───────────────────────────────────────────── */

  // Allow closing error with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearForm();
    }
  });

  /* ─────────────────────────────────────────────
     Populate the examples section in the footer
  ───────────────────────────────────────────── */
  const examplesGrid = document.getElementById('examples-grid');
  if (examplesGrid) {
    // Show a curated set of diverse examples
    const showcased = ['DE', 'GB', 'FR', 'NL', 'ES', 'IT', 'CH', 'SE', 'NO', 'PL', 'AT', 'BE'];

    showcased.forEach((code) => {
      const country = IBAN_COUNTRIES[code];
      if (!country) return;
      const div = document.createElement('div');
      div.className = 'example-item';
      div.setAttribute('role', 'button');
      div.setAttribute('tabindex', '0');
      div.setAttribute('aria-label', `Load example IBAN for ${country.name}`);
      div.innerHTML = `
        <span class="example-flag">${getFlagEmoji(code)}</span>
        <span class="example-country">${country.name}</span>
        <code class="example-iban">${formatIBAN(country.example)}</code>
      `;

      const loadExample = () => {
        ibanInput.value = formatIBAN(country.example);
        const len = country.example.length;
        charCounter.textContent = `${len} character${len !== 1 ? 's' : ''}`;
        hideResults();
        inputWrapper.classList.remove('input-valid', 'input-invalid');
        ibanInput.focus();
        // Scroll to top / input
        ibanInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };

      div.addEventListener('click', loadExample);
      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadExample();
        }
      });

      examplesGrid.appendChild(div);
    });
  }

  /* ─────────────────────────────────────────────
     Initial focus
  ───────────────────────────────────────────── */
  ibanInput.focus();
})();
