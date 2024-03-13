import { Mail } from './interfaces/mail/mail.interface'

export abstract class EmailService {
    abstract sendEmail(options: Mail): Promise<void>
}
