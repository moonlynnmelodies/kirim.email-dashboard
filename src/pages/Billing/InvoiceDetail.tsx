import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Popup from "../../components/Popup";
import { sampleData } from "../../data/sampleData";

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // console.log("URL param id:", id);

  const [isOpen, setIsOpen] = useState(false);



   ////// search data in sampleData /////////////////
   const organization = sampleData.find(org =>
    org.domains.some(d => d.id === id)
  );

  // console.log("URL param organization:", organization);


  const domain = organization?.domains.find(d => d.id === id);
  
  if (!domain || !organization) {
    return <p className="p-4 text-red-500">Domain not found</p>;
  }
  ///////////////// search data in sampleData /////////////////


  ///////////// Popup /////////////////////////
  interface Invoice {
    invoiceId: string;
    proof: string;
  }
  
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  ///////////// Popup /////////////////////////



  return (
    <div>
      {/* Top search bar */}
      <div className="bg-white rounded-md flex justify-start items-center h-14 shadow-sm pl-4">
        <svg
          className="w-4 h-4 text-gray-500 pr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search invoice..."
          className="max-w-sm w-full rounded-lg p-2 text-sm focus:outline-none focus:ring-0"
        />
        <div className="ml-auto mr-4">
          <img
            src="/src/assets/images/profile.png"
            className="h-9 w-9 rounded-full object-cover cursor-pointer"
            alt="Profile"
          />
        </div>
      </div>

      {/* Invoice Table */}
      <div className="mt-7 bg-white p-4 rounded-md shadow-sm">
        {/* Back button */}
        <Link to="/billing/invoice" className="flex items-center mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>

        <table className="table-auto w-full border-separate border-spacing-y-2 px-4">
          <thead>
            <tr>
              <td colSpan={10}>
                <h1 className="text-2xl font-bold mb-5"> Domain {domain.domain} ({domain.mailbox})</h1>
                <div className="flex justify-between mb-6">
                  <p className="text-gray-600 text-sm">Manage invoice details of {domain.domain}.</p>
                  <button className="px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition">
                    Add New
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-left capitalize">
              <th>Mailbox</th>
              <th>Invoice #</th>
              <th>Billing Period</th>
              <th>Package</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Due Date</th>
              <th>Proof</th>
              <th>Action</th>
            </tr>

            <tr>
              <td colSpan={10}>
                <hr className="h-0.5 border-0 bg-neutral-200 mt-3" />
              </td>
            </tr>
          </thead>
          <tbody>
          {domain.invoices.map((invoice) => (
            <tr key={invoice.invoiceId} className="hover:bg-gray-50">
              <td className="py-2">{domain.mailbox}</td>
              <td className="py-2">{invoice.invoiceId}</td>
              <td className="py-2">{domain.billingPeriod}</td>
              <td className="py-2">{domain.package}</td>
              <td className="py-2">{domain.storageUsed}</td>
              <td className="py-2">{domain.paymentMethod}</td>
              <td className="py-2">{domain.dueDate}</td>
              <td className="py-2">{invoice.proof}</td>
              <td className="py-2">
                <div className="flex justify-start">
                    {/* View button */}
                    <button 
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsOpen(true);
                        }}
                        className="text-blue-600 p-1 rounded hover:bg-gray-200 text-sm cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                    </button>

                    {/* Edit button */}
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5.5 cursor-pointer text-green-500 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    {/* Delete button */}
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5.5 text-red-500 cursor-pointer ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>

                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {/* Popup */}
<Popup
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title={`Invoice ${selectedInvoice?.invoiceId || ""}`}
>
  <div className="space-y-2 text-sm">
    <form>
      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="invoice_id" className="block mb-2 text-sm font-medium text-black">
            Invoice ID
          </label>
          <input
            type="text"
            id="invoice_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="INV-001"
            required
            value={selectedInvoice?.invoiceId || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="domain" className="block mb-2 text-sm font-medium text-black">
            Domain
          </label>
          <input
            type="text"
            id="domain"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.domain || ""}
            required
            value={domain?.domain || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="package" className="block mb-2 text-sm font-medium text-black">
            Package
          </label>
          <input
            type="text"
            id="package"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.package || ""}
            required
            value={domain?.package || ""}
            readOnly
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="billing_period" className="block mb-2 text-sm font-medium text-black">
            Billing Period
          </label>
          <input
            type="text"
            id="billing_period"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.billingPeriod || ""}
            required
            value={domain?.billingPeriod || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.storageUsed || ""}
            required
            value={domain?.storageUsed || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="payment_method" className="block mb-2 text-sm font-medium text-black">
            Payment Method
          </label>
          <input
            type="text"
            id="payment_method"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.paymentMethod || ""}
            required
            value={domain?.paymentMethod || ""}
            readOnly
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-3">
        <div>
          <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-black">
            Due Date
          </label>
          <input
            type="text"
            id="due_date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={domain?.dueDate || ""}
            required
            value={domain?.dueDate || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="proof" className="block mb-2 text-sm font-medium text-black">
            Proof
          </label>
          <input
            type="text"
            id="proof"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={selectedInvoice?.proof || ""}
            required
            value={selectedInvoice?.proof || ""}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-black">
            Status
          </label>
          <input
            type="text"
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Paid / Unpaid"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                   focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                   px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </div>
</Popup>

    </div>
  );
};

export default InvoiceDetail;

