import React, { useState } from "react";
import Popup from "../../components/Popup"; // adjust path if needed

const NewDomain: React.FC = () => {
  const [query, setQuery] = useState("");
  const [domains, setDomains] = useState<{ name: string; price: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // popup states
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<{ name: string; price: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    setTimeout(() => {
      const extensions = [".net", ".org", ".blog", ".tech", ".io", ".com"];
      const randomPrices: string[] = ["$5.99", "$7.49", "$9.99", "$12.99"];

      const generated = extensions.map((ext) => ({
        name: `${query}${ext}`,
        price: randomPrices[Math.floor(Math.random() * randomPrices.length)] || "$9.99",
      }));

      setDomains(generated);
      setLoading(false);
    }, 1000); // simulate API delay
  };

  const handleBuyOpen = (domain: { name: string; price: string }) => {
    setSelectedDomain(domain);
    setIsOpen(true);
  };

  return (
    <div className="pl-30 pr-30 pt-15">
      <div className="mb-9">
        <h1 className="text-2xl font-bold mb-2">Register Domain</h1>
        <p>
          Type your desired domain name into the domain checker search bar and
          find out if it's available.
        </p>
      </div>

      {/* Search Form */}
      <form className="flex items-center w-full max-w-2xl" onSubmit={handleSearch}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Enter your desired domain name..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {loading ? (
            <svg
              className="w-4 h-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {domains.length > 0 && (
          <div className="space-y-3">
            {domains.map((domain, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border p-3 rounded-lg bg-white shadow-sm"
              >
                <span className="font-medium">{domain.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">{domain.price}</span>
                  <button
                    onClick={() => handleBuyOpen(domain)}
                    className="px-3 py-1 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup */}
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose billing period - xxx.xxx"
        footer={
          <button
            onClick={() => {
              alert(`Proceeding to payment for ${selectedDomain?.name}`);
              setIsOpen(false);
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        }
      >
        {selectedDomain && (
          <div>
            <ul>
                <li className="flex justify-between border border-gray-300 p-3 mb-2">
                    <span>3 years</span>
                    <span>$7.99</span>
                </li>

                <li className="flex justify-between border border-gray-300 p-3 mb-2">
                    <span>2 years</span>
                    <span>$7.99</span>
                </li>

                <li className="flex justify-between border border-gray-300 p-3">
                    <span>1 years</span>
                    <span>$7.99</span>
                </li>
            </ul>

            <div className="mt-5 bg-gray-100">
                <tr>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                    <td>aaa</td>
                </tr>
            </div>

            
            <p>
              You are buying: <b>{selectedDomain.name}</b>
            </p>
            <p className="mt-2">Price: {selectedDomain.price}</p>
          </div>
        )}
      </Popup>
    </div>
  );
};

export default NewDomain;
