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
        id: "d1", 
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
        id: "d2", 
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
        id: "d1", 
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


// // src/data/billingList.ts
// export const sampleData = [
//   { 
//     id: 1, 
//     organization: "PT. Evelyn", 
//     package: "Business Plan", 
//     orgMailboxCount: "50/200", 
//     orgStatus: "Active", 
//     nextEarliestBilling: "2026-01-31",
//     // domainNum: 2, // jumlah domain
//     domains: [
//       { id: "d1", 
//         domain: "evelyn.com", 
//         mailbox:"admin@evelyn.com",
//         package:"Busines Plan",
//         BillingPeriod:"Jan 25 - Jan 26",
//         mailboxCount: "20/50",
//         storageUsed:"10GB/50GB",
//         paymentMethod:"Credit Card",
//         paymentStatus:"Paid",
//         nextBilling:"01-31-25",
//         dueDate:"01-31-25",
//         usage: "20/50",
//           invoices: [
//             { invoiceNums:"INV-001",
//               proof:"IMG001",
//             }
//       ] },
//       { id: "d2", 
//         name: "evelyn.id", 
//         usage: "30/50" }
//     ]
//   },

//   { 
//     id: 2, 
//     organization: "PT. Diva", 
//     package: "Starter Plan", 
//     mailbox: "10/50", 
//     status: "Unpaid", 
//     nextBilling: "2025-06-15",
//     // domainNum: 1, // jumlah domain
//     domains: [
//       { id: "d1", name: "diva.co.id", usage: "10/10" }
//     ]
//   },
// ];
