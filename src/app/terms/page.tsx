import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Welgent",
  description:
    "Terms of service for Welgent, including SMS messaging terms, message frequency, and HELP/STOP instructions.",
  alternates: { canonical: "https://welgent.com/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 29, 2026"
      intro="These terms cover your use of the Welgent website and our SMS messaging program."
    >
      <LegalSection heading="Using this site">
        <p>
          By using welgent.com you agree to these terms. The content here is provided for information about our
          services and may change at any time. Welgent (“Welgent,” “we,” “us”)
          can be reached at <a href="mailto:matt@welgent.com">matt@welgent.com</a> or{" "}
          <a href="tel:+14438569230">(443) 856-9230</a>.
        </p>
      </LegalSection>

      {/* The A2P-relevant block. Kept together and plainly worded so a carrier
          or TCR reviewer can confirm every required element in one place. */}
      <LegalSection heading="SMS messaging terms">
        <p>
          <strong>Program description.</strong> This is a mixed messaging program: we send both conversational and
          promotional messages from the same number. Most messages relate to your inquiry — replying to your
          questions, scheduling or confirming a call or appointment, and following up about the services you asked
          about. We may also occasionally send you information about our services, availability, or offers.
        </p>
        <p>
          <strong>How you opt in.</strong> Welgent’s website has no contact forms. The only way to opt in is
          through our chat widget: you enter your name and phone number and tick a consent box. There are two
          separate boxes, one for messages about your inquiry and one for promotional messages, and both start
          unticked. You may tick either, both, or neither, and we only send the kinds of message you agreed to. We
          do not add anyone to our messaging program who has not given consent this way, and we do not buy or
          import phone number lists.
        </p>
        <p>
          <strong>Consent is not a condition of purchase.</strong> You do not have to agree to receive text
          messages in order to buy anything from us.
        </p>
        <p>
          <strong>Message frequency.</strong> Message frequency varies based on your conversation with us.
          Promotional messages, if any, are infrequent.
        </p>
        <p>
          <strong>Cost.</strong> Message and data rates may apply. Welgent does not charge for the messages
          themselves; your mobile carrier’s standard rates apply.
        </p>
        <p>
          <strong>Opting out.</strong> Reply <strong>STOP</strong> to any message to stop receiving texts from us.
          You will receive a single confirmation, and we will not send further messages unless you opt in again.
        </p>
        <p>
          <strong>Getting help.</strong> Reply <strong>HELP</strong> to any message for assistance, or contact us
          at <a href="mailto:matt@welgent.com">matt@welgent.com</a> or{" "}
          <a href="tel:+14438569230">(443) 856-9230</a>.
        </p>
        <p>
          <strong>Carriers.</strong> Mobile carriers are not liable for delayed or undelivered messages. Delivery
          is not guaranteed.
        </p>
        <p>
          <strong>Privacy.</strong>{" "}
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or promotional
            purposes. Text messaging originator opt-in data and consent will not be shared with any third
            parties.
          </strong>{" "}
          See our <Link href="/privacy">Privacy Policy</Link> for details.
        </p>
      </LegalSection>

      <LegalSection heading="Services and estimates">
        <p>
          Pricing, timelines, and deliverables discussed on this site or in conversation are estimates until set
          out in a written agreement between you and Welgent. That agreement governs the work if it conflicts with
          anything here.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The content, design, and branding on this site belong to Welgent and may not be copied or reused without
          permission.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer and limitation of liability">
        <p>
          This site is provided “as is,” without warranties of any kind. Welgent is not liable for any
          indirect or consequential damages arising from your use of this site, to the fullest extent permitted by
          law.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms from time to time. The “last updated” date above reflects the most
          recent version.
        </p>
      </LegalSection>

      <LegalSection heading="Contact us">
        <p>
          Questions about these terms? Email <a href="mailto:matt@welgent.com">matt@welgent.com</a> or call{" "}
          <a href="tel:+14438569230">(443) 856-9230</a>.
        </p>
        <p>
          Welgent
          <br />
          7412 Newham Ln
          <br />
          Sarasota, FL 34240
        </p>
      </LegalSection>
    </LegalPage>
  );
}
