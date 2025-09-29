// src/data/sampleData.ts
// domain == mailbox


export const sampleData = [
  { 
    id: 1, 
    organization: "PT. Evelyn", 
    package: "Business Plan", 
    mailboxTotal: "50/200", 
    storageUsed: "50GB/300GB", 
    orgStatus: "Active", 
    // expiryDate: "2026-01-31",
    domains: [
      { 
        id: "org1-d1", 
        domain: "evelyn.com", 
        mailbox: "admin@evelyn.com",
        package: "Business Plan",
        billingPeriod: "Jan 25 - Jan 26",
        domMailboxCount: "30/100",
        domStorageUsed: "30GB/150GB",
        mailStorageUsed:"2GB/5GB",
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        lastPayment:"2024-01-30",
        nextBilling:"2026-01-01",
        domStatus:"Active",
        expiryDate: "2025-01-31",
        // dueDate: "2025-01-31",
        authentications: [
          {
            securityStatus: "Enabled",
            createdAt:"2025-09-29 10:30",
            role:"Client",
            activityLogs: [
              { id: "a1", user: "admin@evelyn.com", activity: "Login", timestamp: "2025-09-29 09:00" },
              { id: "a2", user: "info@evelyn.id", activity: "Password Change", timestamp: "2025-09-29 09:30" },
            ]        
          }
        ],
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
        domMailboxCount: "20/100",
        domStorageUsed: "20GB/150GB",
        mailStorageUsed:"2GB/5GB",
        paymentMethod: "PayPal",
        paymentStatus: "Unpaid",
        lastPayment:"2024-01-30",
        nextBilling:"2026-01-01",
        expiryDate: "2025-01-31",
        domStatus:"Active",
        // dueDate: "2025-01-31",
        authentications: [
          {
            securityStatus: "Enabled",
            role:"Client",
            createdAt:"2025-09-29 10:30",
            activityLogs: [
              { id: "a1", user: "admin@evelyn.com", activity: "Login", timestamp: "2025-09-29 09:00" },
              { id: "a2", user: "info@evelyn.id", activity: "Password Change", timestamp: "2025-09-29 09:30" },
            ]        
          }
        ],
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
    mailboxTotal: "10/50", 
    storageUsed: "50GB/200GB", 
    orgStatus: "Unpaid", 
    // expiryDate: "2025-06-15",
    domains: [
      { 
        id: "org2-d1", 
        domain: "diva.co.id",
        mailbox: "admin@diva.co.id",
        package: "Starter Plan",
        billingPeriod: "Jun 25 - Jun 26",
        domMailboxCount: "10/10",
        domStorageUsed: "5GB/10GB",
        mailStorageUsed:"2GB/5GB",
        paymentMethod: "Bank Transfer",
        paymentStatus: "Paid",
        lastPayment:"2024-01-30",
        nextBilling:"2026-01-01",
        domStatus:"Active",
        expiryDate: "2025-06-15",
        // dueDate: "2025-06-15",
        authentications: [
          {
            securityStatus: "Enabled",
            createdAt:"2025-09-29 10:30",
            role:"Client",
            activityLogs: [
              { id: "a1", user: "admin@evelyn.com", activity: "Login", timestamp: "2025-09-29 09:00" },
              { id: "a2", user: "info@evelyn.id", activity: "Password Change", timestamp: "2025-09-29 09:30" },
            ]        
          }
        ],
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
