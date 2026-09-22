export const company = {
  name: "Gurukrupan Agro Limited",
  cin: "U01820GJ2020PLC118253",
  iec: "AAICG7050K",
  gstin: "24AAICG7050K1ZH",
  address: "Office No. 401, 4th Floor, Shivalik-7, Gondal Road, Rajkot-360002, Gujarat, India",
  phone: "+91 99048 16700",
  email: "ramguru.exports@gmail.com",
};

export const documentSteps = [
  { id: "purchaseOrder", short: "PO", title: "Purchase Order", party: "Supplier-facing" },
  { id: "salesContract", short: "SC", title: "Sales Contract", party: "Buyer-facing" },
  { id: "customsInvoice", short: "CI", title: "Customs Invoice / Packing List", party: "Customs-facing" },
  { id: "commercialInvoice", short: "INV", title: "Commercial Invoice", party: "Buyer-facing" },
  { id: "packingList", short: "PL", title: "Commercial Packing List", party: "Buyer-facing" },
];

export const customers = ["WGK General Trading L.L.C."];
export const suppliers = ["Ramji Trading Co."];

export const initialFile = {
  reference: "GAL/26-27/038",
  buyer: "WGK General Trading L.L.C.",
  supplier: "Ramji Trading Co.",
  consigneeAddress: "Dubai, UAE, PO Box 10055",
  buyerContact: "+971586872240",
  buyerEmail: "operations.wgk@gmail.com",
  notifyParty: "XXXXXXXXXXXXXXXXXXXXX",
  invoiceDate: "2026-07-25",
  paymentTerms: "Against B/L",
  container: "01 X 40' FCL",
  containerNo: "EITU1332739",
  sealNo: "000791",
  billNo: "XXXXXXXXXXXX",
  billDate: "2026-07-30",
  shippingBillNo: "0",
  shippingBillDate: "2026-07-25",
  origin: "India",
  destination: "UAE",
  portLoading: "Nhava Sheva, India",
  portDischarge: "Jebel Ali, UAE",
  vesselVoyage: "ESL WAFA / 026A9",
  incoterm: "CNF",
  commission: "1%",
  netWeight: "9.500 MT",
  grossWeight: "10.450 MT",
  packageCount: "950",
  marks: "TEJ PATTA | NET WT.: 10 KG | PKG. DT: 02/2026 | EXP. DT: 02/2028 | ORIGIN: INDIA",
  purchaseTerms: "Commodity must confirm to the specific quality and weight. Shipping marks must be printed on each bag. Transport charges are paid by the supplier before dispatch. Subject to Rajkot jurisdiction, Gujarat.",
  contractTerms: "Delivery by sea container on CNF Jebel Ali, UAE basis as per Incoterms 2020. Export standard packing suitable for sea freight. Buyer arranges insurance. Partial shipment and trans-shipment are not allowed.",
  items: [
    { id: "1", packages: "900 bags packed in 10 KGS PP bags each", product: "Indian Bay Leaf (Tejpatta)", hsCode: "09109990", quantity: "9.000", unit: "MT Net", gross: "9.900 MT", remarks: "", rate: "735.00", amount: "6615.00" },
    { id: "2", packages: "50 boxes; each box contains 40 jars of 250 grams each", product: "Indian Bay Leaf (Tejpatta)", hsCode: "09109990", quantity: "0.500", unit: "MT Net", gross: "0.550 MT", remarks: "", rate: "735.00", amount: "367.50" },
  ],
};

export const documentItems = {
  purchaseOrder: [{ id: "po-1", packages: "-", product: "FENNEL SEEDS", hsCode: "", quantity: "", unit: "", rate: "", amount: "" }],
  salesContract: [{ id: "sc-1", packages: "640 bags packed in 60 KG jute bags", product: "Indian Coffee Beans Robusta Cherry-AA", hsCode: "", quantity: "19.200", unit: "MT", rate: "0.00", amount: "0.00" }],
  customsInvoice: initialFile.items,
  commercialInvoice: initialFile.items,
  packingList: initialFile.items,
};

