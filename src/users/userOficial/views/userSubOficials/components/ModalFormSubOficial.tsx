import { useSubOficialContext } from "@/context/SubOficialContext";
import FormInput from "@/shared/components/FormInput";
import FormInputPassword from "@/shared/components/FormInputPassword";
import FormSelect from "@/shared/components/FormSelect";
import { FormSubOficial, initalStateFormSubOficial, schemaFormSubOficial } from "@/users/userOficial/models/SubOficial.models";
import { Structure } from "@/users/userSubOficial/models/Soldier.models";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { mapBarracksToOptions, mapBodiesToOptions, mapCompaniesToOptions } from "@/utils/utils";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Modal } from "antd";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function ModalFormSubOficial({ structure }: { structure: Structure }) {
  const { create, fetchSubOficials, loading } = useSubOficialContext()
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit, setValue, reset, control, formState: { errors }, watch } = useForm<FormSubOficial>({
    defaultValues: initalStateFormSubOficial,
    resolver: zodResolver(schemaFormSubOficial)
  })

  const handleSubmitSubOficial: SubmitHandler<FormSubOficial> = async (data) => {
    const basePayload = {
      username: data.username,
      password: data.password,
    }

    const payload = watchIsDesigned
      ? {
        ...basePayload,
        soldier: {
          name: data.name,
          lastname: data.lastname,
          graduation: data.graduation,
          id_barrack: data.id_barrack,
          id_company: data.id_company,
          id_body: data.id_body,
        },
      }
      : {
        ...basePayload,
        soldier: null,
      }

    await create(payload)
    fetchSubOficials()
    reset()
  }

  const watchIsDesigned = watch('isDesignateSoldier')

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="z-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Sub Oficial</span>
      </button>
      <Modal
        title={`Create New Sub Oficial`}
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            title="Create Sub Oficial"
            isSubmitting={loading}
            handleSubmit={handleSubmit(handleSubmitSubOficial)}
          />
        }
      >
        <form onSubmit={handleSubmit(handleSubmitSubOficial)} className="space-y-6">
          {/* Data Account Section */}
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
          <Controller
            control={control}
            name="isDesignateSoldier"
            render={({ field }) => (
              <div className="flex gap-2 items-center">
                <input
                  id="isDesignateSoldier"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  name={field.name}
                />
                <label htmlFor="isDesignateSoldier">¿Do you want to assign a soldier to him?</label>
              </div>
            )}
          />
          {
            watchIsDesigned && (<>
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
                  <div className="">
                    <label className="label-initial" htmlFor={"graduation"}>
                      Enter graduation Sub Oficial
                    </label>
                    <DatePicker format="YYYY-MM-DD" name="graduation" className="input-login" onChange={(_date, dateString) => setValue('graduation', typeof dateString === 'string' ? dateString : undefined)} />
                  </div>
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
            </>)
          }
        </form>
        <p className="h-5 text-red-600 text-base">{errors.isDesignateSoldier?.message}</p>
      </Modal>
    </>
  )
}