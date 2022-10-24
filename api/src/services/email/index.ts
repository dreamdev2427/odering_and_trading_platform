import { Stos, Investor, PaymentChannels, ShareTypes, InvestorBuyPropertyAlert } from 'entities';
import { SignUpInput } from 'api/investor/investor.types';
import { fetchUserByStoID } from 'services/admin/fetchUser';
import { Users } from 'DBSchema';
import { InvestorDepositWithdrawAlertInput } from 'api/deposit-alert/deposit-alert.types';
import { isMarketSpace } from 'core/feature-flags-checkers';
import { NetkiParamJson } from '../externalKyc/netki/netki-declarations';
import Mailer from './mailer';
import * as en from './en.json';

class Email {
  private sto: Stos;

  constructor(sto: Stos) {
    this.sto = sto;
  }

  private locale(type: keyof typeof en): { subject: string; text: string[] } {
    return en[type];
  }

  /** Prepends \ to special symbols for regex */
  private escapeRegExp = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /**
   * Fills in an email with tag replacement
   * @param str Your email text containing placeholder tags
   *
   * Example: "Dear {firstname} {lastname}"
   * @param tags An object with tag values
   *
   * Example:
   * { firstname: "John", lastname: "Doe" }
   */
  private format = (string: string, tags: { [key: string]: string }): string => {
    let str = string;
    Object.keys(tags).forEach((key) => {
      str = str.replace(new RegExp(this.escapeRegExp(`{${key}}`), 'g'), tags[key]);
    });
    return str;
  };

  private footer() {
    return `
<br /><br />
${this.sto.emailFooter || ''}
    `;
  }

