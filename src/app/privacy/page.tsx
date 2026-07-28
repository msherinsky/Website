import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Welgent",
  description:
    "How Welgent collects, uses, and protects your information, including SMS and mobile opt-in data.",
  alternates: { canonical: "https://welgent.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 28, 2026"
      intro="This policy explains what information Welgent collects, how we use it, and the choices you have — including how we handle phone numbers and SMS consent."
    >
      <LegalSection heading="Who we are">
        <p>
          Welgent (“Welgent,” “we,” “us”) builds and manages websites, local
          SEO, call answering, and CRM automation for local service businesses. You can reach us at{" "}
          <a href="mailto:matt@welgent.com">matt@welgent.com</a> or{" "}
          <a href="tel:+14438569230">(443) 856-9230</a>.
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>
          We only collect information you choose to give us. Welgent’s website has no contact forms — the
          only place you can submit information to us is our chat widget.
        </p>
        <ul>
          <li>
            <strong>Information you provide in chat.</strong> If you start a conversation with us, we collect what
            you type — typically your name, business name, email address, and phone number, along with the
            contents of your messages.
          </li>
          <li>
            <strong>Information you send directly.</strong> If you email or call us, we keep that correspondence.
          </li>
          <li>
            <strong>Basic usage data.</strong> Standard technical information such as pages visited and general
            location, used to understand how the site performs.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <ul>
          <li>To respond to your question and follow up about our services.</li>
          <li>To send you text messages, if you have given consent (see below).</li>
          <li>To provide and improve the services you have asked us about.</li>
          <li>To meet legal or regulatory obligations.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection heading="SMS, mobile information, and consent">
        <p>
          If you provide your phone number in our chat and agree to receive text messages, you are opting in to
          receive SMS from Welgent. Message frequency varies. Message and data rates may apply. Reply{" "}
          <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for help. Consent to receive text
          messages is not a condition of purchasing anything from us.
        </p>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or promotional
            purposes. Text messaging originator opt-in data and consent will not be shared with any third
            parties.
          </strong>
        </p>
        <p>
          Full messaging terms are available in our <Link href="/terms">Terms of Service</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share information with">
        <p>
          We share information only with service providers who help us operate our business — for example our
          messaging and CRM platform, our email provider, and our website host. These providers may only use the
          information to perform services for us. We may also disclose information where required by law.
        </p>
        <p>
          As stated above, mobile opt-in data and SMS consent are never shared with third parties for their own
          marketing purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <ul>
          <li>Reply STOP to any text message to stop receiving SMS from us.</li>
          <li>
            Email <a href="mailto:matt@welgent.com">matt@welgent.com</a> to ask what information we hold about
            you, correct it, or request deletion.
          </li>
          <li>Ask us at any time to stop contacting you.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Data retention and security">
        <p>
          We keep information only as long as needed for the purposes described here or as required by law, and we
          use reasonable safeguards to protect it. No method of transmission or storage is completely secure, so we
          cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          Our services are intended for businesses and are not directed to anyone under 18. We do not knowingly
          collect information from children.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy from time to time. The “last updated” date above reflects the most
          recent version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about this policy? Email <a href="mailto:matt@welgent.com">matt@welgent.com</a> or call{" "}
          <a href="tel:+14438569230">(443) 856-9230</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
