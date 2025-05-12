import { useGlobalContext } from "@/context/globalContext";
import FormInput from "@/shared/components/FormInput";
import FormSelect from "@/shared/components/FormSelect";
import { FormService, initialStateFormService, schemaFormServices, Service } from "@/users/userSubOficial/models/Services.models";
import { Soldier } from "@/users/userSubOficial/models/Soldier.models";
import { assignedNewServiceSoldier, assignedServiceSoldier } from "@/users/userSubOficial/services/AssignedService";
import { mapServicesToOptions, mapSoldiersToOptions } from "@/utils/utils";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Select, Space } from "antd";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FooterModal from "./FooterModal";
import toast from "react-hot-toast";

export default function ModalFormService({ services, soldiers, reloadTable }: { services: Service[], soldiers: Soldier[], reloadTable: () => void }) {
  const { authTokens } = useGlobalContext()
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { control, formState: { errors }, setValue, handleSubmit, watch, reset } = useForm<FormService>({
    defaultValues: initialStateFormService,
    resolver: zodResolver(schemaFormServices)
  })

  const watchCheck = watch("createNewService")
  const handleSubmitService: SubmitHandler<FormService> = async (data) => {
    try {
      if (!authTokens) return
      setIsSubmitting(true)

      if (data.createNewService) {
        await assignedNewServiceSoldier(authTokens.token, data)
      } else {
        await assignedServiceSoldier(authTokens.token, data)
      }
      toast.success("Service created successfully.")
      reloadTable()
      reset()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Service</span>
      </button>
      <Modal
        title="Create New Service"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={<>
          <FooterModal
            setModalOpen={setModalOpen}
            title="Create Service"
            handleSubmit={handleSubmit(handleSubmitService)}
            isSubmitting={isSubmitting}
          />
        </>}
      >
        <form className="space-y-6" onSubmit={handleSubmit(handleSubmitService)}>
          <div className="space-y-4">
            {/* Título */}
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">
              Service Information
            </h3>
            {/* Select de servicios */}
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
            {/* Checkbox: crear nuevo servicio */}
            <Controller
              control={control}
              name="createNewService"
              render={({ field }) => (
                <div className="flex gap-2 items-center">
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

            {/* Descripción si se crea nuevo servicio */}
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

            {/* Select de soldados */}
            <Controller
              name="id_soldier"
              control={control}
              render={({ field }) => (
                <Space

                  style={{ width: '100%', height: '100%' }}
                  direction="vertical"
                >
                  <label htmlFor="id_soldier" className="-mb-4">Select Soldiers</label>
                  <Select
                    mode="multiple"
                    {...field}
                    allowClear
                    size="large"
                    id="id_soldier"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    optionFilterProp="label"

                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={(value: string[]) => setValue('id_soldier', value)}
                    options={mapSoldiersToOptions(soldiers)}
                  />
                  <p className=" text-red-600 text-sm  pt-1 h-auto">{errors.id_soldier?.message && errors.id_soldier.message}</p>

                </Space>
              )}
            />
          </div>
        </form>

      </Modal>
    </>
  )
}