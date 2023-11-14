import EmailConfirmation from '@/base-components/ui/email-confirmation';
import React from 'react'
const data = {
    heading: " We send an email to rest password",
    description: "We have sent you the link to reset the password by e-mail! Please take a second to make sure we have your correct email address"
}
export default function EmailVarficiation() {
    return <EmailConfirmation data={data} />;
}
