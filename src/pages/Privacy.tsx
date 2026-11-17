import { Link } from 'react-router';
import LegalPage, { LegalContact, LegalList, LegalSection } from '../components/LegalPage';
import { site } from '../config/site';

const link = 'font-semibold text-navy-700 underline hover:text-accent-700';

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How Fifth Wheel LLC collects, uses and protects your information, including text message (SMS) consent."
      intro={
        <p>
          This Privacy Policy explains how {site.name} (“we,” “us” or “our”) collects, uses and protects information when
          you visit our website, request a quote, or contact us by phone, email or text message.
        </p>
      }
    >
      <LegalSection id="collect" title="1. Information we collect">
        <p>
          <strong className="text-navy-900">Information you give us.</strong> When you request a quote, we collect your
          name, email address, phone number, preferred contact method, pickup and delivery locations, preferred pickup
          date, vehicle details, any notes you add, and whether you agreed to receive text messages. We also collect the
          information you share when you call, email or text us.
        </p>
        <p>
          <strong className="text-navy-900">Information collected automatically.</strong> Like most websites, our server
          records basic technical information such as your IP address, browser type and the pages you request. We use it
          to keep the site secure, prevent spam and fix problems. We do not use advertising or tracking cookies.
        </p>
      </LegalSection>

      <LegalSection id="use" title="2. How we use your information">
        <LegalList>
          <li>To prepare your quote and contact you by the method you choose.</li>
          <li>To schedule, arrange and carry out your vehicle transport.</li>
          <li>To send updates about your quote or shipment, and to answer your questions.</li>
          <li>To keep records of your consent to receive text messages.</li>
          <li>To meet our legal and regulatory obligations as a licensed motor carrier.</li>
          <li>To protect our website and customers from spam, fraud and abuse.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="sms" title="3. Text messages (SMS)">
        <p>
          If you agree to receive text messages, for example by checking the optional box on our quote form or by texting
          us first, we use your mobile number to send you {site.sms.messageTypes}. Consent is not a condition of purchase.
        </p>
        <LegalList>
          <li>Message frequency varies.</li>
          <li>Message and data rates may apply.</li>
          <li>Reply STOP at any time to opt out. Reply HELP for help.</li>
        </LegalList>
        <p className="rounded-2xl border-l-4 border-accent-500 bg-accent-50 p-5 font-semibold text-navy-900">
          No mobile opt-in or text message consent will be shared with third parties or affiliates. No mobile information
          will be shared with third parties or affiliates for marketing or promotional purposes.
        </p>
        <p>
          Our text messaging service provider handles your number only to send and receive messages on our behalf. Every
          kind of sharing described in the next section excludes text messaging opt-in data and consent. See our{' '}
          <Link to="/terms#sms" className={link}>
            Text Messaging Terms
          </Link>{' '}
          for full program details.
        </p>
      </LegalSection>

      <LegalSection id="share" title="4. How we share information">
        <p>
          <strong className="text-navy-900">We do not sell or rent your personal information.</strong> We share it only
          as needed to provide our services:
        </p>
        <LegalList>
          <li>
            <strong className="text-navy-900">Transport partners.</strong> If another licensed carrier moves your
            vehicle, we share the details needed for the job, such as names, pickup and delivery addresses, contact
            numbers and vehicle information.
          </li>
          <li>
            <strong className="text-navy-900">Service providers.</strong> Companies that host our website or provide our
            email and phone services, only so they can perform those services for us.
          </li>
          <li>
            <strong className="text-navy-900">Legal requirements.</strong> When required by law, or to protect our
            rights, our customers or others.
          </li>
        </LegalList>
      </LegalSection>

      <LegalSection id="retention" title="5. How long we keep information">
        <p>
          We keep information for as long as needed to provide quotes and transport services, to keep the business
          records the law requires, and to show that we have your consent to receive text messages.
        </p>
      </LegalSection>

      <LegalSection id="security" title="6. Security">
        <p>
          Our website uses encrypted connections (HTTPS), and we take reasonable steps to protect your information. No
          method of transmission or storage is completely secure, but we work to keep your information safe.
        </p>
      </LegalSection>

      <LegalSection id="choices" title="7. Your choices">
        <LegalList>
          <li>Reply STOP to any text message to stop receiving texts. Reply START to opt back in.</li>
          <li>Contact us to ask what information we have about you, or to correct or delete it.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="children" title="8. Children">
        <p>Our website and services are not directed to children under 13, and we do not knowingly collect their information.</p>
      </LegalSection>

      <LegalSection id="changes" title="9. Changes to this policy">
        <p>
          We may update this policy from time to time. The effective date at the top of this page shows when it last
          changed.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="10. Contact us">
        <p>Questions about this policy or your information? Contact us:</p>
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
