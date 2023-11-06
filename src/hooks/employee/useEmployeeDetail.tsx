import { TRowEmployees } from "@/types/employee";
import { employeesData } from "@/utils/static";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../useRedux";
import { updateModalType } from "@/api/slices/globalSlice/global";
import { ModalConfigType, ModalType } from "@/enums/ui";
import PasswordReset from "@/base-components/ui/modals1/PasswordReset";
import PasswordChangeSuccessfully from "@/base-components/ui/modals1/PasswordChangeSuccessfully"; 

const useEmployeeDetail = () => {
  const dispatch = useDispatch();
  const { modal } = useAppSelector((state) => state.global);

  // Function for close the modal
  const onClose = () => {
    dispatch(updateModalType(ModalType.NONE));
  };

  const handlePasswordReset = () => {
    dispatch(updateModalType(ModalType.PASSWORD_RESET));
  };

  const passwordResetSuccessfully = () => {
    dispatch(updateModalType(ModalType.NONE));
    dispatch(updateModalType(ModalType.PASSWORD_CHANGE_SUCCESSFULLY));
   };

  // METHOD FOR HANDLING THE MODALS
  const MODAL_CONFIG: ModalConfigType = {
    [ModalType.PASSWORD_RESET]: ( 

      <PasswordReset
      onClose={onClose}
      passwordResetSuccessfully={passwordResetSuccessfully}
      />
    
    ),
    [ModalType.PASSWORD_CHANGE_SUCCESSFULLY]: (
      <PasswordChangeSuccessfully onClose={onClose} />
    ),
   
  };

  const renderModal = () => {
    return MODAL_CONFIG[modal.type] || null;
  };

  const router = useRouter();
  // @ts-expect-error
  const [employeeDetail, setEmployeeDetail] = useState<TRowEmployees>({});
  const id = router.query.employee;
  console.log(id, "ids");

  useEffect(() => {
    if (typeof Number(id) == "number")
      console.log(
        employeesData.filter((item) => item.id === id),
        "1234"
      );

    setEmployeeDetail(employeesData.filter((item) => item.id === id)[0]);
  }, [id]);
  return {
    employeeDetail,
    handlePasswordReset,
    renderModal,
  };
};
export default useEmployeeDetail;
