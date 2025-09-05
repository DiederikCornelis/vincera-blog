export const metadata = { title: "Privacy Policy — VINCERA" };

export default function Page() {
  return (
    <article className="prose lg:prose-lg mx-auto">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-US")}</em></p>

      <p>This Privacy Policy explains how we collect, use, and protect your information when you use this website.</p>

      <h2>Data we process</h2>
      <ul>
        <li>Essential technical data (required for security and performance).</li>
        <li>Analytics data (only with your consent).</li>
        <li>Contact data if you voluntarily submit forms or emails.</li>
      </ul>

      <h2>Legal bases (GDPR)</h2>
      <ul>
        <li>Performance of a contract or steps prior to entering into a contract.</li>
        <li>Legitimate interests (security, fraud prevention, site functionality).</li>
        <li>Consent (analytics/marketing).</li>
      </ul>

      <h2>Data retention</h2>
      <p>We retain data only as long as necessary for the purposes described or as required by law.</p>

      <h2>Your rights</h2>
      <ul>
        <li>Access, rectification, erasure, restriction, portability, and objection.</li>
      </ul>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:legal@vncra.com">legal@vncra.com</a></p>
    </article>
  );
}
