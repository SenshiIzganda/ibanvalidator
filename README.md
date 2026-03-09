# 🏦 IBAN Validator

A complete, modern IBAN (International Bank Account Number) info validator website built with plain HTML, CSS, and JavaScript — no frameworks or build tools required.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge)](https://senshiizganda.github.io/ibanvalidator/)

## Features

- ✅ **IBAN Validation** — format, length, and MOD-97 check digit verification (ISO 13616)
- 🌍 **77 countries** supported
- 🔍 **Info extraction** — country name & flag, check digits, BBAN, bank code, branch code, account number
- 📋 **Copy to clipboard** — one-click copy of the formatted IBAN
- 🎲 **Random examples** — load a real IBAN example from any supported country
- 📱 **Responsive** — works on desktop, tablet, and mobile
- ♿ **Accessible** — proper ARIA labels, keyboard navigation, focus states
- 🖨️ **Print-friendly** — clean print layout
- 🚀 **Zero dependencies** — pure HTML5, CSS3, JavaScript (ES6+)

## Project Structure

```
index.html          — Main HTML page (single-page application)
css/
  styles.css        — All styles (responsive, fintech-inspired design)
js/
  iban-data.js      — Country IBAN specifications database (77 countries)
  validator.js      — IBAN validation logic (MOD-97, format checks)
  app.js            — UI logic, event handlers, DOM manipulation
README.md           — This file
```

## Usage

Simply open `index.html` in any modern browser — no build step required.

```bash
# Clone the repo
git clone https://github.com/SenshiIzganda/ibanvalidator.git
cd ibanvalidator

# Open in your browser (macOS)
open index.html

# Open in your browser (Linux)
xdg-open index.html

# Open in your browser (Windows)
start index.html
```

## How IBAN Validation Works

1. **Normalize** — strip spaces, convert to uppercase
2. **Country check** — verify the 2-letter country code is in the database
3. **Length check** — verify the total length matches the country's expected length
4. **Character check** — verify all characters are alphanumeric (A–Z, 0–9)
5. **MOD-97** — rearrange (move first 4 chars to end), convert letters to numbers (A=10…Z=35), compute modulo 97; result must equal 1

## Deploying to GitHub Pages

1. Go to your repository **Settings → Pages**
2. Under **Source**, select the branch containing `index.html` (e.g. `main`)
3. Set the folder to `/ (root)`
4. Click **Save** — your site will be live at `https://<username>.github.io/ibanvalidator/`

## Supported Countries

Albania, Andorra, Austria, Azerbaijan, Bahrain, Belarus, Belgium, Bosnia and Herzegovina, Brazil, Bulgaria, Costa Rica, Croatia, Cyprus, Czech Republic, Denmark, Dominican Republic, East Timor, El Salvador, Estonia, Faroe Islands, Finland, France, Georgia, Germany, Gibraltar, Greece, Greenland, Guatemala, Hungary, Iceland, Iraq, Ireland, Israel, Italy, Jordan, Kazakhstan, Kosovo, Kuwait, Latvia, Lebanon, Libya, Liechtenstein, Lithuania, Luxembourg, Malta, Mauritania, Mauritius, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Pakistan, Palestinian Territory, Poland, Portugal, Qatar, Romania, Saint Lucia, San Marino, São Tomé and Príncipe, Saudi Arabia, Seychelles, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Tunisia, Turkey, Ukraine, United Arab Emirates, United Kingdom, Vatican City, Virgin Islands (British)

## License

[MIT](LICENSE)