  async emailFromInvestor(title: string, content: string): Promise<unknown> {
    const { subject, text } = this.locale('emailFromInvestor');

    const html = `
Hi 
<br /><br />
${text.join('<br /><br />')}
<br /><br />
<b>${title}</b>
<br /><br />
${content}
${this.footer()}
`;

    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, subject, html);
  }

  async verifyEmail(
    { firstName, lastName, email }: SignUpInput,
    verifyToken: string,
  ): Promise<unknown> {
    const isMs = await isMarketSpace();
    const { subject, text } = isMs
      ? this.locale('verifyEmailMarketspace')
      : this.locale('verifyEmail');

    const link = `${process.env.VERIFY_URL}${verifyToken}`;
    const html = `
Dear ${firstName} ${lastName},
<br /><br />
${text.join('<br /><br />')}
<br /><br />
  <a href="${link}" > VERIFY MY EMAIL </a>
${this.footer()}
`;

    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async sendToAllNotificationEmail(
    investorIDs: number[],
    sender: string,
    message: string,
  ): Promise<boolean> {
    const { subject, text } = this.locale('sendToAllNotificationEmail');
    const mailer = await Mailer.build();
    for (const investorID of investorIDs) {
      const investor = await Investor.findOne({ ID: investorID });
      if (investor) {
        const { firstName, lastName, email } = investor;
        const html = `
        Dear ${firstName} ${lastName},
        <br /><br />
        ${text} <strong>${sender}</strong>
        <br /><br />
        <em>"${message}"</em>
        <br /><br />
        <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a>
        ${this.footer()}
      `;
        await mailer.send(email, subject, html);
      }
    }
    return true;
  }

  async notificationEmailForInvestor(investorID: number, sender: string): Promise<boolean> {
    const { subject, text } = this.locale('notificationEmailForInvestor');
    const investor = await Investor.findOne({ ID: investorID });
    if (!investor) {
      return false;
    }
    const { firstName, lastName, email } = investor;
    const html = `
      Dear ${firstName} ${lastName},
      <br /><br />
      ${text} <strong>${sender}</strong>
      <br /><br />
      <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a>
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    await mailer.send(email, subject, html);
    return true;
  }

  async notificationEmailForAdmin(investorID: number): Promise<boolean> {
    const { subject, text } = this.locale('notificationEmailForAdmin');
    const investor = await Investor.findOne({ ID: investorID });
    if (!investor) {
      return false;
    }
    const { firstName, lastName } = investor;
    const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
      ${text} <strong>${firstName} ${lastName}</strong>
      <br /><br />
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    await mailer.send(this.sto.SMTP_FromAddress, subject, html);
    return true;
  }

  async newUserSignUpEmailForAdmin(investor: Investor): Promise<unknown> {
    const { subject, text } = this.locale('newUserSignUpEmailForAdmin');
    const userFullName = `${investor.firstName} ${investor.lastName}`;
    const html = `
    Dear Admin,
    <br /><br />
    ${this.format(text.join('<br /><br />'), {
      fullName: userFullName,
      email: investor.email,
      number: investor.phone,
    })}`;
    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, subject, html);
  }

  async newUserSignUpEmailForUser(fullName: string, email: string): Promise<unknown> {
    const { subject, text } = this.locale('newUserSignUpEmailForUser');
    const html = `
      Dear ${fullName},
      <br /><br />
      ${text} <strong>${this.sto.title}</strong>
      <br /><br />
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async documentSubscriptionReminderEmail({
    firstName,
    lastName,
    email,
  }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('documentSubscriptionReminderEmail');
    const html = `
      Dear ${firstName} ${lastName},
      <br /><br />
      ${text} <strong>${this.sto.title}</strong>
      <br /><br />
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async documentSubscriptionCompletedEmailForInvestor(investorID: number): Promise<unknown> {
    const { subject, text } = this.locale('documentSubscriptionCompletedEmail');
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const { firstName, lastName, email } = investor;
      const html = `
      Dear ${firstName} ${lastName},
      <br /><br />
      ${text} Project <strong>${this.sto.title}</strong>
      <br /><br />
      ${this.footer()}
    `;
      const mailer = await Mailer.build();
      return mailer.send(email, subject, html);
    } else {
      return false;
    }
  }

  async documentSubscriptionCompletedEmailForAdmin(investorID: number): Promise<unknown> {
    const { subject, text } = this.locale('documentSubscriptionCompletedEmail');
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const { firstName, lastName } = investor;
      const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
      ${text} Investor : <strong>${firstName} ${lastName}</strong>
      <br /><br />
      ${this.footer()}
    `;
      const mailer = await Mailer.build();
      return mailer.send(this.sto.SMTP_FromAddress, subject, html);
    } else {
      return false;
    }
  }

  async userProfileUpdatedEmail({ firstName, lastName }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('userProfileUpdatedEmail');
    const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
      ${text} <strong>${firstName} ${lastName}</strong>
      <br /><br />
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, subject, html);
  }

  async offerSubmittedEmail(
    investorID: number,
    purchasePriceOffered: number,
    shareClassName: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('purchaseAlertCreated-Admin');
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const userFullName = `${investor.firstName} ${investor.lastName}`;
      const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
    ${this.format(text.join('<br /><br />'), {
      shareClassName,
      price: purchasePriceOffered.toString(),
      fullName: userFullName,
      stoTitle: this.sto.title,
    })}
      <br /><br />
      ${this.footer()}`;
      const formatedSubject = `
    ${this.format(subject, {
      shareClassName,
      price: purchasePriceOffered.toString(),
    })}`;
      const mailer = await Mailer.build();
      return mailer.send(this.sto.SMTP_FromAddress, formatedSubject, html);
    } else {
      return false;
    }
  }

  async documentsESignedEmail(
    investorID: number,
    purchasePriceOffered: number,
    shareClassName: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('documentsESignedEmail-Admin');
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const userFullName = `${investor.firstName} ${investor.lastName}`;
      const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
    ${this.format(text.join('<br /><br />'), {
      shareClassName,
      stoTitle: this.sto.title,
      price: purchasePriceOffered.toString(),
      fullName: userFullName,
    })}
      <br /><br />
      ${this.footer()}`;
      const formatedSubject = `${this.format(subject, {
        shareClassName,
        price: purchasePriceOffered.toString(),
      })}`;
      const mailer = await Mailer.build();
      return mailer.send(this.sto.SMTP_FromAddress, formatedSubject, html);
    } else {
      return false;
    }
  }

  async verificationUploadedEmail({ firstName, lastName }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('verificationUploadedEmail');
    const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
      ${text} <strong>${firstName} ${lastName}</strong>
      <br /><br />
      ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, subject, html);
  }

  async finalizedInvestmentEmail(investorID: number): Promise<unknown> {
    const { subject, text } = this.locale('finalizedInvestmentEmail');
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const { firstName, lastName } = investor;
      const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
      ${text} <strong>${firstName} ${lastName}</strong>
      <br /><br />
      ${this.footer()}
    `;
      const mailer = await Mailer.build();
      return mailer.send(this.sto.SMTP_FromAddress, subject, html);
    } else {
      return false;
    }
  }

  async send2FAEmail({ firstName, lastName, email, twoFactorCode }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('send2FAEmail');

    const html = `
Dear ${firstName} ${lastName}
<br /><br />
${text.join('<br /><br />')} <h1>${twoFactorCode}</h1>
${this.footer()}
`;

    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async resetEmail({ firstName, lastName, email }: Investor, token: string): Promise<unknown> {
    const { subject, text } = this.locale('resetEmail');

    const nonTrailingEnv =
      process.env.FRONTEND_URL?.slice(-1) === '/'
        ? process.env.FRONTEND_URL.slice(0, -1)
        : process.env.FRONTEND_URL;

    const link = `${nonTrailingEnv}/new-password/${token}`;
    const html = `
Dear ${firstName} ${lastName}
<br /><br />
${text.join('<br /><br />')}
<br /><br />
<a href="${link}" > Set new Password </a>
${this.footer()}
`;

    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async notifyNewSubmission({ firstName, lastName, ID }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('newSubmission');

    const html = `
Dear Admin
<br /><br />
${text.join('<br /><br />')}
<br /><br />
New Investor : ${firstName} ${lastName} ( ID ${ID} )
${this.footer()}
`;

    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, subject, html);
  }

  async instructionalEmail(
    { firstName, lastName, ID, email }: Investor,
    channel: PaymentChannels,
    details: string,
  ): Promise<unknown> {
    const instructions = channel.depositInstructionText
      .replace('{{ID}}', ID.toString())
      .replace('{{InvestorID}}', ID.toString())
      .replace('{{FirstName}}', firstName)
      .replace('{{LastName}}', lastName)
      .replace('{{FirstName LastName}}', `${firstName} ${lastName}`)
      .replace('{{PaymentChannelName}}', `${channel.title}`)
      .replace('{{Sto.title}}', `${this.sto.title}`);
    const html = `Dear ${firstName} ${lastName},<br/><br/> ${instructions}  </br> ${details}
${this.footer()}
`;
    const mailer = await Mailer.build();
    return mailer.send(email, channel.depositInstructionEmailHeader, html);
  }

  async mercuryDepositInstructionEmail(
    ID: number,
    accountNumber: string,
    routingNumber: string,
    note: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('mercuryDepositInstructionEmail');
    const investor = await Investor.findOneOrFail(ID);

    const html = `
    ${this.format(text.join('<br /><br />'), {
      accountNumber: accountNumber,
      routingNumber: routingNumber,
      note: note,
    })}
    ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(investor.email, subject, html);
  }

  async marketSpaceIntroduction(
    firstName: string,
    activationLink: string,
    sponsorTitle: string,
    email: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('marketSpaceIntroduction');
    activationLink = `<a href="${activationLink}" >Please click here to activate your account.</a>`;
    const html = `
    ${this.format(text.join('<br /><br />'), {
      firstName: firstName,
      activationLink: activationLink,
      sponsorTitle: sponsorTitle,
    })}
    ${this.footer()}
    `;
    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async marketSpaceNewUserSignUpEmailForUser(
    firstName: string,
    consultationLink: string,
    email: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('marketSpaceNewUserSignUpEmailForUser');
    consultationLink = `<a href="${consultationLink}" >schedule a free consultation</a>`;
    const html = `
      ${this.format(text.join('<br /><br />'), {
        firstName: firstName,
        consultationLink: consultationLink,
      })}
      ${this.footer()}
      `;
    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async marketSpacePasswordReset({ firstName, email }: Investor, token: string): Promise<unknown> {
    const { subject, text } = this.locale('marketSpacePasswordReset');
    const nonTrailingEnv =
      process.env.FRONTEND_URL?.slice(-1) === '/'
        ? process.env.FRONTEND_URL.slice(0, -1)
        : process.env.FRONTEND_URL;
    const passwordResetLink = `${nonTrailingEnv}/new-password/${token}`;
    const html = `
      ${this.format(text.join('<br /><br />'), {
        firstName: firstName,
        passwordResetLink: passwordResetLink,
      })}
      ${this.footer()}
      `;
    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async marketSpaceDocumentSubscriptionReminderEmail(
    firstName: string,
    email: string,
  ): Promise<unknown> {
    const { subject, text } = this.locale('marketSpaceDocumentSubscriptionReminderEmail');
    const finalSubject = `${subject} | ${this.sto.title}`;
    const resumeLink = `<a href="${process.env.FRONTEND_URL}">HERE</a>`;
    const html = `
      ${this.format(text.join('<br /><br />'), {
        firstName: firstName,
        projectName: this.sto.title,
        resumeLink: resumeLink,
      })}
      ${this.footer()}
      `;
    const mailer = await Mailer.build();
    return mailer.send(email, finalSubject, html);
  }

  async marketSpaceDocumentSubscriptionCompletedEmail(investorID: number): Promise<unknown> {
    const { subject, text } = this.locale('marketSpaceDocumentSubscriptionCompletedEmail');
    const finalSubject = `${subject} | ${this.sto.title}`;
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const { firstName, email } = investor;
      const html = `
      ${this.format(text.join('<br /><br />'), {
        firstName: firstName,
        projectName: this.sto.title,
      })}
      ${this.footer()}
      `;
      const mailer = await Mailer.build();
      return mailer.send(email, finalSubject, html);
    } else {
      return false;
    }
  }

  async marketSpaceFinalizedInvestmentEmail(investorID: number): Promise<unknown> {
    const { subject, text } = this.locale('marketSpaceFinalizedInvestmentEmail');
    const finalSubject = `${this.sto.title} ${subject}`;
    const investor = await Investor.findOne({ ID: investorID });
    if (investor) {
      const { firstName, email } = investor;
      const html = `
      ${this.format(text.join('<br /><br />'), {
        firstName: firstName,
        projectName: this.sto.title,
        marketSpaceLink: process.env.FRONTEND_URL || '',
      })}
      ${this.footer()}
      `;
      const mailer = await Mailer.build();
      return mailer.send(email, finalSubject, html);
    } else {
      return false;
    }
  }

  async adminInstructionalEmail(
    { firstName, lastName, ID }: Investor,
    channel: PaymentChannels,
    { isWithdrawRequest, amount }: InvestorDepositWithdrawAlertInput,
  ): Promise<unknown> {
    const users: Users[] = await fetchUserByStoID(this.sto.ID);
    let instructions =
      channel.adminEmailBody ||
      `<br/> Investor <b> {{FirstName LastName}} </b> with <b> {{ID}} </b> has {{action}} {{currencySymbol}}<b> {{amount}} </b>  via {{PaymentChannelName}}. <br>Please login to STO {{sto.title}} dashboard and review the request.`;

    const currency = await channel.currency;
    instructions = instructions
      .replace(/{{ID}}/i, ID.toString())
      .replace(/{{InvestorID}}/i, ID.toString())
      .replace(/{{FirstName LastName}}/i, `${firstName} ${lastName}`)
      .replace(/{{PaymentChannelName}}/i, `${channel.title}`)
      .replace(/{{Sto.title}}/i, `${this.sto.title}`)
      .replace(/{{currencySymbol}}/i, `${currency.symbol}`)
      .replace(/{{amount}}/i, `${amount}`)
      .replace(/{{action}}/i, `${isWithdrawRequest ? 'withdrawn' : 'deposited'}`);

    const html = `<br/>${instructions}
<br /><br />
${this.sto.emailFooter || ''}
`;
    const mailer = await Mailer.build();
    return users.map(async (user) => {
      const htmlTxt = `Dear ${user.FirstName} ${user.LastName}, STO Admin ${html}`;
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email ?? '')) return false;
      return mailer.send(
        user.email ?? '',
        channel.adminEmailHeader || 'New STO Transaction Request',
        htmlTxt,
      );
    });
  }

  prepareDetails(details: string): string {
    return details.replace(/(?:\\[r]|[\r]+)+/g, '<br/>');
  }

  async enableDisableInvestorAccount(
    { firstName, lastName, email }: Investor,
    isActive: boolean,
  ): Promise<unknown> {
    const { subject, text } = isActive
      ? this.locale('enableInvestorAccountEmail')
      : this.locale('disableInvestorAccountEmail');
    const html = `Dear ${firstName} ${lastName} <br /><br /> ${text} <br /><br /> ${
      this.sto.emailFooter ?? ''
    }`;

    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async sendNetkiSignUpEmail(
    { firstName, lastName, email }: Investor,
    netkiParam: NetkiParamJson,
  ): Promise<unknown> {
    const { emailHeader, emailBody, mobileAppPanel } = netkiParam;
    const { subject, text } = this.locale('netkiSignUpEmail');
    const html = `Dear ${firstName} ${lastName} <br /><br /> ${emailBody || text} <br /><br /> 
${mobileAppPanel || ''}
<br/> <br/>
${this.sto.emailFooter ?? ''}`;

    const mailer = await Mailer.build();
    return mailer.send(email, emailHeader || subject, html);
  }

  async sendEntityAccreditationApproved({
    firstName,
    lastName,
    email,
  }: Investor): Promise<unknown> {
    const { subject, text } = this.locale('entityAccreditationApproved');
    const html = `
      Dear ${firstName} ${lastName}, 
      <br /><br />
      ${text.join('<br /><br />')}
      <br /><br />
      ${this.footer()}
      `;

    const mailer = await Mailer.build();
    return mailer.send(email, subject, html);
  }

  async newAccreditionEmailForAdmin(investorID: number): Promise<any> {
    const { subject, text } = this.locale('newAccreditionClaim');
    const sto = await Stos.findOneOrFail(0);
    const investor = await Investor.findOne(investorID);

    const html = ` Dear admin of ${sto.title},
    <strong> ${investor?.firstName} ${investor?.lastName}</strong> ${text}
    `;
    const mail = await Mailer.build();
    return mail.send(sto.SMTP_FromAddress, subject, html);
  }

  async sendAccreditionStatusInfotoInvestor(investorID: number): Promise<any> {
    const { subject, text } = this.locale('statusOfAdminResponseOnAccreditation');
    const sto = await Stos.findOneOrFail(0);
    const investor = await Investor.findOneOrFail(investorID);

    const html = ` Dear ${investor?.firstName} ${investor?.lastName},
    <strong> Admin of ${sto.title} </strong> ${text}
    `;
    const mail = await Mailer.build();
    return mail.send(investor?.email, subject, html);
  }

  async sharesSoldBackNonBlockchain(
    { firstName, lastName, email }: Investor,
    currency: string,
    { title, nominalValue, premiumValue }: ShareTypes,
    tokens: number,
  ): Promise<unknown> {
    const { subject, text } = this.locale('sharesSoldBackNonBlockchain');
    const finalSubject = `${subject} | ${this.sto.title}`;
    const html = `
      ${this.format(text.join('<br /><br />'), {
        firstname: firstName,
        lastname: lastName,
        tokens: tokens.toString(),
        title: title,
        currency: currency,
        nominal: nominalValue.toString(),
        premium: premiumValue.toString(),
      })}
      ${this.footer()}
      `;
    const mailer = await Mailer.build();
    return mailer.send(email, finalSubject, html);
  }

  async sharesTransferredNonBlockchain(
    { firstName, lastName, email }: Investor,
    currency: string,
    { title, premiumValue }: ShareTypes,
    tokens: number,
  ): Promise<unknown> {
    const { subject, text } = this.locale('sharesTransferredNonBlockchain');
    const finalSubject = `${subject} | ${this.sto.title}`;
    const html = `
      ${this.format(text.join('<br /><br />'), {
        firstname: firstName,
        lastname: lastName,
        tokens: tokens.toString(),
        title: title,
        currency: currency,
        premium: premiumValue.toString(),
      })}
      ${this.footer()}
      `;
    const mailer = await Mailer.build();
    return mailer.send(email, finalSubject, html);
  }

  async sharesTransferredAdmin(
    { firstName, lastName, email, phone }: Investor,
    { title }: ShareTypes,
    { purchasePriceOffered, date }: InvestorBuyPropertyAlert,
  ): Promise<unknown> {
    const { subject, text } = this.locale('sharesTransferred-Admin');
    const fullName = `${firstName} ${lastName}`;
    const html = `
      Dear Admin of <strong>${this.sto.title}</strong>,
      <br /><br />
    ${this.format(text.join('<br /><br />'), {
      fullName,
      shareClassName: title,
      stoTitle: this.sto.title,
      price: Number(purchasePriceOffered).toString(),
      email,
      date,
      phoneNumber: phone,
    })}
      <br /><br />
      ${this.footer()}`;
    const formatedSubject = `${this.format(subject, {
      shareClassName: title,
      fullName,
    })}`;
    const mailer = await Mailer.build();
    return mailer.send(this.sto.SMTP_FromAddress, formatedSubject, html);
  }
}

export default Email;
