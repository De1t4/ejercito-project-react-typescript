import { ReloadOutlined } from "@ant-design/icons";

interface FooterPropsModal {
  isSubmitting: boolean,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: () => void
  title: string
}

export default function FooterModal({ isSubmitting, setModalOpen, handleSubmit, title }: FooterPropsModal) {
  return (
    <>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
        >
          {isSubmitting ? (
            <>
              <ReloadOutlined size={16} className="animate-spin mr-2" />
              {title}...
            </>
          ) : (
            `${title}`
          )}
        </button>
      </div>
    </>
  )
}