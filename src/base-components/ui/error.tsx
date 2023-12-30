import { setErrorMessage } from '@/utils/utility'
import { useTranslation } from 'next-i18next'
import error from "@/assets/pngs/error.png"
import Image from 'next/image'
export default function Error({ error }: any) {

    const { t: translate } = useTranslation(["common"])
    return (
        <div className={`mt-4  text-red ${error && ' flex  justify-between border-[1px] border-red rounded-lg p-2'}`}>
            {setErrorMessage(error, translate)}
        </div>
    )
}
