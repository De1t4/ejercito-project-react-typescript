import { useArmyBodyContext } from "@/context/ArmyBodyContext";
import { ArmyBody, FormArmyBody, schemaFormArmyBody } from "@/models/ArmyBody.models";
import FormInput from "@/shared/components/FormInput";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";


export default function ModalEditBody({ body }: { body: ArmyBody }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { update, fetchBodies, loading } = useArmyBodyContext()
  const { control, handleSubmit, formState: { errors } } = useForm<FormArmyBody>({
    defaultValues: body,
    resolver: zodResolver(schemaFormArmyBody)
  })

  const handleSubmitbody: SubmitHandler<FormArmyBody> = async (data) => {
    await update({ ...data, id_body: data.id_body ?? 0 })
    fetchBodies()
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
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            isSubmitting={loading}
            title="Edit Body"
            handleSubmit={handleSubmit(handleSubmitbody)}
          />
        }
      >
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