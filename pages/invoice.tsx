
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
  const [taxDetails, setTaxDetails] = useState([]);
  const [message, setMessage] = useState('');

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
    window.print();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>Keiser</div>
        <div className={styles.actions}>
          <button className={styles.copyButton}>
            <img src="/copy-icon.svg" alt="Copy" />
          </button>
          <button className={styles.printButton}>
            <img src="/print-icon.svg" alt="Print" />
          </button>
        </div>
      </div>

      <div className={styles.invoiceForm}>
        <h1>Invoice</h1>
        
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
              </div>
            </div>
          ))}
          <button onClick={addItem} className={styles.addEntryButton}>Add another entry</button>
        </div>

        <div className={styles.totals}>
          <div className={styles.subtotal}>
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
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
