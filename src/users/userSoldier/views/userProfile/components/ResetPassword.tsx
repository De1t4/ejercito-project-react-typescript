import { useGlobalContext } from "@/context/globalContext";
import { modifyPasswordUser } from "@/services/ProfileService";
import InputPassword from "@/shared/components/InputPassword";
import { initialStatePassword, schemaValidation, FormValidation } from "@/users/userSoldier/models/Password.models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ResetPassword() {
  const [modal1Open, setModal1Open] = useState<boolean>(false);
  const { authTokens } = useGlobalContext()
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValidation>({
    defaultValues: initialStatePassword,
    resolver: zodResolver(schemaValidation),
  })

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    if (!authTokens) return
    const res = await modifyPasswordUser(data, authTokens.token)
    if (res === 'BAD_REQUEST') {
      alert('La contraseña es incorrecta')
      return
    }
    reset(initialStatePassword)
  }

  return (
    <>
      <Modal
        title={<h5 className="h5-style">Services Assigned</h5>}
        centered
        open={modal1Open}
        style={{ content: "#000" }}
        onOk={() => setModal1Open(false)}
        footer={null}
        onCancel={() => setModal1Open(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputPassword
            label="Current Password"
            type="password"
            id="currentPassword"
            placeholder="Current Password"
            control={control}
            error={errors.currentPassword?.message}
            name="currentPassword"
          />
          <InputPassword
            label="New Password"
            type="password"
            id="newPassword"
            placeholder="New Password"
            control={control}
            error={errors.newPassword?.message}
            name="newPassword"
          />
          <InputPassword
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            control={control}
            error={errors.confirmPassword?.message}
            name="confirmPassword"
          />
          <button type="submit" className=" w-full bg-primary-color h-10 text-white-color font-medium rounded-md mt-2">Update Password</button>
        </form>
      </Modal>
      <button onClick={() => setModal1Open(true)} type="button" className="btn-green">Change Password</button>
    </>
  )
}