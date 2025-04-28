import { Company, FormCompany, schemaFormCompany } from "@/models/Company.models";
import FormInput from "@/shared/components/FormInput";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalEditCompany({company}:{company:Company}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormCompany>({
    defaultValues: company,
    resolver: zodResolver(schemaFormCompany)
  })

  const handleSubmitCompany: SubmitHandler<FormCompany> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Tooltip title="Edit Company">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit Company"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(handleSubmitCompany)} className="space-y-6">
          {/* Data Account Section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Company Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                type="text"
                label="Activity"
                id="activity"
                placeholder="Enter activity"
                name="activity"
                error={errors.activity?.message}
                control={control}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}