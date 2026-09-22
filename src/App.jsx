import { useMemo, useState } from "react";
import { company, customers, documentSteps, initialFile, suppliers } from "./exportData.js";
import "./styles.css";

const documentFields = {
  purchaseOrder: ["supplier", "reference", "invoiceDate", "purchaseTerms"],
  salesContract: ["buyer", "container", "incoterm", "portDischarge", "contractTerms"],
  customsInvoice: ["buyer", "notifyParty", "paymentTerms", "container", "origin", "destination", "portLoading", "portDischarge", "commission"],
  commercialInvoice: ["buyer", "notifyParty", "billNo", "billDate", "shippingBillNo", "shippingBillDate", "paymentTerms", "container", "vesselVoyage"],
  packingList: ["buyer", "notifyParty", "billNo", "billDate", "containerNo", "sealNo", "marks", "packageCount", "netWeight", "grossWeight"],
};

const meta = {
  reference: ["File / invoice reference", "text"], buyer: ["Buyer / customer", "customer"], supplier: ["Supplier", "supplier"], invoiceDate: ["Invoice date", "date"], notifyParty: ["Notify party", "text"], paymentTerms: ["Payment terms", "text"], container: ["Container", "text"], origin: ["Country of origin", "text"], destination: ["Final destination", "text"], portLoading: ["Port of loading", "text"], portDischarge: ["Port of discharge", "text"], vesselVoyage: ["Vessel / voyage", "text"], incoterm: ["Incoterm", "text"], commission: ["Commission", "text"], billNo: ["B/L number", "text"], billDate: ["B/L date", "date"], shippingBillNo: ["Shipping bill number", "text"], shippingBillDate: ["Shipping bill date", "date"], containerNo: ["Container number", "text"], sealNo: ["Seal number", "text"], packageCount: ["Total packages", "text"], netWeight: ["Total net weight", "text"], grossWeight: ["Total gross weight", "text"], marks: ["Marks & numbers", "textarea"], purchaseTerms: ["Terms & conditions", "textarea"], contractTerms: ["Terms & conditions", "textarea"],
};

function Field({ name, value, update }) {
  const [label, type] = meta[name];
  if (type === "customer" || type === "supplier") {
    const options = type === "customer" ? customers : suppliers;
    return <label className="field"><span>{label}</span><select value={value} onChange={(e) => update(name, e.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
  }
  if (type === "textarea") return <label className="field wide"><span>{label}</span><textarea value={value} rows="4" onChange={(e) => update(name, e.target.value)} /></label>;
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(e) => update(name, e.target.value)} /></label>;
}

function Items({ items, update }) {
  const change = (id, key, value) => update(items.map((item) => item.id === id ? { ...item, [key]: value } : item));
  return <section className="card items"><div className="section-title"><div><small>GOODS</small><h2>Commodity lines</h2></div><span>{items.length} lines</span></div><div className="table-wrap"><table><thead><tr><th>Packages / packing</th><th>Commodity</th><th>HS code</th><th>Quantity</th><th>Rate USD</th><th>Amount USD</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><textarea value={item.packages} onChange={(e) => change(item.id, "packages", e.target.value)} /></td><td><input value={item.product} onChange={(e) => change(item.id, "product", e.target.value)} /></td><td><input value={item.hsCode} onChange={(e) => change(item.id, "hsCode", e.target.value)} /></td><td><input value={item.quantity} onChange={(e) => change(item.id, "quantity", e.target.value)} /><small>{item.unit}</small></td><td><input value={item.rate} onChange={(e) => change(item.id, "rate", e.target.value)} /></td><td><input value={item.amount} onChange={(e) => change(item.id, "amount", e.target.value)} /></td></tr>)}</tbody></table></div></section>;
}

