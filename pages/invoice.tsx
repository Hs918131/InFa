
import { useState } from 'react';
import styles from '../styles/Invoice.module.css';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function Invoice() {
  const [invoiceId, setInvoiceId] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [billTo, setBillTo] = useState('');
  const [payTo, setPayTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [currency, setCurrency] = useState('$');
  const [taxDetails, setTaxDetails] = useState<{name: string, rate: number}[]>([]);
  const [message, setMessage] = useState('');
  const [logo, setLogo] = useState<string>('');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 0, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const generateInvoice = () => {
    const originalTitle = document.title;
    document.title = `Invoice-${invoiceId || 'New'}`;
    window.print();
    document.title = originalTitle;
  };

  const calculateTax = (subtotal: number) => {
    return taxDetails.reduce((total, tax) => total + (subtotal * tax.rate / 100), 0);
  };

  const getCurrencySymbol = (currency: string) => {
    switch(currency) {
      case 'EUR': return '€';
      case 'INR': return '₹';
      default: return '$';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>Keiser</div>
        <div className={styles.actions}>
          <select 
            className={styles.currencySelect} 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="$">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="INR">INR (₹)</option>
          </select>
          <button className={styles.copyButton}>
            <img src="/copy-icon.svg" alt="Copy" />
          </button>
          <button className={styles.printButton}>
            <img src="/print-icon.svg" alt="Print" />
          </button>
        </div>
      </div>

      <div className={styles.invoiceForm}>
        <div className={styles.invoiceHeader}>
          <h1>Invoice</h1>
          <div className={styles.logo}>
            {logo ? (
              <img src={logo} alt="Company Logo" className={styles.logoImage} />
            ) : (
              <label className={styles.logoUpload}>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                + Add Logo
              </label>
            )}
          </div>
        </div>
        
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label>Invoice Id:</label>
            <input type="text" placeholder="Add invoice id" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Due Date:</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Payment terms:</label>
            <input type="text" placeholder="Add payment terms" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
          </div>
        </div>

        <div className={styles.addresses}>
          <div className={styles.formGroup}>
            <label>Billed To</label>
            <textarea placeholder="Address" value={billTo} onChange={(e) => setBillTo(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Pay To</label>
            <textarea placeholder="Address" value={payTo} onChange={(e) => setPayTo(e.target.value)} />
          </div>
        </div>

        <div className={styles.entries}>
          <h2>Entries</h2>
          {items.map((item, index) => (
            <div key={index} className={styles.entryRow}>
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.price}
                onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
              />
              <div className={styles.entryTotal}>
                ${(item.quantity * item.price).toFixed(2)}
                <button 
                  className={styles.deleteButton}
                  onClick={() => setItems(items.filter((_, i) => i !== index))}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <button onClick={addItem} className={styles.addEntryButton}>Add another entry</button>
        </div>

        <div className={styles.taxDetails}>
          <h2>Tax Details</h2>
          {taxDetails.map((tax, index) => (
            <div key={index} className={styles.taxRow}>
              <input
                type="text"
                placeholder="Tax Name"
                value={tax.name}
                onChange={(e) => {
                  const newTaxDetails = [...taxDetails];
                  newTaxDetails[index].name = e.target.value;
                  setTaxDetails(newTaxDetails);
                }}
              />
              <input
                type="number"
                placeholder="Rate %"
                value={tax.rate}
                onChange={(e) => {
                  const newTaxDetails = [...taxDetails];
                  newTaxDetails[index].rate = parseFloat(e.target.value);
                  setTaxDetails(newTaxDetails);
                }}
              />
              <button 
                className={styles.deleteButton}
                onClick={() => setTaxDetails(taxDetails.filter((_, i) => i !== index))}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            onClick={() => setTaxDetails([...taxDetails, { name: '', rate: 0 }])} 
            className={styles.addEntryButton}
          >
            Add Tax
          </button>
        </div>

        <div className={styles.totals}>
          <div className={styles.subtotal}>
            <span>Subtotal:</span>
            <span>{getCurrencySymbol(currency)}{calculateSubtotal().toFixed(2)}</span>
          </div>
          {taxDetails.map((tax, index) => (
            <div key={index} className={styles.taxLine}>
              <span>{tax.name} ({tax.rate}%):</span>
              <span>{getCurrencySymbol(currency)}{(calculateSubtotal() * tax.rate / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className={styles.total}>
            <span>Total:</span>
            <span>{getCurrencySymbol(currency)}{(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}</span>
          </div>
        </div>

        <textarea
          className={styles.message}
          placeholder="Add a custom message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={generateInvoice} className={styles.generateButton}>
          Generate Invoice
        </button>
      </div>
    </div>
  );
}
