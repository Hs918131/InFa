import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Invoice.module.css';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function Invoice() {
  const [CompanyName, setCompanyName] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [billTo, setBillTo] = useState('');
  const [payTo, setPayTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
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
      case 'USD': return '$';
      default: return currency;
    }
  };




  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>InFa</Link>
        <div className={styles.actions}>
          <select 
            className={styles.currencySelect} 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="INR">₹ INR</option>
          </select>
          <button onClick={generateInvoice} className={styles.generateButton}>
            Generate Invoice
          </button>
        </div>
      </div>

      <div className={styles.invoiceForm}>
        <div className={styles.invoiceHeader}>
          <div className={styles.headerLeft}>
            
            <input 
              type="text" 
              placeholder="Company Name" 
              value={CompanyName} 
              onChange={(e) => setCompanyName(e.target.value)}
              className={styles.companyNameInput}
            />
            <input 
              type="text" 
              placeholder="Invoice #" 
              value={invoiceId} 
              onChange={(e) => setInvoiceId(e.target.value)}
              className={styles.invoiceIdInput}
            />
          </div>
          <div className={styles.logo}>
            {logo ? (
              <div className={styles.logoContainer}>
                <img src={logo} alt="Company Logo" className={styles.logoImage} />
                <button onClick={() => setLogo('')} className={styles.removeLogoButton}>
                  Remove
                </button>
              </div>
            ) : (
              <label className={styles.logoUpload}>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                <span>+ Add Logo</span>
              </label>
            )}
          </div>
        </div>
        
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Invoice Date</label>
            <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Payment Terms</label>
            <input type="text" placeholder="Net 30" value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
          </div>
        </div>

        <div className={styles.addressGrid}>
          <div className={styles.formGroup}>
            <label>Bill To</label>
            <textarea 
              placeholder="Client's Name&#10;Street Address&#10;City, State, ZIP&#10;Country" 
              value={billTo} 
              onChange={(e) => setBillTo(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pay To</label>
            <textarea 
              placeholder="Your Company Name&#10;Street Address&#10;City, State, ZIP&#10;Country" 
              value={payTo} 
              onChange={(e) => setPayTo(e.target.value)} 
            />
          </div>
        </div>

        <div className={styles.entries}>
          <div className={styles.sectionHeader}>
            <h2>Items</h2>
            <button onClick={addItem} className={styles.addButton}>+ Add Item</button>
          </div>
          <div className={styles.entriesTable}>
            <div className={styles.tableHeader}>
              <span>Description</span>
              <span>Qty</span>
              <span>Price</span>
              <span>Total</span>
            </div>
            {items.map((item, index) => (
              <div key={index} className={styles.entryRow}>
                <input
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="0"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="0.00"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                />
                <div className={styles.entryTotal}>
                  <span>{getCurrencySymbol(currency)}{(item.quantity * item.price).toFixed(2)}</span>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => setItems(items.filter((_, i) => i !== index))}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.taxDetails}>
          <div className={styles.sectionHeader}>
            <h2>Taxes</h2>
            <button 
              onClick={() => setTaxDetails([...taxDetails, { name: '', rate: 0 }])} 
              className={styles.addButton}
            >
              + Add Tax
            </button>
          </div>
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
              <div className={styles.taxRateInput}>
                <input
                  type="number"
                  placeholder="0"
                  value={tax.rate}
                  onChange={(e) => {
                    const newTaxDetails = [...taxDetails];
                    newTaxDetails[index].rate = parseFloat(e.target.value);
                    setTaxDetails(newTaxDetails);
                  }}
                />
                <span>%</span>
              </div>
              <button 
                className={styles.deleteButton}
                onClick={() => setTaxDetails(taxDetails.filter((_, i) => i !== index))}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summaryDetails}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>{getCurrencySymbol(currency)}{calculateSubtotal().toFixed(2)}</span>
            </div>
            {taxDetails.map((tax, index) => (
              <div key={index} className={styles.taxLine}>
                <span>{tax.name} ({tax.rate}%)</span>
                <span>{getCurrencySymbol(currency)}{(calculateSubtotal() * tax.rate / 100).toFixed(2)}</span>
              </div>
            ))}
            <div className={styles.total}>
              <span>Total</span>
              <span>{getCurrencySymbol(currency)}{(calculateSubtotal() + calculateTax(calculateSubtotal())).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.notes}>
          <label>Notes</label>
          <textarea
            placeholder="Add any additional notes or payment instructions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
