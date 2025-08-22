import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export function sendWelcomeEmail (email,name){
    sgMail.send({
        to:email,
        from:'ratikarastogi1996@gmail.com',
        subject:'Welcome Onboard to Task Manager App!!',
        text:`Hello ${name}! Thanks for subscibing to this app. Hope you have a great time ahead using it :)`
    })
}

export function sendCancellationEmail (email,name){
    sgMail.send({
        to:email,
        from:'ratikarastogi1996@gmail.com',
        subject:'Sorry to see you go!!',
        text:`Hello ${name}! Thanks for staying with this app so far. We are truly sad to see you go. Could you please suggest some areas of improvement so that we could make you to stay back with us :(`
    })
}