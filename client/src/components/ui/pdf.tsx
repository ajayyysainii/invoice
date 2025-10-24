import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

interface InvoiceItem {
  item: string;
  quantity: number;
  price: number;
  tax: number;
  discount: number;
}

interface Buyer {
  _id: string;
  name: string;
  email: string;
  nameOfBusiness: string;
  phone: number;
  address: string;
  gst: string;
}

interface Invoice {
  _id: string;
  userId: string;
  buyerId: Buyer;
  invoiceNumber: string;
  dueDate: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: InvoiceItem[];
}

interface MyDocumentProps {
  invoice: Invoice;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: '2 solid #3B82F6',
    paddingBottom: 20,
  },
  companyInfo: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.4,
  },
  invoiceInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 10,
  },
  invoiceDetails: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.4,
  },
  clientSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    backgroundColor: '#F3F4F6',
    padding: 8,
  },
  clientInfo: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.5,
  },
  itemsTable: {
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 8,
  },
  tableHeaderText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #E5E7EB',
    padding: 8,
    minHeight: 30,
  },
  tableRowText: {
    fontSize: 9,
    color: '#374151',
  },
  itemName: {
    flex: 2,
  },
  itemQuantity: {
    flex: 1,
  },
  itemPrice: {
    flex: 1,
  },
  itemTax: {
    flex: 1,
  },
  itemDiscount: {
    flex: 1,
  },
  itemTotal: {
    flex: 1,
    fontWeight: 'bold',
  },
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalsContainer: {
    width: 200,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    fontSize: 10,
  },
  totalLabel: {
    color: '#6B7280',
  },
  totalValue: {
    color: '#374151',
    fontWeight: 'bold',
  },
  grandTotal: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 8,
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1 solid #E5E7EB',
    fontSize: 8,
    color: '#6B7280',
  },
});

// Helper function to calculate item totals
const calculateItemTotal = (item: InvoiceItem): number => {
  const subtotal = item.quantity * item.price;
  const discountAmount = (subtotal * item.discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = (afterDiscount * item.tax) / 100;
  return afterDiscount + taxAmount;
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Create Document Component
const MyDocument: React.FC<MyDocumentProps> = ({ invoice }) => {
  const subtotal = invoice.items.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);

  const totalDiscount = invoice.items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.price;
    return sum + (itemSubtotal * item.discount) / 100;
  }, 0);

  const totalTax = invoice.items.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.price;
    const discountAmount = (itemSubtotal * item.discount) / 100;
    const afterDiscount = itemSubtotal - discountAmount;
    return sum + (afterDiscount * item.tax) / 100;
  }, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Your Company Name</Text>
            <Text style={styles.companyDetails}>
              Your Business Address{'\n'}
              City, State, ZIP Code{'\n'}
              Phone: +91 1234567890{'\n'}
              Email: your@email.com{'\n'}
              GST: 12ABCDE1234F1Z5
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceDetails}>
              Invoice #: {invoice.invoiceNumber}{'\n'}
              Date: {formatDate(invoice.createdAt)}{'\n'}
              Due Date: {formatDate(invoice.dueDate)}
            </Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.clientSection}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.clientInfo}>
            {invoice.buyerId.nameOfBusiness}{'\n'}
            {invoice.buyerId.name}{'\n'}
            {invoice.buyerId.email}{'\n'}
            Phone: {invoice.buyerId.phone}{'\n'}
            {invoice.buyerId.address}{'\n'}
            GST: {invoice.buyerId.gst}
          </Text>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <Text style={{...styles.tableHeaderText, ...styles.itemName}}>Item</Text>
            <Text style={{...styles.tableHeaderText, ...styles.itemQuantity}}>Qty</Text>
            <Text style={{...styles.tableHeaderText, ...styles.itemPrice}}>Price</Text>
            <Text style={{...styles.tableHeaderText, ...styles.itemTax}}>Tax %</Text>
            <Text style={{...styles.tableHeaderText, ...styles.itemDiscount}}>Disc %</Text>
            <Text style={{...styles.tableHeaderText, ...styles.itemTotal}}>Total</Text>
          </View>
          
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={{...styles.tableRowText, ...styles.itemName}}>{item.item}</Text>
              <Text style={{...styles.tableRowText, ...styles.itemQuantity}}>{item.quantity}</Text>
              <Text style={{...styles.tableRowText, ...styles.itemPrice}}>{formatCurrency(item.price)}</Text>
              <Text style={{...styles.tableRowText, ...styles.itemTax}}>{item.tax}%</Text>
              <Text style={{...styles.tableRowText, ...styles.itemDiscount}}>{item.discount}%</Text>
              <Text style={{...styles.tableRowText, ...styles.itemTotal}}>{formatCurrency(calculateItemTotal(item))}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Discount:</Text>
              <Text style={styles.totalValue}>-{formatCurrency(totalDiscount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Tax:</Text>
              <Text style={styles.totalValue}>{formatCurrency(totalTax)}</Text>
            </View>
            <View style={{...styles.totalRow, ...styles.grandTotal}}>
              <Text style={styles.totalLabel}>Grand Total:</Text>
              <Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Payment terms: Net 30 days</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;