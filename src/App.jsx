import { useMemo, useState } from "react";
import { company, customers, documentItems, documentSteps, exportFiles, initialFile, sourceContent, suppliers } from "./exportData.js";
import "./styles.css";
import "./extra.css";

const fieldsByDocument = {
  purchaseOrder: ["supplier", "reference", "invoiceDate", "purchaseTerms"],
  salesContract: ["buyer", "reference", "container", "incoterm", "portDischarge", "contractTerms"],
  customsInvoice: ["buyer", "notifyParty", "reference", "invoiceDate", "paymentTerms", "container", "origin", "destination", "portLoading", "portDischarge", "commission"],
  commercialInvoice: ["buyer", "notifyParty", "reference", "invoiceDate", "billNo", "billDate", "shippingBillNo", "shippingBillDate", "paymentTerms", "container", "vesselVoyage"],
  packingList: ["buyer", "notifyParty", "reference", "invoiceDate", "billNo", "billDate", "containerNo", "sealNo", "marks", "packageCount", "netWeight", "grossWeight"],
};

const meta = {
  reference: ["File / invoice reference", "text"], buyer: ["Buyer / customer", "customer"], supplier: ["Supplier", "supplier"], invoiceDate: ["Invoice date", "date"], notifyParty: ["Notify party", "text"], paymentTerms: ["Payment terms", "text"], container: ["Container", "text"], origin: ["Country of origin", "text"], destination: ["Final destination", "text"], portLoading: ["Port of loading", "text"], portDischarge: ["Port of discharge", "text"], vesselVoyage: ["Vessel / voyage", "text"], incoterm: ["Incoterm", "text"], commission: ["Commission", "text"], billNo: ["B/L number", "text"], billDate: ["B/L date", "date"], shippingBillNo: ["Shipping bill number", "text"], shippingBillDate: ["Shipping bill date", "date"], containerNo: ["Container number", "text"], sealNo: ["Seal number", "text"], packageCount: ["Total packages", "text"], netWeight: ["Total net weight", "text"], grossWeight: ["Total gross weight", "text"], marks: ["Marks & numbers", "textarea"], purchaseTerms: ["Purchase order terms", "textarea"], contractTerms: ["Sales contract terms", "textarea"],
};

function Field({ name, value, onChange }) {
  const [label, type] = meta[name];
  if (type === "customer" || type === "supplier") {
    const options = type === "customer" ? customers : suppliers;
    return <label className="field"><span>{label}</span><select value={value} onChange={(event) => onChange(name, event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
  }
  if (type === "textarea") return <label className="field wide"><span>{label}</span><textarea rows="4" value={value} onChange={(event) => onChange(name, event.target.value)} /></label>;
  return <label className="field"><span>{label}</span><input type={type} value={value} onChange={(event) => onChange(name, event.target.value)} /></label>;
}

function ItemTable({ items, onChange }) {
  const edit = (id, key, value) => onChange(items.map((item) => item.id === id ? { ...item, [key]: value } : item));
  return <section className="card items"><div className="section-title"><div><small>GOODS</small><h2>Commodity lines</h2></div><span>{items.length} lines</span></div><div className="table-wrap"><table><thead><tr><th>Packages / packing</th><th>Commodity</th><th>HS code</th><th>Quantity</th><th>Rate USD</th><th>Amount USD</th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><textarea value={item.packages} onChange={(event) => edit(item.id, "packages", event.target.value)} /></td><td><input value={item.product} onChange={(event) => edit(item.id, "product", event.target.value)} /></td><td><input value={item.hsCode} onChange={(event) => edit(item.id, "hsCode", event.target.value)} /></td><td><input value={item.quantity} onChange={(event) => edit(item.id, "quantity", event.target.value)} /><small>{item.unit}</small></td><td><input value={item.rate} onChange={(event) => edit(item.id, "rate", event.target.value)} /></td><td><input value={item.amount} onChange={(event) => edit(item.id, "amount", event.target.value)} /></td></tr>)}</tbody></table></div></section>;
}

