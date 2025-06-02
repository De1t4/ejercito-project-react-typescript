import { useSubOficialContext } from "@/context/SubOficialContext";
import FormInput from "@/shared/components/FormInput";
import FormSelect from "@/shared/components/FormSelect";
import { FormSubOficial, schemaFormSubOficial, SubOficial } from "@/users/userOficial/models/SubOficial.models";
import { Structure } from "@/users/userSubOficial/models/Soldier.models";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { mapBarracksToOptions, mapBodiesToOptions, mapCompaniesToOptions } from "@/utils/utils";
import { EditOutlined } from "@ant-design/icons/lib/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, Modal, Tooltip } from "antd";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ModalEditSubOficial({ subOficial, structure }: { subOficial: SubOficial, structure: Structure }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { idStructure } = useParams()
  const { loading, update, fetchSubOficials } = useSubOficialContext()
  const { handleSubmit, setValue, control, reset, formState: { errors }, watch } = useForm<FormSubOficial>({
    defaultValues: {
      ...subOficial,
      isDesignateSoldier: subOficial.soldier !== null,
      graduation: subOficial.soldier?.graduation ?? "",
      name: subOficial.soldier?.name ?? "",
      lastname: subOficial.soldier?.lastname ?? "",
      id_barrack: subOficial.soldier === null ? 0 : Number(subOficial.soldier?.barrack.id_barrack),
      id_body: subOficial.soldier === null ? 0 : Number(subOficial.soldier?.body.id_body),
      id_company: subOficial.soldier === null ? 0 : Number(subOficial.soldier?.company.id_company),
      username: subOficial.username ?? '',
      password: "TestPass123"
    },
    resolver: zodResolver(schemaFormSubOficial)
  })

  if (!idStructure) return

  const handleSubmitSubOficial: SubmitHandler<FormSubOficial> = async (data) => {
    if (!watchIsDesigned) {
      await update({ id_user: subOficial.id_user, username: data.username, id_structure: idStructure, soldier: null })
      reset()
    } else {
      await update({ id_user: subOficial.id_user, username: data.username, id_structure: idStructure, soldier: { name: data.name, lastname: data.lastname, id_barrack: data.id_barrack, id_body: data.id_body, id_company: data.id_company } })
    }
    fetchSubOficials(idStructure)
  }
  const watchIsDesigned = watch('isDesignateSoldier')

  return (
    <>
      <Tooltip title="Edit Sub Oficial">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit Sub Oficial"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            isSubmitting={loading}
            handleSubmit={handleSubmit(handleSubmitSubOficial)}
            title="Edit Sub Oficial"
          />
        }
      >
        <form onSubmit={handleSubmit(handleSubmitSubOficial)} className="space-y-6">
          {/* Data Account Section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Account Information</h3>
            <div className="w-full">
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
                  {!subOficial.soldier && (
                    <div className="">
                      <label className="label-initial" htmlFor={"graduation"}>
                        Enter graduation Sub Oficial

                      </label>
                      <DatePicker format="YYYY-MM-DD" name="graduation" className="input-login" onChange={(_date, dateString) => setValue('graduation', typeof dateString === 'string' ? dateString : undefined)} />
                    </div>
                  )
                  }

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
          <p className=" text-red-600 text-base">{errors.isDesignateSoldier?.message}</p>
        </form>
      </Modal>
    </>
  )
}