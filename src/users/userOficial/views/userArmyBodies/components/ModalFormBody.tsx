import { useArmyBodyContext } from "@/context/ArmyBodyContext";
import { FormArmyBody, initialStateFormArmyBody, schemaFormArmyBody } from "@/models/ArmyBody.models";
import FormInput from "@/shared/components/FormInput";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalFormBody() {
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchBodies, create, loading} = useArmyBodyContext()
  const { control, handleSubmit, formState: { errors }, reset} = useForm<FormArmyBody>({
    defaultValues: initialStateFormArmyBody,
    resolver: zodResolver(schemaFormArmyBody)
  })

  const handleSubmitBody: SubmitHandler<FormArmyBody> = async (data) => {
    await create(data)
    fetchBodies()
    reset()
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Body</span>
      </button>
      <Modal
        title="Create Body"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            isSubmitting={loading}
            title="Create Body"
            handleSubmit={handleSubmit(handleSubmitBody)}
          />
        }
      >
        <form onSubmit={handleSubmit(handleSubmitBody)} className="space-y-6">
          {/* Data Account Section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Body Information</h3>
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