function SourceDetail({ active }) {
  const source = sourceContent[active];
  const entries = Object.entries(source).filter(([key]) => !["terms", "declaration"].includes(key));
  const terms = source.terms ?? (source.declaration ? [source.declaration] : []);
  return <section className="source-detail"><div><small>ORIGINAL FORM CONTENT</small><h2>Fixed text retained from the source document</h2></div>{entries.map(([key, value]) => <div className="source-row" key={key}><b>{key.replace(/([A-Z])/g, " $1")}</b>{Array.isArray(value) ? <ul>{value.map((line) => <li key={line}>{line}</li>)}</ul> : <p>{value}</p>}</div>)}{terms.length > 0 && <div className="source-row"><b>Terms / declarations</b><ol>{terms.map((term) => <li key={term}>{term}</li>)}</ol></div>}</section>;
}

function Preview({ document, data, items, total }) {
  const source = sourceContent[document.id];
  const rates = document.id !== "packingList";
  const terms = source.terms ?? (source.declaration ? [source.declaration] : []);
  return <article className="a4"><header><div><h3>{company.name}</h3><p>IEC: {company.iec} · CIN: {company.cin} · GSTIN: {company.gstin}</p><p>{company.address}</p></div><b>{document.id === "customsInvoice" ? "INVOICE / PACKING" : document.title.toUpperCase()}</b></header><hr /><div className="addresses"><p><b>{document.id === "purchaseOrder" ? "SUPPLIER" : "CONSIGNEE"}</b><br />{document.id === "purchaseOrder" ? source.party : <>{data.buyer}<br />{data.consigneeAddress}<br />{data.buyerEmail}</>}</p><p><b>NOTIFY PARTY</b><br />{data.notifyParty}<br />{data.consigneeAddress}</p></div><div className="print-meta"><span>Reference<b>{data.reference}</b></span><span>Payment terms<b>{data.paymentTerms}</b></span><span>Container<b>{data.container}</b></span><span>Port of discharge<b>{data.portDischarge}</b></span></div><table className="print-table"><thead><tr><th>Packages</th><th>Description</th><th>Qty.</th>{rates && <><th>Rate</th><th>Amount</th></>}</tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item.packages}</td><td>{item.product}<br /><small>HS Code: {item.hsCode || "-"}</small></td><td>{item.quantity} {item.unit}</td>{rates && <><td>{item.rate}</td><td>{item.amount}</td></>}</tr>)}</tbody></table><div className="print-total"><span>Total packages <b>{data.packageCount}</b></span><span>Net weight <b>{data.netWeight}</b></span><span>Gross weight <b>{data.grossWeight}</b></span>{rates && <span>Total USD <b>{total}</b></span>}</div>{terms.length > 0 && <section className="print-terms"><b>Terms / declarations</b><ol>{terms.map((term) => <li key={term}>{term}</li>)}</ol></section>}<footer><span>Declaration: particulars are true and correct.</span><span>For, {company.name}<br /><br />Authorized Signatory</span></footer></article>;
}

