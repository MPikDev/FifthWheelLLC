import { Link } from 'react-router';
import LegalPage, { LegalContact, LegalList, LegalSection } from '../components/LegalPage';
import { site } from '../config/site';

const link = 'font-semibold text-navy-700 underline hover:text-accent-700';

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Terms for using the Fifth Wheel LLC website and our text message (SMS) program."
      intro={
        <p>
          These Terms of Service apply to your use of the {site.name} website and our text message program. By using the
          website or opting in to text messages, you agree to these terms.
        </p>
      }
    >
      <LegalSection id="quotes" title="1. Quotes and bookings">
        <p>
          Quotes requested through this website are estimates based on the information you provide. Final pricing and
          scheduling are confirmed by our dispatch team, and a shipment is booked only once you confirm it with us.
          Additional fees apply to motorcycles and inoperable vehicles, and your dispatcher will include them in your
          quote.
        </p>
      </LegalSection>

      <LegalSection id="sms" title="2. Text messaging terms">
        <dl className="space-y-4">
          <div>
            <dt className="font-bold text-navy-900">Program</dt>
            <dd>{site.sms.programName}</dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">What we send</dt>
            <dd>
              Text messages about your quote or shipment, including {site.sms.messageTypes}. We do not send marketing
              messages.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">How to opt in</dt>
            <dd>
              Check the optional text message box on our{' '}
              <Link to="/contact#quote" className={link}>
                quote form
              </Link>
              , or text us first at {site.phone}. Consent is not a condition of purchase.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">Message frequency</dt>
            <dd>Message frequency varies, depending on your quote and shipment.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">Cost</dt>
            <dd>Message and data rates may apply, according to your mobile plan.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">How to opt out</dt>
            <dd>
              Reply <strong>STOP</strong> at any time. You’ll receive one message confirming you’ve been unsubscribed,
              and we won’t text you again unless you opt back in by replying <strong>START</strong>.
            </dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">Help</dt>
            <dd>
              Reply <strong>HELP</strong> for help, call us at{' '}
              <a href={site.phoneHref} className={link}>
                {site.phone}
              </a>
              , or email{' '}
              <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                {site.email}
              </a>
              .
            </dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">Carriers</dt>
            <dd>Mobile carriers are not liable for delayed or undelivered messages.</dd>
          </div>
          <div>
            <dt className="font-bold text-navy-900">Privacy</dt>
            <dd>
              No mobile opt-in or text message consent will be shared with third parties or affiliates. See our{' '}
              <Link to="/privacy" className={link}>
                Privacy Policy
              </Link>
              .
            </dd>
          </div>
        </dl>
      </LegalSection>

      <LegalSection id="use" title="3. Using this website">
        <LegalList>
          <li>Please give accurate information when you request a quote.</li>
          <li>Don’t misuse the website, for example by sending spam or trying to disrupt or gain unauthorized access to it.</li>
        </LegalList>
      </LegalSection>

      <LegalSection id="accuracy" title="4. Website content">
        <p>
          We work to keep the information on this website accurate, but it may change without notice and is provided
          for general information only. Our operating authority is listed under {site.usdot} and {site.mc}, and you can{' '}
          <a href={site.saferUrl} target="_blank" rel="noopener noreferrer" className={link}>
            verify it on FMCSA SAFER<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="liability" title="5. Limitation of liability">
        <p>
          To the extent allowed by law, {site.name} is not liable for indirect or consequential damages arising from
          your use of this website. Claims for loss of or damage to a vehicle in transit are handled under your
          shipping agreement and applicable law, not these website terms.
        </p>
      </LegalSection>

      <LegalSection id="law" title="6. Governing law">
        <p>These terms are governed by the laws of the State of Washington.</p>
      </LegalSection>

      <LegalSection id="changes" title="7. Changes to these terms">
        <p>
          We may update these terms from time to time. The effective date at the top of this page shows when they last
          changed.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="8. Contact us">
        <LegalContact />
      </LegalSection>
    </LegalPage>
  );
}
