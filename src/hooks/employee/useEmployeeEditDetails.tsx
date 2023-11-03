import { loginUser } from "@/api/slices/authSlice/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../useRedux";
import { generateEmployDetailsValidation } from "@/validation/employeeSchema";
import { employeeEditDetailsFormField } from "@/components/employees/fields/employee-edit-fields";
import { TRowEmployees } from "@/types/employee";

export const useEmployeeEditDetails = ({
  routeHandler,
  employeeDetail,
}: {
  routeHandler: () => void;
  employeeDetail: TRowEmployees;
}) => {
  console.log(employeeDetail,"2345634564dsfsdf");
  
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const schema = generateEmployDetailsValidation(translate);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fields = employeeEditDetailsFormField(register, loading, routeHandler);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(loginUser({ data, router, setError, translate }));
  };

  return {
    fields,
    onSubmit,
    handleSubmit,
    errors,
    error,
  };
};
