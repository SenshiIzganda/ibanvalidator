/**
 * bank-data.js
 * Bank directory database mapping country code + bank code to bank details.
 * Used by validator.js to enrich IBAN validation results with BIC, bank name,
 * city, and SEPA support information.
 *
 * Structure:
 *   BANK_DATA[countryCode][bankCode] = {
 *     bic:  string,   // BIC/SWIFT code
 *     name: string,   // Full bank name
 *     city: string,   // City of the bank / branch
 *     zip:  string,   // Postal code (optional, '' if unknown)
 *     sepa: {
 *       sct:  boolean, // SEPA Credit Transfer
 *       sdd:  boolean, // SEPA Direct Debit
 *       b2b:  boolean, // SEPA B2B Direct Debit
 *       inst: boolean, // SEPA Instant Credit Transfer
 *     }
 *   }
 *
 * Note: Bank code formats vary by country.  For each country we use the same
 * slice that validator.js extracts via countryInfo.bankCode.
 */

const BANK_DATA = {

  /* ──────────────────────────────────────────────────────────────────────────
     GERMANY (DE)  —  8-digit Bankleitzahl (BLZ)
  ─────────────────────────────────────────────────────────────────────────── */
  DE: {
    '10000000': { bic: 'MARKDEF1100', name: 'Bundesbank', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: true,  inst: false } },
    '10010010': { bic: 'PBNKDEFFXXX', name: 'Postbank', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10020000': { bic: 'BFSWDE33BER', name: 'Bank für Sozialwirtschaft', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '10020890': { bic: 'BEVODEBBXXX', name: 'Berliner Volksbank', city: 'Berlin', zip: '10243', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10040000': { bic: 'COBADEFFXXX', name: 'Commerzbank', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10050000': { bic: 'BELADEBEXXX', name: 'Landesbank Berlin — Berliner Sparkasse', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10070000': { bic: 'DEUTDEBBXXX', name: 'Deutsche Bank', city: 'Berlin', zip: '10117', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10090000': { bic: 'BEVODEBB',    name: 'Berliner Volksbank', city: 'Berlin', zip: '10243', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20030000': { bic: 'HYVEDEMM488', name: 'UniCredit Bank — HypoVereinsbank', city: 'Hamburg', zip: '20095', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20040000': { bic: 'COBADEHHXXX', name: 'Commerzbank', city: 'Hamburg', zip: '20095', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20050550': { bic: 'HASPDEHHXXX', name: 'Hamburger Sparkasse', city: 'Hamburg', zip: '20457', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20070000': { bic: 'DEUTDEHHXXX', name: 'Deutsche Bank', city: 'Hamburg', zip: '20095', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20090700': { bic: 'GENODEF1HH2', name: 'Volksbank Hamburg Ost-West', city: 'Hamburg', zip: '22087', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '25050180': { bic: 'SPKHDE2HXXX', name: 'Stadtsparkasse Hannover', city: 'Hannover', zip: '30159', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30040000': { bic: 'COBADEDDXXX', name: 'Commerzbank', city: 'Düsseldorf', zip: '40213', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '37040044': { bic: 'COBADEFFXXX', name: 'Commerzbank', city: 'Köln', zip: '50667', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '37070024': { bic: 'DEUTDEDBKOE', name: 'Deutsche Bank', city: 'Köln', zip: '50667', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '37070060': { bic: 'DEUTDEDBXXX', name: 'Deutsche Bank', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '43060967': { bic: 'GENODEM1GLS', name: 'GLS Gemeinschaftsbank', city: 'Bochum', zip: '44787', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '50010060': { bic: 'PBNKDEFFXXX', name: 'Postbank', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50020200': { bic: 'BHFBDEFF500', name: 'BHF-BANK', city: 'Frankfurt am Main', zip: '60323', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '50031900': { bic: 'BBVADEFFXXX', name: 'BANCO BILBAO VIZCAYA ARGENTARIA, Niederlassung Deutschland', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '50040000': { bic: 'COBADEFFXXX', name: 'Commerzbank', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50050201': { bic: 'SSKMDEMM',    name: 'Sparkasse KölnBonn', city: 'Köln', zip: '50667', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50060400': { bic: 'GENODEFSXXX', name: 'DZ BANK AG', city: 'Frankfurt am Main', zip: '60265', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50070010': { bic: 'DEUTDEFFXXX', name: 'Deutsche Bank', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50080000': { bic: 'DRESDEFFXXX', name: 'Commerzbank (ehem. Dresdner Bank)', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50089400': { bic: 'HYVEDEMMXXX', name: 'UniCredit Bank — HypoVereinsbank', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50120383': { bic: 'DELBDE33XXX', name: 'Degussa Bank', city: 'Frankfurt am Main', zip: '60488', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '50130400': { bic: 'ICBKDEHHFRA', name: 'Industrial and Commercial Bank of China', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '50190000': { bic: 'FFVBDEFI',    name: 'Frankfurter Volksbank', city: 'Frankfurt am Main', zip: '60486', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '50320191': { bic: 'WIBADEFF',    name: 'SEB AG (Skandinaviska Enskilda Banken)', city: 'Frankfurt am Main', zip: '60528', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '50324000': { bic: 'SOGEDEFFXXX', name: 'Société Générale S.A. Zweigniederlassung Frankfurt', city: 'Frankfurt am Main', zip: '60311', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '51210800': { bic: 'NASSDE55XXX', name: 'Nassauische Sparkasse', city: 'Wiesbaden', zip: '65185', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '60050101': { bic: 'STUTTDE6AXXX', name: 'Baden-Württembergische Bank', city: 'Stuttgart', zip: '70173', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '60070070': { bic: 'DEUTDEDBSXX', name: 'Deutsche Bank', city: 'Stuttgart', zip: '70173', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '63070024': { bic: 'DEUTDEDB630', name: 'Deutsche Bank', city: 'Augsburg', zip: '86150', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '70020270': { bic: 'HYVEDEMMXXX', name: 'UniCredit Bank — HypoVereinsbank', city: 'München', zip: '80333', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '70040041': { bic: 'COBADEMMXXX', name: 'Commerzbank', city: 'München', zip: '80333', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '70050000': { bic: 'SSKMDEMMXXX', name: 'Stadtsparkasse München', city: 'München', zip: '80333', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '70070010': { bic: 'DEUTDEMM',    name: 'Deutsche Bank', city: 'München', zip: '80333', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '70090500': { bic: 'GENODEF1M01', name: 'Sparda-Bank München', city: 'München', zip: '80335', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '75020073': { bic: 'HYVEDEMMXXX', name: 'UniCredit Bank — HypoVereinsbank', city: 'Nürnberg', zip: '90403', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '76050101': { bic: 'SSKNDE77XXX', name: 'Sparkasse Nürnberg', city: 'Nürnberg', zip: '90403', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '76090500': { bic: 'GENODEF1N02', name: 'Sparda-Bank Nürnberg', city: 'Nürnberg', zip: '90402', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '85070000': { bic: 'DEUTDE8DXXX', name: 'Deutsche Bank', city: 'Dresden', zip: '01097', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '86050200': { bic: 'OSDDDE81XXX', name: 'Ostsächsische Sparkasse Dresden', city: 'Dresden', zip: '01097', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30030880': { bic: 'TUBDDEDDXXX', name: 'TARGOBANK AG', city: 'Düsseldorf', zip: '40213', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '20041111': { bic: 'COBADEFFXXX', name: 'Commerzbank Hamburg', city: 'Hamburg', zip: '20095', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '16050000': { bic: 'WELADED1PMB', name: 'Mittelbrandenburgische Sparkasse', city: 'Potsdam', zip: '14467', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     UNITED KINGDOM (GB)  —  4-letter institution code from BBAN
     GB IBAN bankCode = first 4 chars of BBAN (sort code begins at char 4)
  ─────────────────────────────────────────────────────────────────────────── */
  GB: {
    'NWBK': { bic: 'NWBKGB2LXXX', name: 'NatWest Bank plc', city: 'London', zip: 'EC2V 8RF', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'LOYD': { bic: 'LOYDGB2LXXX', name: 'Lloyds Bank plc', city: 'London', zip: 'EC2V 8AT', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'BARC': { bic: 'BARCGB22XXX', name: 'Barclays Bank plc', city: 'London', zip: 'E14 5HP', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'HBUK': { bic: 'HBUKGB4BXXX', name: 'HSBC Bank plc', city: 'London', zip: 'E14 5HQ', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'HSBC': { bic: 'HBUKGB4BXXX', name: 'HSBC Bank plc', city: 'London', zip: 'E14 5HQ', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'RBOS': { bic: 'RBOSGB2LXXX', name: 'Royal Bank of Scotland plc', city: 'Edinburgh', zip: 'EH12 1HQ', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'SORT': { bic: 'SRLGGB2LXXX', name: 'Starling Bank', city: 'London', zip: 'EC2A 3AX', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'MONZ': { bic: 'MONZGB2LXXX', name: 'Monzo Bank Ltd', city: 'London', zip: 'E1 6RF', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'BUKB': { bic: 'BUKBGB22XXX', name: 'Barclays Bank UK plc', city: 'London', zip: 'E14 5HP', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'MIDL': { bic: 'MIDLGB22XXX', name: 'HSBC UK Bank plc (formerly Midland Bank)', city: 'London', zip: 'E14 5HQ', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'REVO': { bic: 'REVOGB21XXX', name: 'Revolut Bank UAB (UK Branch)', city: 'London', zip: 'EC2V 7NQ', sepa: { sct: true,  sdd: false, b2b: false, inst: true  } },
    'CLRB': { bic: 'CLRBGB22XXX', name: 'ClearBank Ltd', city: 'London', zip: 'EC2A 3AX', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'INGB': { bic: 'INGBGB2LXXX', name: 'ING Bank N.V. London Branch', city: 'London', zip: 'EC2V 8EE', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    'SRLG': { bic: 'SRLGGB2LXXX', name: 'Starling Bank', city: 'London', zip: 'EC2A 3AX', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'CPBK': { bic: 'CPBKGB22XXX', name: 'Co-operative Bank plc', city: 'Manchester', zip: 'M60 4EP', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'SAND': { bic: 'SANDGB22XXX', name: 'Santander UK plc', city: 'Milton Keynes', zip: 'MK9 2HT', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'HLFX': { bic: 'HLFXGB21XXX', name: 'Halifax plc (Bank of Scotland)', city: 'Halifax', zip: 'HX1 2RG', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     FRANCE (FR)  —  5-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  FR: {
    '10096': { bic: 'BNPAFRPPXXX', name: 'BNP Paribas', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '11706': { bic: 'AGRIFRPPXXX', name: 'Crédit Agricole', city: 'Paris', zip: '75008', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '13807': { bic: 'SOGEFRPPXXX', name: 'Société Générale', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '17569': { bic: 'CEPAFRPP751', name: 'Caisse d\'Épargne de Paris', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '15589': { bic: 'CMCIFRPPXXX', name: 'Crédit Mutuel', city: 'Strasbourg', zip: '67000', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10278': { bic: 'BNPAFRPP',    name: 'BNP Paribas', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '14508': { bic: 'CCBPFRPPXXX', name: 'Banque Populaire', city: 'Paris', zip: '75008', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '10011': { bic: 'BDFEFRPPXXX', name: 'Banque de France', city: 'Paris', zip: '75001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '11315': { bic: 'LCHLFRPPXXX', name: 'LCL (Le Crédit Lyonnais)', city: 'Lyon', zip: '69003', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '12548': { bic: 'BREDFRPPXXX', name: 'BRED Banque Populaire', city: 'Paris', zip: '75012', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30003': { bic: 'SOGEFRPPXXX', name: 'Société Générale', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30004': { bic: 'BNPAFRPPXXX', name: 'BNP Paribas', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30006': { bic: 'AGRIFRPPXXX', name: 'Crédit Agricole', city: 'Paris', zip: '75008', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30007': { bic: 'LCHLFRPPXXX', name: 'LCL', city: 'Lyon', zip: '69003', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30056': { bic: 'CEPAFR21XXX', name: 'Caisse d\'Épargne', city: 'Paris', zip: '75009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30076': { bic: 'CMCIFRPPXXX', name: 'Crédit Mutuel', city: 'Strasbourg', zip: '67000', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30087': { bic: 'CCBPFRPPXXX', name: 'Banque Populaire', city: 'Paris', zip: '75008', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '30788': { bic: 'REVOFRP2XXX', name: 'Revolut Bank UAB (France)', city: 'Paris', zip: '75008', sepa: { sct: true,  sdd: false, b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     NETHERLANDS (NL)  —  4-letter institution code from BBAN
  ─────────────────────────────────────────────────────────────────────────── */
  NL: {
    'ABNA': { bic: 'ABNANL2AXXX', name: 'ABN AMRO Bank N.V.', city: 'Amsterdam', zip: '1082 PP', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'INGB': { bic: 'INGBNL2AXXX', name: 'ING Bank N.V.', city: 'Amsterdam', zip: '1102 MG', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'RABO': { bic: 'RABONL2UXXX', name: 'Coöperatieve Rabobank U.A.', city: 'Utrecht', zip: '3521 CB', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'SNSB': { bic: 'SNSBNL2AXXX', name: 'SNS Bank N.V.', city: 'Utrecht', zip: '3521 AT', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'TRIO': { bic: 'TRIONL2UXXX', name: 'Triodos Bank N.V.', city: 'Zeist', zip: '3703 CD', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'ASNB': { bic: 'ASNBNL21XXX', name: 'ASN Bank (de Volksbank)', city: 'Den Haag', zip: '2521 CC', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'BUNQ': { bic: 'BUNQNL2AXXX', name: 'bunq B.V.', city: 'Amsterdam', zip: '1011 NT', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'KNAB': { bic: 'KNABNL2HXXX', name: 'Knab', city: 'Amsterdam', zip: '1102 MG', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'REVO': { bic: 'REVOLT21XXX', name: 'Revolut Bank UAB (NL Branch)', city: 'Amsterdam', zip: '1012 ZX', sepa: { sct: true,  sdd: false, b2b: false, inst: true  } },
    'NNBA': { bic: 'NNBANL2GXXX', name: 'NN Bank N.V.', city: 'Den Haag', zip: '2595 BV', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'FRBK': { bic: 'FRBKNL2LXXX', name: 'Friesland Bank (merged into Rabobank)', city: 'Leeuwarden', zip: '8911 PV', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'DEUT': { bic: 'DEUTNL2AXXX', name: 'Deutsche Bank AG Amsterdam Branch', city: 'Amsterdam', zip: '1082 PP', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     SPAIN (ES)  —  4-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  ES: {
    '0049': { bic: 'BSCHESMMXXX', name: 'Banco Santander S.A.', city: 'Madrid', zip: '28010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0182': { bic: 'BBVAESMMXXX', name: 'Banco Bilbao Vizcaya Argentaria S.A. (BBVA)', city: 'Bilbao', zip: '48009', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '2100': { bic: 'CAIXESBBXXX', name: 'CaixaBank S.A.', city: 'Barcelona', zip: '08002', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0081': { bic: 'BSABESBBXXX', name: 'Banco de Sabadell S.A.', city: 'Sabadell', zip: '08201', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0238': { bic: 'BANKESMMXXX', name: 'Bankinter S.A.', city: 'Madrid', zip: '28010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0073': { bic: 'OPENESMMXXX', name: 'Openbank S.A. (Santander Group)', city: 'Madrid', zip: '28010', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '0487': { bic: 'DEUTESMMXXX', name: 'Deutsche Bank S.A.E.', city: 'Madrid', zip: '28007', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '0128': { bic: 'BKBKESMMXXX', name: 'Bankoa S.A.', city: 'San Sebastián', zip: '20011', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '0030': { bic: 'BNPAESMMXXX', name: 'BNP Paribas España', city: 'Madrid', zip: '28046', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '1491': { bic: 'TRPIESMMXXX', name: 'Triodos Bank N.V. España', city: 'Madrid', zip: '28006', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '0019': { bic: 'DEUTESMMXXX', name: 'Deutsche Bank S.A.E.', city: 'Madrid', zip: '28007', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '2038': { bic: 'BMARES2MXXX', name: 'Bankia (now CaixaBank)', city: 'Valencia', zip: '46003', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '2048': { bic: 'CAHMESMMXXX', name: 'Caixabank (CajaAstur)', city: 'Oviedo', zip: '33007', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '3025': { bic: 'CLPEES2MXXX', name: 'Caixa Popular — Caixa Rural, S. Coop. de Crédito V.', city: 'Valencia', zip: '46001', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     ITALY (IT)  —  1-letter + 5-digit bank code (ABI code, chars 1–5 of BBAN)
     The IT IBAN bankCode in iban-data.js starts at position 1 length 5
  ─────────────────────────────────────────────────────────────────────────── */
  IT: {
    '02008': { bic: 'UNCRITMMXXX', name: 'UniCredit S.p.A.', city: 'Milan', zip: '20154', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '03069': { bic: 'BCITITMXXXX', name: 'Intesa Sanpaolo S.p.A.', city: 'Turin', zip: '10121', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '05034': { bic: 'BMPSITMMXXX', name: 'Banca Monte dei Paschi di Siena S.p.A.', city: 'Siena', zip: '53100', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '06270': { bic: 'IBSPITNA',    name: 'Banca Popolare di Milano', city: 'Milan', zip: '20121', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '03111': { bic: 'CRPPIT2PXXX', name: 'Cassa di Risparmio di Parma e Piacenza', city: 'Parma', zip: '43121', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '01030': { bic: 'DEUTITMIXXX', name: 'Deutsche Bank S.p.A.', city: 'Milan', zip: '20121', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '05385': { bic: 'BNLIITRR',    name: 'Banca Nazionale del Lavoro S.p.A. (BNL, BNP Paribas)', city: 'Rome', zip: '00187', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '03127': { bic: 'BLOPIT22XXX', name: 'UBI Banca (now Intesa Sanpaolo)', city: 'Bergamo', zip: '24122', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '07601': { bic: 'UNCRITMMORV', name: 'Fineco Bank S.p.A.', city: 'Milan', zip: '20154', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '03599': { bic: 'MIEUITMMXXX', name: 'Mediobanca S.p.A.', city: 'Milan', zip: '20121', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     SWITZERLAND (CH)  —  5-digit clearing number
  ─────────────────────────────────────────────────────────────────────────── */
  CH: {
    '00230': { bic: 'UBSWCHZH80A', name: 'UBS Switzerland AG', city: 'Zürich', zip: '8001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00234': { bic: 'UBSWCHZH80A', name: 'UBS Switzerland AG (Lugano)', city: 'Lugano', zip: '6900', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00480': { bic: 'CRESCHZZ80A', name: 'Credit Suisse (Switzerland) Ltd', city: 'Zürich', zip: '8070', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00762': { bic: 'ZKBKCHZZ80A', name: 'Zürcher Kantonalbank', city: 'Zürich', zip: '8010', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00765': { bic: 'ZKBKCHZZ80A', name: 'Zürcher Kantonalbank', city: 'Zürich', zip: '8010', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '07763': { bic: 'RAIFCH22XXX', name: 'Raiffeisen Schweiz', city: 'St. Gallen', zip: '9001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '09000': { bic: 'POFICHBEXXX', name: 'PostFinance AG', city: 'Bern', zip: '3030', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00892': { bic: 'VALOCHZZXXX', name: 'Banque Cantonale Vaudoise', city: 'Lausanne', zip: '1001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00686': { bic: 'BCGECHGGXXX', name: 'Banque Cantonale de Genève', city: 'Genève', zip: '1211', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00774': { bic: 'SAUKCHZZ80A', name: 'Bank Julius Bär & Co. AG', city: 'Zürich', zip: '8010', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '00271': { bic: 'KBSGCH22XXX', name: 'St. Gallische Kantonalbank', city: 'St. Gallen', zip: '9001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     AUSTRIA (AT)  —  5-digit Bankleitzahl
  ─────────────────────────────────────────────────────────────────────────── */
  AT: {
    '12000': { bic: 'BKAUATWWXXX', name: 'UniCredit Bank Austria AG', city: 'Wien', zip: '1010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20111': { bic: 'GIBAATWWXXX', name: 'Erste Bank der oesterreichischen Sparkassen AG', city: 'Wien', zip: '1100', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '32000': { bic: 'RLNWATWWXXX', name: 'Raiffeisen Landesbank Niederösterreich-Wien AG', city: 'Wien', zip: '1020', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '14000': { bic: 'BAWAATWWXXX', name: 'BAWAG P.S.K.', city: 'Wien', zip: '1010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '18190': { bic: 'BFKKATWWXXX', name: 'Österreichische Kontrollbank AG', city: 'Wien', zip: '1011', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '19190': { bic: 'OENBATWWXXX', name: 'Oesterreichische Nationalbank', city: 'Wien', zip: '1090', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '38000': { bic: 'RZOOAT2LXXX', name: 'Raiffeisenlandesbank Oberösterreich', city: 'Linz', zip: '4010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '20815': { bic: 'STSPAT2GXXX', name: 'Steiermärkische Bank und Sparkassen AG', city: 'Graz', zip: '8010', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '55000': { bic: 'RZBAATWWXXX', name: 'Raiffeisen Bank International AG', city: 'Wien', zip: '1030', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '16000': { bic: 'HYPNATWWXXX', name: 'Hypo Vorarlberg Bank AG', city: 'Bregenz', zip: '6900', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     BELGIUM (BE)  —  3-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  BE: {
    '539': { bic: 'GEBABEBB',    name: 'BNP Paribas Fortis', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '363': { bic: 'NICABEBB',    name: 'ING België NV/SA', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '734': { bic: 'KREDBEBB',    name: 'KBC Bank NV', city: 'Bruxelles', zip: '1080', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '068': { bic: 'BBRUBEBB',    name: 'Belfius Bank NV/SA', city: 'Bruxelles', zip: '1210', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '645': { bic: 'TRIOBEBB',    name: 'Triodos Bank NV', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '979': { bic: 'AXABEBB',     name: 'AXA Bank Europe', city: 'Bruxelles', zip: '1170', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '046': { bic: 'DEUTBEBB',    name: 'Deutsche Bank NV', city: 'Bruxelles', zip: '1040', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '523': { bic: 'ABNABE2A',    name: 'ABN AMRO Bank NV', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '001': { bic: 'BPOTBEB1',    name: 'bpost bank', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '777': { bic: 'NICABEBB',    name: 'ING Bank NV (Record Bank)', city: 'Bruxelles', zip: '1000', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     POLAND (PL)  —  3-digit bank code (first 3 digits of NBP clearing number)
  ─────────────────────────────────────────────────────────────────────────── */
  PL: {
    '102': { bic: 'BPKOPLPWXXX', name: 'PKO Bank Polski S.A.', city: 'Warszawa', zip: '00-950', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '114': { bic: 'MRELPLPWXXX', name: 'mBank S.A.', city: 'Warszawa', zip: '00-850', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '105': { bic: 'INGBPLPWXXX', name: 'ING Bank Śląski S.A.', city: 'Katowice', zip: '40-086', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '109': { bic: 'WBKPPLPPXXX', name: 'Santander Bank Polska S.A.', city: 'Wrocław', zip: '50-950', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '154': { bic: 'CITIPLPXXXX', name: 'Bank Handlowy w Warszawie S.A. (Citibank)', city: 'Warszawa', zip: '00-923', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '103': { bic: 'PKOPPLPWXXX', name: 'Bank Pekao S.A.', city: 'Warszawa', zip: '00-844', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '116': { bic: 'PPABPLPKXXX', name: 'BNP Paribas Bank Polska S.A.', city: 'Warszawa', zip: '00-380', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '124': { bic: 'DEUTPLPKXXX', name: 'Deutsche Bank Polska S.A.', city: 'Warszawa', zip: '00-124', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '175': { bic: 'RCBWPLPWXXX', name: 'Raiffeisen Bank Polska S.A.', city: 'Warszawa', zip: '00-120', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '194': { bic: 'GBGCPLPKXXX', name: 'Getin Bank S.A.', city: 'Wrocław', zip: '50-950', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     SWEDEN (SE)  —  3-digit clearing code from BBAN
  ─────────────────────────────────────────────────────────────────────────── */
  SE: {
    '500': { bic: 'ESSESESSXXX', name: 'SEB (Skandinaviska Enskilda Banken)', city: 'Stockholm', zip: '106 40', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '600': { bic: 'HANDSESSXXX', name: 'Handelsbanken', city: 'Stockholm', zip: '106 70', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '800': { bic: 'SWEDSESSXXX', name: 'Swedbank', city: 'Stockholm', zip: '105 34', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '300': { bic: 'NDEASESSXXX', name: 'Nordea Bank AB', city: 'Solna', zip: '169 79', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '120': { bic: 'DABASESX',    name: 'Danske Bank', city: 'Stockholm', zip: '102 20', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '550': { bic: 'ESSESESSXXX', name: 'SEB (Skandinaviska Enskilda Banken)', city: 'Stockholm', zip: '106 40', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '900': { bic: 'ICIASESSKNA', name: 'Ikano Bank', city: 'Malmö', zip: '200 71', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     NORWAY (NO)  —  4-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  NO: {
    '8601': { bic: 'DNBANOKK',   name: 'DNB Bank ASA', city: 'Oslo', zip: '0191', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '1503': { bic: 'DNBANOKK',   name: 'DNB Bank ASA', city: 'Oslo', zip: '0191', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '3000': { bic: 'SPAYNOKK',   name: 'SpareBank 1 SR-Bank', city: 'Stavanger', zip: '4001', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '7874': { bic: 'NDEANOKKXXX', name: 'Nordea Bank Abp, filial i Norge', city: 'Oslo', zip: '0401', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '1608': { bic: 'HANDNOKK',   name: 'Handelsbanken', city: 'Oslo', zip: '0191', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
    '9364': { bic: 'SKAGNO22XXX', name: 'Skagerrak Sparebank', city: 'Notodden', zip: '3670', sepa: { sct: true,  sdd: false, b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     DENMARK (DK)  —  4-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  DK: {
    '0040': { bic: 'DABADKKK',   name: 'Danske Bank', city: 'Copenhagen', zip: '0900', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '0982': { bic: 'NDEADKKKXXX', name: 'Nordea Danmark', city: 'Copenhagen', zip: '2300', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '6607': { bic: 'JYBADKKKXXX', name: 'Jyske Bank', city: 'Silkeborg', zip: '8600', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '7858': { bic: 'NSJBDKKKXXX', name: 'Nykredit Bank A/S', city: 'Copenhagen', zip: '0900', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '3000': { bic: 'SYBKDKKKXXX', name: 'Sydbank A/S', city: 'Aabenraa', zip: '6200', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     PORTUGAL (PT)  —  4-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  PT: {
    '0033': { bic: 'BCOMPTPLXXX', name: 'Millennium bcp', city: 'Lisboa', zip: '1050-022', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0035': { bic: 'CGDIPTPLXXX', name: 'Caixa Geral de Depósitos', city: 'Lisboa', zip: '1000-201', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0018': { bic: 'TOTAPTPLXXX', name: 'Santander Totta', city: 'Lisboa', zip: '1100-060', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0007': { bic: 'BESCPTPLXXX', name: 'Novo Banco (formerly Banco Espírito Santo)', city: 'Lisboa', zip: '1269-173', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '0036': { bic: 'MPIOPTPLXXX', name: 'Banco BPI S.A.', city: 'Porto', zip: '4100-127', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '0046': { bic: 'ACTVPTPLXXX', name: 'Activobank', city: 'Lisboa', zip: '1050-133', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     LUXEMBOURG (LU)  —  3-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  LU: {
    '001': { bic: 'BGLLLULLXXX', name: 'BGL BNP Paribas', city: 'Luxembourg', zip: 'L-1736', sepa: { sct: true,  sdd: true,  b2b: true,  inst: false } },
    '002': { bic: 'BCEELULLXXX', name: 'Banque et Caisse d\'Epargne de l\'Etat', city: 'Luxembourg', zip: 'L-1930', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '019': { bic: 'BSCHLU22XXX', name: 'Banco Santander Intl Europe', city: 'Luxembourg', zip: 'L-2453', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '003': { bic: 'BILLLULLXXX', name: 'Banque Internationale à Luxembourg', city: 'Luxembourg', zip: 'L-2953', sepa: { sct: true,  sdd: true,  b2b: true,  inst: false } },
    '130': { bic: 'BNLILULL',   name: 'ING Luxembourg', city: 'Luxembourg', zip: 'L-2965', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     FINLAND (FI)  —  3-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  FI: {
    '123': { bic: 'NDEAFIHH',   name: 'Nordea Bank Finland', city: 'Helsinki', zip: '00020', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '157': { bic: 'OKOYFIHH',   name: 'OP Financial Group', city: 'Helsinki', zip: '00013', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    '800': { bic: 'DABAFIHH',   name: 'Danske Bank', city: 'Helsinki', zip: '00020', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '310': { bic: 'HANDFIHH',   name: 'Handelsbanken Finland', city: 'Helsinki', zip: '00130', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '405': { bic: 'ITELFIHH',   name: 'Aktia Bank plc', city: 'Helsinki', zip: '00130', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     CZECH REPUBLIC (CZ)  —  4-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  CZ: {
    '0800': { bic: 'GIBACZPX',   name: 'Česká spořitelna a.s.', city: 'Praha', zip: '140 00', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '0300': { bic: 'CEKOCZPP',   name: 'Československá obchodní banka a.s. (ČSOB)', city: 'Praha', zip: '150 00', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '0600': { bic: 'AGBACZPP',   name: 'GE Money Bank (now Moneta Money Bank)', city: 'Praha', zip: '140 00', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '2010': { bic: 'FIOBCZPP',   name: 'Fio banka a.s.', city: 'Praha', zip: '120 00', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '3030': { bic: 'AIRACZPP',   name: 'Air Bank a.s.', city: 'Praha', zip: '190 00', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '0100': { bic: 'KOMBCZPP',   name: 'Komerční banka a.s.', city: 'Praha', zip: '114 07', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     HUNGARY (HU)  —  3-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  HU: {
    '117': { bic: 'OTPVHUHB',   name: 'OTP Bank Nyrt.', city: 'Budapest', zip: '1051', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '104': { bic: 'BUDAHUHB',   name: 'Budapest Bank Zrt.', city: 'Budapest', zip: '1138', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '116': { bic: 'GIBAHUHB',   name: 'Erste Bank Hungary Zrt.', city: 'Budapest', zip: '1138', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '120': { bic: 'UBRTHUHB',   name: 'Raiffeisen Bank Zrt.', city: 'Budapest', zip: '1054', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     GREECE (GR)  —  3-digit bank code
  ─────────────────────────────────────────────────────────────────────────── */
  GR: {
    '011': { bic: 'ETHNGRAA',   name: 'National Bank of Greece', city: 'Athens', zip: '10232', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    '014': { bic: 'PIRBGRAA',   name: 'Piraeus Bank', city: 'Athens', zip: '10559', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '026': { bic: 'ALPHABGRAXXX', name: 'Alpha Bank', city: 'Athens', zip: '10251', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '017': { bic: 'EFGBGRAA',   name: 'Eurobank Ergasias', city: 'Athens', zip: '10557', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    '040': { bic: 'BPKIGRAA',   name: 'Pancreta Bank', city: 'Heraklion', zip: '71201', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     IRELAND (IE)  —  4-letter institution code
  ─────────────────────────────────────────────────────────────────────────── */
  IE: {
    'AIBK': { bic: 'AIBKIE2DXXX', name: 'AIB (Allied Irish Banks plc)', city: 'Dublin', zip: 'D02 A342', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'BOFI': { bic: 'BOFIIE2DXXX', name: 'Bank of Ireland', city: 'Dublin', zip: 'D2', sepa: { sct: true,  sdd: true,  b2b: true,  inst: true  } },
    'ULSB': { bic: 'ULSBIE2DXXX', name: 'Ulster Bank Ireland DAC', city: 'Dublin', zip: 'D1', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'IPBS': { bic: 'IPBSIE2DXXX', name: 'Permanent TSB plc', city: 'Dublin', zip: 'D2', sepa: { sct: true,  sdd: true,  b2b: false, inst: false } },
    'REVO': { bic: 'REVOLT21XXX', name: 'Revolut Bank UAB (Ireland Branch)', city: 'Dublin', zip: 'D1', sepa: { sct: true,  sdd: false, b2b: false, inst: true  } },
  },

  /* ──────────────────────────────────────────────────────────────────────────
     ROMANIA (RO)  —  4-letter institution code
  ─────────────────────────────────────────────────────────────────────────── */
  RO: {
    'RNCB': { bic: 'RNCBROBUMED', name: 'Banca Comercială Română (BCR / Erste)', city: 'București', zip: '010231', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'BREL': { bic: 'BRDE360SV01', name: 'BRD — Groupe Société Générale', city: 'București', zip: '010494', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'BTRL': { bic: 'BTRLRO22XXX', name: 'Banca Transilvania', city: 'Cluj-Napoca', zip: '400394', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'INGB': { bic: 'INGBROBU',   name: 'ING Bank Romania', city: 'București', zip: '010231', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
    'RZBR': { bic: 'RZBRROBU',   name: 'Raiffeisen Bank S.A.', city: 'București', zip: '010221', sepa: { sct: true,  sdd: true,  b2b: false, inst: true  } },
  },
};

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BANK_DATA };
}
