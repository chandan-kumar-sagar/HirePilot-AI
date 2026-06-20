import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
      <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-sm prose prose-slate dark:prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: June 2026</p>

        <p className="lead text-xl">
          At HirePilot-AI, we prioritize your privacy and data security. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI career services.
        </p>

        <hr className="my-8 border-border" />

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Account Information:</strong> Name, email address, password.</li>
          <li><strong>Career Data:</strong> Resumes, cover letters, job application history, and skills.</li>
          <li><strong>Communications:</strong> Any feedback, support requests, or emails you send to us.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Provide, operate, and maintain the HirePilot-AI platform.</li>
          <li>Power our AI models to generate tailored resumes and cover letters.</li>
          <li>Improve, personalize, and expand our services.</li>
          <li>Communicate with you for customer service and updates.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:chandan99file@gmail.com" className="text-primary hover:underline">chandan99file@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
