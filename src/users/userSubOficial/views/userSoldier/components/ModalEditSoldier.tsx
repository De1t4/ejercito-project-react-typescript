import FormInput from "@/shared/components/FormInput";
import FormInputPassword from "@/shared/components/FormInputPassword";
import FormSelect from "@/shared/components/FormSelect";
import { FormSoldier, schemaFormSoldier, Soldier, Structure } from "@/users/userSubOficial/models/Soldier.models";
import { mapBarracksToOptions, mapCompaniesToOptions, mapBodiesToOptions } from "@/utils/utils";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalEditSoldier({ soldier, structure }: { soldier: Soldier, structure: Structure }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { handleSubmit, control, formState: { errors } } = useForm<FormSoldier>({
    defaultValues: soldier,
    resolver: zodResolver(schemaFormSoldier)
  })

  console.log(errors)

  const onSubmitEdit: SubmitHandler<FormSoldier> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Tooltip title="Edit Soldier">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit Soldier"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmitEdit)}>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                label="Username"
                id="username"
                placeholder="Enter username"
                name="username"
                error={errors.username?.message}
                control={control}
              />
              <FormInputPassword
                label="Password"
                id="password"
                placeholder="Enter password"
                name="password"
                error={errors.password?.message}
                control={control}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                type="text"
                label="Soldier name"
                id="name"
                placeholder="Enter name"
                name="name"
                error={errors.name?.message}
                control={control}
              />
              <FormInput
                type="text"
                label="Soldier Lastname"
                id="lastname"
                placeholder="Enter lastname"
                name="lastname"
                error={errors.lastname?.message}
                control={control}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Military Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormSelect
                id="id_company"
                control={control}
                name="id_company"
                error={errors.id_company?.message}
                placeholder="Select an option"
                label="Enter an Company"
                options={mapCompaniesToOptions(structure?.companies)}
              />
              <FormSelect
                id="id_barrack"
                control={control}
                name="id_barrack"
                error={errors.id_barrack?.message}
                placeholder="Select an option"
                label="Enter an Barrack"
                options={mapBarracksToOptions(structure?.barracks)}
              />
              <FormSelect
                id="id_body"
                control={control}
                name="id_body"
                error={errors.id_body?.message}
                placeholder="Select an option"
                label="Enter an Army body"
                options={mapBodiesToOptions(structure?.army_bodies)}
              />
            </div>
          </div>
          <button type="submit">Ver</button>
        </form>

      </Modal>
    </>
  )
}