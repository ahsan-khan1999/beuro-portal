import EditOffersDetails from '@/components/offers/edit'
import React from 'react'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import EditInvoiceDetails from '@/components/invoice/edit';

const index = () => {
    return (
        <div>
            <EditInvoiceDetails />
        </div>
    )
}

export default index
export const getStaticProps = async ({ locale }: Locale) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});