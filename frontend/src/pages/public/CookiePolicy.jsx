import React from "react";

export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
      <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold mb-2">Cookie Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: June 2026</p>

        <p className="lead text-xl">
          This Cookie Policy explains how HirePilot-AI uses cookies and similar tracking technologies to recognize you when you visit our website.
        </p>

        <hr className="my-8 border-border" />

        <h2 className="text-2xl font-bold mt-8 mb-4">1. What are cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. Why do we use cookies?</h2>
        <p>We use first-party and third-party cookies for several reasons:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Essential Cookies:</strong> Required for technical reasons in order for our website to operate (e.g., keeping you logged in).</li>
          <li><strong>Performance Cookies:</strong> To track information about how the website is used so we can make improvements.</li>
          <li><strong>Functionality Cookies:</strong> To remember choices you make (like your dark mode preference).</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
        </p>
      </div>
    </div>
  );
}
