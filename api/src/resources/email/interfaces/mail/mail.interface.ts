export interface Mail {
    /**
     * The id of the entity that the email is related to
     */
    entityId: string

    /**
     * The email address that the email is being sent to
     */
    receiver: string

    /**
     * The context that will be used to render the email template.
     * Generally used by nodemailer and typed in exactly the same
     * fashion.
     */
    context?: {
        [name: string]: any
    }
}
