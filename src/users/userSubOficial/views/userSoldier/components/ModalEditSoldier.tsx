import { useGlobalContext } from "@/context/globalContext";
import FormInput from "@/shared/components/FormInput";
import FormSelect from "@/shared/components/FormSelect";
import { FormSoldier, schemaFormSoldier, Soldier, Structure } from "@/users/userSubOficial/models/Soldier.models";
import { updateProfileUser } from "@/users/userSubOficial/services/SoldierService";
import { mapBarracksToOptions, mapCompaniesToOptions, mapBodiesToOptions } from "@/utils/utils";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalEditSoldier({ soldier, structure, reloadTable }: { soldier: Soldier, structure: Structure, reloadTable: () => void }) {
  const { authTokens } = useGlobalContext()
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<FormSoldier>({
    defaultValues: { ...soldier, password: "TestPass123.", id_soldier: soldier.id_soldier},
    resolver: zodResolver(schemaFormSoldier)
  })

  const onSubmitEdit: SubmitHandler<FormSoldier> = async (data) => {
    try {
      if (!authTokens) return
      setIsSubmitting(true)
      await updateProfileUser(authTokens.token, data)
      reloadTable()
    } catch (err) {
      console.error("Error edit profile soldier" + err)

    } finally {
      setIsSubmitting(false)
    }
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
        footer={
          <>
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
                onClick={handleSubmit(onSubmitEdit)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <ReloadOutlined size={16} className="animate-spin mr-2" />
                    Editing...
                  </>
                ) : (
                  "Edit Soldier"
                )}
              </button>
            </div>
          </>
        }

      >
        <form onSubmit={handleSubmit(onSubmitEdit)} className="flex flex-col gap-2">
          <div className="space-y-6">
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
        </form>
      </Modal >
    </>
  )
}