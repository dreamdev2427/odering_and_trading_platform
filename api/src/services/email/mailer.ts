import { createCipher, createDecipher } from 'crypto';
import { createTransport, Transporter } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

import { Params, Stos } from 'entities';
import { PARAM } from '../../core/envs';

class Mailer {
  static async build(): Promise<Mailer> {
    const sto = await Stos.findOneOrFail(0, {
      select: ['SMTP_Host', 'SMTP_Port', 'SMTP_User', 'SMTP_Password', 'SMTP_FromAddress', 'SMTP_FromName'],
    });
    const isSSL3Enabled = !!(await Params.getParam(PARAM.IS_SMTP_SSL3_ENABLED))?.intValue;

    return new Mailer(sto, isSSL3Enabled);
  }

  readonly log: boolean;

  readonly from: string;

  private verify = true;

  private transporter: Transporter;

  constructor(sto: Stos, isSSL3Enabled: boolean) {
    const host = sto.SMTP_Host;
    this.from = sto.SMTP_FromName ? `${sto.SMTP_FromName} <${sto.SMTP_FromAddress}>` : sto.SMTP_FromAddress;
    this.log = !host;
    this.transporter = this.getTransporter(sto, isSSL3Enabled, host);

    this.transporter.verify().catch((error) => {
      this.verify = false;
      console.error(`Verify SMTP \n ${error}`);
    });
  }

  private getTransporter(sto: Stos, isSSL3Enabled: boolean, host: string) {
    const port = Number(sto.SMTP_Port);
    const user = sto.SMTP_User;
    const pass = this.decrypt(sto.SMTP_Password);
    const tls = isSSL3Enabled && {tls: { ciphers:'SSLv3'} };
    const transport = {
      host,
      port,
      secure: !isSSL3Enabled,
      auth: {
        user,
          pass,
      },
      pool: isSSL3Enabled,
      ...tls,
    };

    return createTransport(transport);
  }

  private decrypt(str: string): string {
    // @ts-ignore
    const decrypt = createDecipher('aes-128-cbc', process.env.PASSWORD_SALT);
    const first = decrypt.update(str, 'hex', 'utf8');
    const second = decrypt.final('utf8');
    return `${first}${second}`;
  }

  private encrypt(str: string): string {
    // @ts-ignore
    const encrypt = createCipher('aes-128-cbc', process.env.PASSWORD_SALT);
    const first = encrypt.update(str, 'utf8', 'hex');
    const second = encrypt.final('hex');
    return `${first}${second}`;
  }

  private async sendLog(to: string, subject: string, html: string): Promise<void> {
    console.info(to, subject, html);

    return Promise.resolve();
  }

  private async sendEmail(to: string, subject: string, html: string, attachments: Attachment[] = []): Promise<void> {
    const options = {
      from: this.from,
      to,
      subject,
      html,
      attachments,
    };

    if (!this.verify) {
      return Promise.reject('Email has not sent');
    }
    return this.transporter.sendMail(options).catch((error) => {
      console.error(`Send email \n ${error}`);
    });
  }

  async send(
    to: string,
    subject: string,
    html: string,
    attachments: Attachment[] = [],
  ): Promise<void> {
    if (this.log) {
      return this.sendLog(to, subject, html);
    }
    return this.sendEmail(to, subject, html, attachments);
  }
}

export default Mailer;
