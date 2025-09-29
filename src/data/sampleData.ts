// import type { Organization } from "./sampleDataTypes";

// export const sampleData: Organization[] = [
//   {
//     id: "org1",
//     name: "Organization 1",
//     domains: [
//       {
//         id: "d1",
//         domain: "org1-d1.com",
//         mailbox: "mailbox1",
//         billingPeriod: "Jan 2025",
//         package: "Basic",
//         storageUsed: "5GB",
//         paymentMethod: "Credit Card",
//         dueDate: "2025-10-10",
//         invoices: [
//           { invoiceId: "INV-001", proof: "Proof A" },
//           { invoiceId: "INV-002", proof: "Proof B" }
//         ]
//       },
//       {
//         id: "d2",
//         domain: "org1-d2.com",
//         mailbox: "mailbox2",
//         billingPeriod: "Feb 2025",
//         package: "Premium",
//         storageUsed: "10GB",
//         paymentMethod: "PayPal",
//         dueDate: "2025-10-20",
//         invoices: [
//           { invoiceId: "INV-003", proof: "Proof C" }
//         ]
//       }
//     ]
//   },
//   {
//     id: "org2",
//     name: "Organization 2",
//     domains: [
//       {
//         id: "d3",
//         domain: "org2-d1.com",
//         mailbox: "mailbox3",
//         billingPeriod: "Mar 2025",
//         package: "Basic",
//         storageUsed: "2GB",
//         paymentMethod: "Credit Card",
//         dueDate: "2025-11-01",
//         invoices: [
//           { invoiceId: "INV-004", proof: "Proof D" }
//         ]
//       }
//     ]
//   }
// ];

// src/data/sampleData.ts
export const sampleData = [
  { 
    id: 1, 
    organization: "PT. Evelyn", 
    package: "Business Plan", 
    orgMailboxCount: "50/200", 
    orgStatus: "Active", 
    nextEarliestBilling: "2026-01-31",
    domains: [
      { 
        id: "org1-d1", 
        domain: "evelyn.com", 
        mailbox: "admin@evelyn.com",
        package: "Business Plan",
        billingPeriod: "Jan 25 - Jan 26",
        eachMailboxCount: "20/50",
        storageUsed: "10GB/50GB",
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        nextBilling: "2025-01-31",
        dueDate: "2025-01-31",
        invoices: [
          { 
            invoiceId: "INV-001",
            proof: "IMG001",
          }
        ]
      },
      { 
        id: "org1-d2", 
        domain: "evelyn.id", 
        mailbox: "info@evelyn.id",
        package: "Starter Plan",
        billingPeriod: "Jan 25 - Jan 26",
        eachMailboxCount: "30/50",
        storageUsed: "15GB/50GB",
        paymentMethod: "PayPal",
        paymentStatus: "Unpaid",
        nextBilling: "2025-01-31",
        dueDate: "2025-01-31",
        invoices: [
          { 
            invoiceId: "INV-002",
            proof: "IMG002",
          }
        ]
      }
    ]
  },

  { 
    id: 2, 
    organization: "PT. Diva", 
    package: "Starter Plan", 
    orgMailboxCount: "10/50", 
    orgStatus: "Unpaid", 
    nextEarliestBilling: "2025-06-15",
    domains: [
      { 
        id: "org2-d1", 
        domain: "diva.co.id",
        mailbox: "admin@diva.co.id",
        package: "Starter Plan",
        billingPeriod: "Jun 25 - Jun 26",
        eachMailboxCount: "10/10",
        storageUsed: "5GB/10GB",
        paymentMethod: "Bank Transfer",
        paymentStatus: "Paid",
        nextBilling: "2025-06-15",
        dueDate: "2025-06-15",
        invoices: [
          { 
            invoiceId: "INV-003",
            proof: "IMG003",
          }
        ]
      }
    ]
  },
];
