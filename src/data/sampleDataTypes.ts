
export interface Invoice {
    invoiceId: string;
    proof: string;
  }
  
  export interface Domain {
    id: string;
    domain: string;
    mailbox: string;
    billingPeriod: string;
    package: string;
    storageUsed: string;
    paymentMethod: string;
    dueDate: string;
    invoices: Invoice[];
  }
  
  export interface Organization {
    id: string;
    name: string;
    domains: Domain[];
  }
  