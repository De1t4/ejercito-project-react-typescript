import { useBarrackContext } from "@/context/BarrackContext";
import { Barrack, FormBarrack, schemaFormBarrack } from "@/models/Barrack.models";
import FormInput from "@/shared/components/FormInput";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { EditOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Tooltip } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ModalEditBarrack({ barrack }: { barrack: Barrack }) {
  const { fetchBarracks, update, loading } = useBarrackContext()
  const [modalOpen, setModalOpen] = useState(false);


  const { idStructure } = useParams()
  if (!idStructure) return

  const { control, handleSubmit, formState: { errors } } = useForm<FormBarrack>({
    defaultValues: barrack,
    resolver: zodResolver(schemaFormBarrack)
  })

  const handleSubmitBarrack: SubmitHandler<FormBarrack> = async (data) => {
    await update({ ...data, id_barrack: data.id_barrack ?? 0, id_structure: idStructure })
    fetchBarracks(idStructure)
  }

  return (
    <>
      <Tooltip title="Edit Barrack">
        <button onClick={() => setModalOpen(true)} className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors">
          <EditOutlined size={20} />
        </button>
      </Tooltip>
      <Modal
        title="Edit Barrack"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            isSubmitting={loading}
            title="Edit Barrack"
            setModalOpen={setModalOpen}
            handleSubmit={handleSubmit(handleSubmitBarrack)}
          />
        }
      >
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