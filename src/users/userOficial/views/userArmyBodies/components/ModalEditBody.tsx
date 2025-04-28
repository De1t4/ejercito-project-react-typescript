import { ArmyBody, FormArmyBody, schemaFormArmyBody } from "@/models/ArmyBody.models";
import FormInput from "@/shared/components/FormInput";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function ModalEditBody({ body }: { body: ArmyBody }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm<FormArmyBody>({
    defaultValues: body,
    resolver: zodResolver(schemaFormArmyBody)
  })

  const handleSubmitbody: SubmitHandler<FormArmyBody> = (data) => {
    console.log(data)
  }

  return (
    <>
      <Tooltip title="Edit body">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit body"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(handleSubmitbody)} className="space-y-6">
          {/* Data Account Section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">body Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                type="text"
                label="Denomination Body"
                id="denomination"
                placeholder="Enter denomination"
                name="denomination"
                error={errors.denomination?.message}
                control={control}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}