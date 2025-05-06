import { useGlobalContext } from "@/context/globalContext"
import { modifyPasswordUser } from "@/services/ProfileService"
import InputPassword from "@/shared/components/InputPassword"
import { FormValidation, initialStatePassword, schemaValidation } from "@/users/userSoldier/models/Password.models"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function UserSettings() {
  const { profile, authTokens } = useGlobalContext()
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValidation>({
    defaultValues: initialStatePassword,
    resolver: zodResolver(schemaValidation),
  })

  const onSubmit: SubmitHandler<FormValidation> = async (data) => {
    if (!authTokens) return
    const res = await modifyPasswordUser(data, authTokens.token)
    if (res === 'BAD_REQUEST') {
      alert('La contraseña es incorrecta')
      return
    }
    reset(initialStatePassword)
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium">Account Settings</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 disabled:cursor-not-allowed border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={profile.username}
                  id="username"
                  disabled
                />
                <p className="h-5"></p>
              </div>
            </div>
            <div>
              <label htmlFor="role-user" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border disabled:cursor-not-allowed border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={profile.role}
                  id="role-user"
                  disabled
                />
                <p className="h-5"></p>
              </div>
            </div>
            <InputPassword
              label="Current Password"
              type="password"
              id="currentPassword"
              placeholder="Current Password"
              control={control}
              error={errors.currentPassword?.message}
              name="currentPassword"
              styleInput="input-style-generic"
            />
            <InputPassword
              label="New Password"
              type="password"
              id="newPassword"
              placeholder="New Password"
              control={control}
              error={errors.newPassword?.message}
              name="newPassword"
              styleInput="input-style-generic"
            />
            <InputPassword
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              control={control}
              error={errors.confirmPassword?.message}
              name="confirmPassword"
              styleInput="input-style-generic"
            />
            {/* IN THE FUTURE ADD LANGUAGES */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div> */}
          </div>
          <div className="flex justify-end max-sm:flex-col max-sm:gap-4">
            <Link to={"/dashboard"} className="px-4 py-2 text-center bg-gray-200 text-gray-700 rounded-md mr-2">Cancel</Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>)
}