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
    { id: "1", packages: "900 bags packed in 10 KGS PP bags each", product: "Indian Bay Leaf (Tejpatta)", hsCode: "09109990", quantity: "9.000", unit: "MT Net", rate: "735.00", amount: "6615.00" },
    { id: "2", packages: "50 boxes; each box contains 40 jars of 250 grams each", product: "Indian Bay Leaf (Tejpatta)", hsCode: "09109990", quantity: "0.500", unit: "MT Net", rate: "735.00", amount: "367.50" },
  ],
};
