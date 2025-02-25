
import { useState } from 'react';
import styles from '../styles/Invoice.module.css';

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export default function Invoice() {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [company, setCompany] = useState('');
  const [billTo, setBillTo] = useState('');
  const [date, setDate] = useState('');

  const addItem = () => {
    setItems([...items, { description: '', quantity: 0, price: 0 }]);
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const generateInvoice = () => {
    // Here you can implement PDF generation or print functionality
    window.print();
  };

  return (
    <div className={styles.container}>
      <h1>Invoice Generator</h1>
      
      <div className={styles.details}>
        <div>
          <label>Company Name:</label>
          <input 
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label>Bill To:</label>
          <input 
            type="text"
            value={billTo}
            onChange={(e) => setBillTo(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.items}>
        <h2>Items</h2>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
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
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
            />
            <span>Total: ${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
        <button onClick={addItem}>Add Item</button>
      </div>

      <div className={styles.total}>
        <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      </div>

      <button onClick={generateInvoice} className={styles.generate}>
        Generate Invoice
      </button>
    </div>
  );
}
