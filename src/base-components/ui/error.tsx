import { setErrorMessage } from '@/utils/utility'
import { useTranslation } from 'next-i18next'

export default function Error({ error }:any) {
    
    const { t: translate } = useTranslation()
    return (
        <div>
        {setErrorMessage(error, translate)}
        </div>
    )
}
