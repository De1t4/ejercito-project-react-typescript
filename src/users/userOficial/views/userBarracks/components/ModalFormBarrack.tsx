import { useBarrackContext } from "@/context/BarrackContext";
import { FormBarrack, initialStateFormBarrack, schemaFormBarrack } from "@/models/Barrack.models";
import FormInput from "@/shared/components/FormInput";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ModalFormBarrack() {
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchBarracks, create, loading} = useBarrackContext()
  const {  control, handleSubmit, formState: { errors }, reset } = useForm<FormBarrack>({
    defaultValues: initialStateFormBarrack,
    resolver: zodResolver(schemaFormBarrack)
  })

  const handleSubmitBarrack: SubmitHandler<FormBarrack> = async (data) => {
    await create(data)
    fetchBarracks()
    reset()
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Barrack</span>
      </button>
      <Modal
        title="Create Barrack"
        centered
        open={modalOpen}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            isSubmitting={loading}
            title="Create Barrack"
            handleSubmit={handleSubmit(handleSubmitBarrack)}
          />
        }
        onCancel={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit(handleSubmitBarrack)} className="space-y-6">
          {/* Data Account Section */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Barrack Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormInput
                type="text"
                label="Name Barrack"
                id="name"
                placeholder="Enter name"
                name="name"
                error={errors.name?.message}
                control={control}
              />
              <FormInput
                type="text"
                label="Location Barrack"
                id="location"
                placeholder="Enter location"
                name="location"
                error={errors.location?.message}
                control={control}
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}