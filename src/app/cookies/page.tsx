import CookieSettings from "@/components/legal/CookieSettings";

export const metadata = { title: "Cookies Policy — VINCERA" };

export default function Page() {
  return (
    <article className="prose lg:prose-lg mx-auto">
      <h1>Cookies Policy</h1>
      <p><em>Last updated: {new Date().toLocaleDateString("en-US")}</em></p>

      <p>We use essential cookies to operate this site. With your consent, we also use analytics and marketing cookies.</p>

      <h2>Manage your preferences</h2>
      <div className="not-prose my-4">
        <CookieSettings />
      </div>

      <h2>Categories</h2>
      <ul>
        <li><strong>Necessary</strong> — required for core site functionality.</li>
        <li><strong>Analytics</strong> — to understand usage and improve the site.</li>
        <li><strong>Marketing</strong> — to personalize content and measure campaigns.</li>
      </ul>
    </article>
  );
}
