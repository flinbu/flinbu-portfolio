const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export default (context, inject) => {
    const mail = msg => {
        if (!msg) return false
        sgMail.send(msg)
            .then( () => {
                return true
            }).catch(err => {
                console.error(err)
                return false
            })
    }
    inject('mail', msg => mail(msg))
}