export const sourceContent = {
  purchaseOrder: {
    companyHeader: "GURUKRUPAN AGRO LIMITED | CIN: U01820GJ2020PLC118253 | R.O.: Office No. 401, 4th Floor, Shivalik-7, C/O Future Capital Holdings, Gondal Road, Rajkot-360002, Gujarat, India | Contact: +91 9904816700 | E-mail: exports.gurukrupan@yahoo.com | Landline/Fax: 0218 2386700",
    party: "RAMJI TRADING CO., 1st Floor, Shop No. A-179, Shree Sardar Vallabhbhai Patel Market Yard, Morbi Road, Bedi, Rajkot, Gujarat, PIN 360003.",
    terms: [
      "Commodity must confirm to the specific quality and weight.",
      "Shipping marks printed on each bag; otherwise charges will be borne by seller AIC.",
      "All transport charges paid by the supplier prior to dispatch.",
      "PO must be provided with the documents; penalty for supplier failure.",
      "Subject to Rajkot jurisdiction, Gujarat.",
    ],
  },
  salesContract: {
    cargo: "1 X 20 FCL Indian Coffee Beans Robusta Cherry-AA · 19.200 MT · 640 bags packing in 60 KG jute bags.",
    documentSet: ["Invoice", "Packing List", "Certificate of Origin", "Fumigation Certificate", "Phytosanitary Certificate"],
    commercialTerms: "1 X 20 FCL · 19.200 MT · CNF Jebel Ali, UAE · US$ 0.00 total.",
    terms: [
      "Delivery terms: by sea, by containers CNF Jebel Ali, UAE as per Incoterms 2020.",
      "Shipment is CNF basis; no insurance arranged by seller, subsequent responsibility rests with buyer.",
      "Export standard packing suitable for sea freight.",
      "Pre-shipment inspection by seller; SGS/BV inspection at buyer cost if required.",
      "Goods conform to agreed specifications and Indian/international standards.",
      "Insurance arranged by buyer if required.",
      "Partial shipment / trans-shipment: not allowed.",
      "Buyer provides extension where shipment is delayed by shut-out containers or vessel scheduling; seller not responsible for transit delay.",
      "Seller may recall documents if not paid within seven calendar days of presentation.",
      "If buyer fails payment, seller may cancel, transfer/resell cargo, withdraw or re-route documents to another buyer.",
      "Force majeure applies for natural disasters, acts of God, war, flood, typhoon, strike, fire, riots, explosion, or government regulation.",
      "Buyer bears destination clearance, duties, taxes, destuffing, THC/DDC charges.",
      "Disputes settled under FOSFA, London arbitration rules.",
      "Buyer bears overdue interest, crystallisation, and bank charges.",
    ],
  },
  customsInvoice: {
    amountWords: "SIX THOUSAND NINE HUNDRED EIGHTY-TWO DOLLAR AND 50/100 ONLY.",
    declaration: [
      "Goods cleared under Letter of Undertaking, application submitted on GST portal ARN AD2404260064296, under Rule 96 IGST Rules, 2017.",
      "No input tax credit of central or integrated goods and services tax has been availed for inputs or input services used in manufacture of export goods.",
      "CENVAT credit on inputs or input services used for export goods has not been carried forward under the Central Goods and Services Act 2017.",
      "Remarks: supply meant for export without payment of IGST; duty drawback if applicable; intent to claim RoDTEP rewards if applicable.",
    ],
  },
  commercialInvoice: {
    amountWords: "SIX THOUSAND, NINE HUNDRED EIGHTY TWO DOLLARS AND FIFTY CENTS ONLY.",
    declaration: "We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct in all aspects. We intend to claim RoDTEP rewards if applicable.",
  },
  packingList: {
    declaration: "We declare that the particulars are true and correct in all aspects.",
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export const exportFiles = [
  { id: "gal-038", label: "WGK · GAL/26-27/038", customer: "WGK General Trading L.L.C.", stage: "Invoices ready", data: { ...clone(initialFile), documentItems: clone(documentItems), completed: { customsInvoice: true, commercialInvoice: true, packingList: true } } },
  { id: "wgk-coffee", label: "WGK · Coffee contract", customer: "WGK General Trading L.L.C.", stage: "Sales contract ready", data: { ...clone(initialFile), reference: "SC-WGK-COFFEE-001", container: "01 X 20' FCL", completed: { salesContract: true }, documentItems: clone(documentItems) } },
  { id: "ramji-fennel", label: "Ramji · Fennel PO", customer: "Ramji Trading Co.", stage: "Purchase order ready", data: { ...clone(initialFile), reference: "PO-RAMJI-FENNEL-001", buyer: "Gurukrupan Agro Limited", supplier: "Ramji Trading Co.", completed: { purchaseOrder: true }, documentItems: clone(documentItems) } },
];