function App() {
  const [files, setFiles] = useState(exportFiles);
  const [fileId, setFileId] = useState(exportFiles[0].id);
  const [active, setActive] = useState("purchaseOrder");
  const [view, setView] = useState("form");
  const [notice, setNotice] = useState("");
  const file = files.find((item) => item.id === fileId);
  const data = file.data;
  const document = documentSteps.find((item) => item.id === active);
  const items = data.documentItems?.[active] ?? documentItems[active];
  const total = useMemo(() => items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0).toFixed(2), [items]);
  const updateFile = (mutator) => setFiles((current) => current.map((item) => item.id === fileId ? mutator(item) : item));
  const update = (name, value) => updateFile((item) => ({ ...item, data: { ...item.data, [name]: value } }));
  const updateItems = (nextItems) => updateFile((item) => ({ ...item, data: { ...item.data, documentItems: { ...item.data.documentItems, [active]: nextItems } } }));
  const validate = () => {
    const missing = fieldsByDocument[active].filter((field) => !String(data[field] || "").trim());
    if (missing.length) return setNotice(`Missing: ${missing.map((field) => meta[field][0]).join(", ")}`);
    updateFile((item) => ({ ...item, stage: `${document.title} ready`, data: { ...item.data, completed: { ...item.data.completed, [active]: true } } }));
    setNotice(`${document.title} is saved as ready. You can return to this export file and edit it at any time.`);
  };
  const newFile = () => {
    const id = `new-${Date.now()}`;
    const reference = `DRAFT-${files.length + 1}`;
    const base = JSON.parse(JSON.stringify(initialFile));
    setFiles((current) => [...current, { id, label: `New export · ${reference}`, customer: base.buyer, stage: "Draft", data: { ...base, reference, documentItems: JSON.parse(JSON.stringify(documentItems)), completed: {} } }]);
    setFileId(id); setActive("purchaseOrder"); setView("form"); setNotice("New export file created. Select the buyer, supplier, and complete each document in sequence.");
  };

  return <div className="shell"><aside><div className="brand"><i>GA</i><div><b>Gurukrupan</b><small>Export documents</small></div></div><button className="new" onClick={newFile}>+ New export file</button><p className="nav-title">CUSTOMER EXPORT FILES</p><div className="file-list">{files.map((item) => <button className={`file-select ${item.id === fileId ? "selected" : ""}`} key={item.id} onClick={() => { setFileId(item.id); setNotice(""); }}><b>{item.label}</b><small>{item.stage}</small></button>)}</div><p className="nav-title">DOCUMENT FLOW</p>{documentSteps.map((step, index) => <button key={step.id} className={`step ${active === step.id ? "active" : ""}`} onClick={() => { setActive(step.id); setNotice(""); }}><i>{index + 1}</i><span><b>{step.title}</b><small>{data.completed?.[step.id] ? "Ready - click to edit" : step.party}</small></span></button>)}<div className="file-ref"><small>ACTIVE EXPORT FILE</small><b>{data.reference}</b><span>{file.stage}</span></div></aside><main><header className="top"><div><p>{file.customer} / {data.reference}</p><h1>{document.title}</h1></div><div className="tabs"><button className={view === "form" ? "chosen" : ""} onClick={() => setView("form")}>Edit form</button><button className={view === "preview" ? "chosen" : ""} onClick={() => setView("preview")}>A4 preview</button></div></header>{view === "form" ? <div className="content"><section className="summary"><div><small>BUYER / CUSTOMER</small><b>{data.buyer}</b></div><div><small>SUPPLIER</small><b>{data.supplier}</b></div><div><small>DOCUMENT TOTAL</small><b>USD {total}</b></div><div><small>STATUS</small><b className={data.completed?.[active] ? "ready" : "draft"}>{data.completed?.[active] ? "Ready" : "Draft"}</b></div></section><section className="card"><div className="section-title"><div><small>{document.short} · {document.party}</small><h2>Editable document fields</h2></div><button className="validate" onClick={validate}>Validate & save</button></div>{notice && <p className={`message ${notice.startsWith("Missing") ? "bad" : "good"}`}>{notice}</p>}<div className="fields">{fieldsByDocument[active].map((field) => <Field key={field} name={field} value={data[field]} onChange={update} />)}</div></section><ItemTable items={items} onChange={updateItems} /><SourceDetail active={active} /></div> : <div className="preview-area"><div className="preview-bar"><span>Preview includes fixed text and editable values for this document.</span><div><button onClick={() => setView("form")}>Back to editing</button><button className="print" onClick={() => window.print()}>Print / save PDF</button></div></div><Preview document={document} data={data} items={items} total={total} /></div>}</main></div>;
}

export default App;
