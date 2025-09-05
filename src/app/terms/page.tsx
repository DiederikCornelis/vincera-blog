export const metadata = { title: "Terms of Service — VINCERA" };

export default function Page() {
  return (
    <article className="prose lg:prose-lg mx-auto">
      <h1>Terms of Service</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-US")}</em></p>

      <h2>Use of the site</h2>
      <p>By accessing this website you agree to these terms and all applicable laws and regulations.</p>

      <h2>Intellectual property</h2>
      <p>All content is owned by VINCERA or its licensors unless stated otherwise.</p>

      <h2>Liability</h2>
      <p>This website is provided “as is” without warranties of any kind to the fullest extent permitted by law.</p>
    </article>
  );
}
