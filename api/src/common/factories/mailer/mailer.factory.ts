import { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

/**
 * Please note that nodemailer does not rate limit, or rather, the
 * options rateLimit and rateDelta are deprecated as per:
 *      https://github.com/nodemailer/nodemailer/issues/1120
 */
export const mailerFactory = async (config: ConfigService) => {
    const apiPath = config.getOrThrow('API_PATH')

    const smtpUser = config.getOrThrow('SMTP_USER')
    const smtpPass = config.getOrThrow('SMTP_PASS')
    const mailDisplay = config.getOrThrow('MAIL_DISPLAY')
    const smtpDomain = config.getOrThrow('SMTP_DOMAIN')
    const smtpPort = config.getOrThrow('SMTP_PORT')

    const templateRoot = apiPath + '/dist/views'

    return {
        transport: {
            host: smtpDomain,
            auth: { user: smtpUser, pass: smtpPass },
            port: smtpPort,
            logger: true,
            debug: true,
            secure: false,
            requireTLS: true,
            tls: { rejectUnauthorized: true, requestCert: true }
        },
        defaults: { from: `${mailDisplay} <${smtpUser}>` },
        template: {
            dir: templateRoot,
            adapter: new EjsAdapter(),
            options: {
                strict: true,
                root: templateRoot
            }
        },
        preview: false
    } as MailerOptions
}
