import { useCompanyContext } from "@/context/CompanyContext";
import { FormCompany, initialStateFormCompany, schemaFormCompany } from "@/models/Company.models";
import FormInput from "@/shared/components/FormInput";
import FooterModal from "@/users/userSubOficial/views/userServices/components/FooterModal";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "antd";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function ModalFormCompany() {
  const [modalOpen, setModalOpen] = useState(false);
  const { fetchCompanies, create, loading } = useCompanyContext()

  const { idStructure } = useParams()
  if (!idStructure) return

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormCompany>({
    defaultValues: { ...initialStateFormCompany, id_structure: idStructure },
    resolver: zodResolver(schemaFormCompany)
  })


  const handleSubmitCompany: SubmitHandler<FormCompany> = async (data) => {
    await create({ ...data, id_structure: idStructure })
    fetchCompanies(idStructure)
    reset({ ...initialStateFormCompany, id_structure: idStructure })
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Company</span>
      </button>
      <Modal
        title="Create Company"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={
          <FooterModal
            setModalOpen={setModalOpen}
            isSubmitting={loading}
            title="Create Company"
            handleSubmit={handleSubmit(handleSubmitCompany)}
          />
        }
      >
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