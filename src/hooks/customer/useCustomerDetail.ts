import { Customers } from '@/types/customer'
import { customers } from '@/utils/static'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../useRedux';
import { generateCustomerValidation } from '@/validation/customersSchema';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { customerDetailsFormField } from '@/components/customer/customer-fields';

export default function useCustomerDetail(stage: boolean) {
  const { t: translate } = useTranslation();
  const { loading } = useAppSelector((state) => state.auth);

  const router = useRouter()
  const [customerDetail, setCustomerDetail] = useState<Customers>(customers[0])
  const [isUpdate, setIsUpdate] = useState<boolean>(stage)

  const id = router.query.customer
  const schema = generateCustomerValidation(translate);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (typeof Number(id) == "number") {
      let customer = customers.filter((item) => item.id == Number(id))[0]
      if (customer) {
        //@ts-expect-error
        reset({
          ...customer,
          ["address.country"]: customer.address.country,
          ["address.streetNo"]: customer.address.streetNo,
          ["address.postCode"]: customer.address.postCode,
        })
      }
      setCustomerDetail(customer);
    }
  }, [id])

  const handleUpdateCancel = () => {
    setIsUpdate(!isUpdate)
  }

  //@ts-expect-error
  const fields = customerDetailsFormField(register, loading, isUpdate, handleUpdateCancel,control);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "submit");

  };
  const handlePreviousClick = () => {
    router.push("/customers")
  }

  return {
    customerDetail,
    isUpdate,
    setIsUpdate,
    fields,
    onSubmit,
    handleSubmit,
    errors,
    handlePreviousClick,
    handleUpdateCancel
  }
}
