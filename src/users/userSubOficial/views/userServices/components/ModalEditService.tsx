import { useGlobalContext } from "@/context/globalContext";
import FormInput from "@/shared/components/FormInput";
import FormSelect from "@/shared/components/FormSelect";
import { AssignedServices, FormService, initialStateFormService, schemaFormServices, Service } from "@/users/userSubOficial/models/Services.models";
import { mapServicesToOptions } from "@/utils/utils";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FooterModal from "./FooterModal";
import { updateAssignedServiceSoldier } from "@/users/userSubOficial/services/AssignedService";

export default function ModalEditService({ services, soldier, reloadTable }: { services: Service[], soldier: AssignedServices, reloadTable: () => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { authTokens } = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, formState: { errors }, handleSubmit, watch } = useForm<FormService>({
    defaultValues: {
      ...initialStateFormService,
      id_soldier: [String(soldier.id_soldier)],
      id_service: soldier.id_service,
      id_services_soldiers: soldier.id_services_soldiers,
    },
    resolver: zodResolver(schemaFormServices)
  })

  const watchCheck = watch("createNewService")

  const handleSubmitService: SubmitHandler<FormService> = async (data) => {
    try {
      if (!authTokens) return
      const payload = data.createNewService ? { description: data.description } : { id_service: data.id_service }
      await updateAssignedServiceSoldier(authTokens.token, Number(data.id_services_soldiers), payload)
      reloadTable()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <>
      <Tooltip title="Edit Service">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit Service Assigned"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            title="Edit Service"
            handleSubmit={handleSubmit(handleSubmitService)}
            isSubmitting={isSubmitting}
          />
        }
      >
        <form className="space-y-6" >
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">
              Service Assigned Information
            </h3>
            {!watchCheck && (
              <FormSelect
                id="id_service"
                control={control}
                name="id_service"
                error={errors.id_service?.message}
                placeholder="Select an option"
                label="Select Service"
                options={mapServicesToOptions(services)}
              />
            )
            }
            <Controller
              control={control}
              name="createNewService"
              render={({ field }) => (
                <div className="flex gap-2 items-center -mt-10">
                  <input
                    id="createNewService"
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    name={field.name}
                  />
                  <label htmlFor="createNewService">Create new Service</label>
                </div>
              )}
            />
            {watchCheck && (
              <FormInput
                control={control}
                type="text"
                label="Service Description"
                name="description"
                id="description"
                error={errors.description?.message}
                placeholder="Enter service description"
              />
            )}
            <div>
              <label className="label-initial">Name Soldier</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border disabled:cursor-not-allowed disabled:bg-slate-200 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color/80"
                  defaultValue={soldier.soldier}
                  disabled
                />
                <p className="h-5"></p>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}