function Preview({ document, data, total }) {
  const title = document.title === "Customs Invoice / Packing List" ? "INVOICE / PACKING" : document.title.toUpperCase();
  const rates = document.id !== "packingList";
  return <article className="a4"><header><div><h3>{company.name}</h3><p>IEC: {company.iec} · CIN: {company.cin} · GSTIN: {company.gstin}</p><p>{company.address}</p></div><b>{title}</b></header><hr /><div className="addresses"><p><b>CONSIGNEE</b><br />{data.buyer}<br />{data.consigneeAddress}<br />{data.buyerEmail}</p><p><b>NOTIFY PARTY</b><br />{data.notifyParty}<br />{data.consigneeAddress}</p></div><div className="print-meta"><span>Invoice no.<b>{data.reference}</b></span><span>Payment terms<b>{data.paymentTerms}</b></span><span>Container<b>{data.container}</b></span><span>Port of discharge<b>{data.portDischarge}</b></span></div><table className="print-table"><thead><tr><th>Packages</th><th>Description</th><th>Qty.</th>{rates && <><th>Rate</th><th>Amount</th></>}</tr></thead><tbody>{data.items.map((item) => <tr key={item.id}><td>{item.packages}</td><td>{item.product}<br /><small>HS Code: {item.hsCode}</small></td><td>{item.quantity} {item.unit}</td>{rates && <><td>{item.rate}</td><td>{item.amount}</td></>}</tr>)}</tbody></table><div className="print-total"><span>Total packages <b>{data.packageCount}</b></span><span>Net weight <b>{data.netWeight}</b></span><span>Gross weight <b>{data.grossWeight}</b></span>{rates && <span>Total USD <b>{total}</b></span>}</div><p className="print-terms">{document.id === "purchaseOrder" ? data.purchaseTerms : document.id === "salesContract" ? data.contractTerms : "We declare that the particulars shown are true and correct in all respects."}</p><footer><span>Declaration: particulars are true and correct.</span><span>For, {company.name}<br /><br />Authorized Signatory</span></footer></article>;
}

function App() {
  const [active, setActive] = useState("purchaseOrder");
  const [view, setView] = useState("form");
  const [data, setData] = useState(initialFile);
  const [message, setMessage] = useState("");
  const document = documentSteps.find((step) => step.id === active);
  const total = useMemo(() => data.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toFixed(2), [data.items]);
  const update = (name, value) => setData((current) => ({ ...current, [name]: value }));
  const validate = () => {
    const missing = documentFields[active].filter((field) => !String(data[field] || "").trim());
    setMessage(missing.length ? `Missing: ${missing.map((field) => meta[field][0]).join(", ")}` : `${document.title} is ready for preview.`);
  };

  return <div className="shell"><aside><div className="brand"><i>GA</i><div><b>Gurukrupan</b><small>Export documents</small></div></div><button className="new">+ New export file</button><p className="nav-title">DOCUMENT FLOW</p>{documentSteps.map((step, index) => <button key={step.id} className={`step ${active === step.id ? "active" : ""}`} onClick={() => { setActive(step.id); setMessage(""); }}><i>{index + 1}</i><span><b>{step.title}</b><small>{step.party}</small></span></button>)}<div className="file-ref"><small>ACTIVE EXPORT FILE</small><b>{data.reference}</b><span>Draft · 5 documents</span></div></aside><main><header className="top"><div><p>Export files / {data.reference}</p><h1>{document.title}</h1></div><div className="tabs"><button className={view === "form" ? "chosen" : ""} onClick={() => setView("form")}>Edit form</button><button className={view === "preview" ? "chosen" : ""} onClick={() => setView("preview")}>A4 preview</button></div></header>{view === "form" ? <div className="content"><section className="summary"><div><small>BUYER / CUSTOMER</small><b>{data.buyer}</b></div><div><small>SUPPLIER</small><b>{data.supplier}</b></div><div><small>COMMERCIAL TOTAL</small><b>USD {total}</b></div><div><small>STATUS</small><b className="draft">Draft</b></div></section><section className="card"><div className="section-title"><div><small>{document.short} · {document.party}</small><h2>Document information</h2></div><button className="validate" onClick={validate}>Validate form</button></div>{message && <p className={`message ${message.startsWith("Missing") ? "bad" : "good"}`}>{message}</p>}<div className="fields">{documentFields[active].map((field) => <Field key={field} name={field} value={data[field]} update={update} />)}</div></section><Items items={data.items} update={(items) => update("items", items)} /></div> : <div className="preview-area"><div className="preview-bar"><span>Preview of the active A4 document.</span><button onClick={() => setView("form")}>Back to editing</button></div><Preview document={document} data={data} total={total} /></div>}</main></div>;
}

export default App;
