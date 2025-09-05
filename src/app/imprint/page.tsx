export const metadata = { title: "Imprint — VINCERA" };

export default function Page() {
  return (
    <article className="prose lg:prose-lg mx-auto">
      <h1>Imprint</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-US")}</em></p>

      <p><strong>Operator:</strong> VINCERA</p>
      <p><strong>Address:</strong> [Your business address here]</p>
      <p><strong>Email:</strong> <a href="mailto:legal@vncra.com">legal@vncra.com</a></p>

      <h2>Dispute Resolution</h2>
      <p>We are not obligated to participate in dispute resolution before a consumer arbitration board.</p>
    </article>
  );
}
