import { useParams, Link } from "react-router-dom";

const MailboxDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // data dummy
  const emails: Record<string, string[]> = {
    "1": ["info@example.com", "admin@example.com", "support@example.com"],
    "2": ["hello@test.com", "team@test.com"],
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Domain Detail - ID {id}</h1>

      <ul className="list-disc pl-6 space-y-1">
        {emails[id ?? "1"]?.map((email, idx) => (
          <li key={idx}>{email}</li>
        ))}
      </ul>

      <Link to="/mailbox" className="mt-6 inline-block text-blue-600 underline">
        ← Back to Mailbox
      </Link>
    </div>
  );
};

export default MailboxDetail;
