import React from 'react';
import { Card, CardBody } from 'atoms';

const WizardComplete = () => (
  <Card>
    <CardBody>
      <img src="/img/done.jpg" width="100%" />
      <p className="mt-3">
        Your profile has been submitted to DigiShares. Our staff is notified and they will get back to you in a few
        working days.
      </p>
      <p>
        You will receive an email from our staff to inform whether your profile is approved or not. In case of not
        approved, our staff will describe in detail what additional information can be provided.
      </p>
      <p>
        You can re-login with your email and password and update your information. If your profile is approved then you
        can login to your investor dashboard using the same email and password.
      </p>
        You may now logout. You can also click any of the previous steps on the left side menu to review your submitted
        information, make changes and resubmit.
    </CardBody>
  </Card>
);

export default WizardComplete;
