import { VITE_BACK_END_URL } from "@/config/config-env"
import { useGlobalContext } from "@/context/globalContext"
import { Structure } from "@/models/Structure.models"
import FormInput from "@/shared/components/FormInput"
import { FormTextarea } from "@/shared/components/FormTextarea"
import { FormStructure as StructureForm, initialStateStructure, schemaStructure } from "@/users/userOficial/models/Structure.models"
import { CloseCircleOutlined } from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const API_URL = VITE_BACK_END_URL

export default function FormStructure({ closePanel, isOpenPanel }: { closePanel: () => void, isOpenPanel: boolean }) {
  const { control, handleSubmit, formState: { errors } } = useForm<StructureForm>({
    defaultValues: initialStateStructure,
    resolver: zodResolver(schemaStructure)
  })
  const { authTokens } = useGlobalContext()
  const redirect = useNavigate()

  const onSubmitForm: SubmitHandler<StructureForm> = async (payload) => {
    if (!authTokens) return
    try {
      const res = await fetch(`${API_URL}/v1/structure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.token}`,
        },
        body: JSON.stringify(payload)
      })
      if (!res.ok) return
      toast.success("Welcome to your new structure")
      const data: Structure = await res.json()
      redirect(`/structure/${data.id_structure}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isOpenPanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closePanel}
        />
      )}

      {/* Create Structure Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpenPanel ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="bg-gradient-to-r from-primary-color to-teal-700 px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Create New Structure</h2>
          </div>
          <Button ghost onClick={closePanel} className="text-black hover:bg-black/80">
            <CloseCircleOutlined className=" text-xl" />
          </Button>
        </div>
        <div className="py-6 max-w-7xl m-auto max-md:py-6 px-16 max-md:px-4 max-lg:px-10">
          <h2 className="h5-style">Basic Information</h2>
          <form onSubmit={handleSubmit(onSubmitForm)} className="mt-4 flex flex-col gap-6">
            <FormInput
              type="text"
              id="name"
              name="name"
              placeholder="Enter name structure"
              label="Name structure"
              error={errors.name?.message}
              control={control}
            />
            <FormTextarea
              id="description"
              name="description"
              placeholder="Enter description structure"
              label="Description structure"
              error={errors.description?.message}
              control={control}
            />
            <div>

            </div>
            <button className="btn-login" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </>
  )
}