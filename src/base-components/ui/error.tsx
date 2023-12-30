import { setErrorMessage } from '@/utils/utility'
import { useTranslation } from 'next-i18next'

export default function Error({ error }:any) {
    
    const { t: translate } = useTranslation(["common"])
    return (
        <div className='mt-4 text-center text-red '>
        {setErrorMessage(error, translate)}
        </div>
    )
}
