import EmailConfirmation from '@/base-components/ui/email-confirmation';
import { useAppSelector } from '@/hooks/useRedux';
import { getUser } from '@/utils/auth.util';
import { isJSON } from '@/utils/functions';
import React from 'react'
export default function EmailVarficiation() {
    const user = isJSON(getUser())
    
    const data = {
        heading: " Verify Email address",
        description: `An email has been send to ${user?.email} Click the link in email to verify your email address`
    }
    return <EmailConfirmation data={data} />;
}
