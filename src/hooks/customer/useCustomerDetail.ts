import { Customers } from '@/types/customer'
import { customers } from '@/utils/static'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useCustomerDetail() {
    const router = useRouter()
    // @ts-expect-error
    const [customerDetail, setCustomerDetail] = useState<Customers>({})
    const id = router.query.customer
    console.log(id,"id");
    

    useEffect(() => {
        if (typeof Number(id) == "number")
            console.log(customers.filter((item) => item.id === Number(id)));

            setCustomerDetail(customers.filter((item) => item.id === Number(id))[0]);
    }, [id])
    return {
        customerDetail
    }
}
