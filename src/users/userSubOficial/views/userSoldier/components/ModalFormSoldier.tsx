import { useGlobalContext } from "@/context/globalContext";
import FormInput from "@/shared/components/FormInput";
import FormInputPassword from "@/shared/components/FormInputPassword";
import FormSelect from "@/shared/components/FormSelect";
import { FormSoldier, initialStateFormSoldier, schemaFormSoldier, Structure } from "@/users/userSubOficial/models/Soldier.models";
import { createSoldier } from "@/users/userSubOficial/services/SoldierService";
import { mapBarracksToOptions, mapBodiesToOptions, mapCompaniesToOptions } from "@/utils/utils";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalFormSoldier({ reloadTable, structure }: { reloadTable: () => Promise<void>, structure: Structure }) {
  const { authTokens } = useGlobalContext()
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<FormSoldier>({
    defaultValues: initialStateFormSoldier,
    resolver: zodResolver(schemaFormSoldier)
  })
  const handleSubmitSoldier: SubmitHandler<FormSoldier> = async (data) => {
    if (!authTokens) return
    try {
      setIsSubmitting(true)
      const res = await createSoldier(authTokens?.token, data)
      if (res) {
        alert("creado")
        reset(initialStateFormSoldier)
        reloadTable()
      }
    } catch (err) {
      console.error("Error create soldier" + err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Soldier</span>
      </button>
      <Modal
        title="Create New Soldier"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={<>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(handleSubmitSoldier)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <ReloadOutlined size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Soldier"
              )}
            </button>
          </div>
        </>}
      >
        <form onSubmit={handleSubmit(handleSubmitSoldier)} className="space-y-6">
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
                  Enter graduation soldier
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
        </form>
      </Modal>
    </>
  )
}