import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";

export default function ModalFormService() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <PlusOutlined size={16} />
        <span>Add Service</span>
      </button>
      <Modal
        title="Create New Service"
        centered
        footer={<>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              // disabled={isSubmitting}
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              //  onClick={handleSubmit(handleSubmitSoldier)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[100px]"
            >
              {/* {isSubmitting ? (
                <>
                  <ReloadOutlined size={16} className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                "Create Soldier"
              )} */}
              Create Service
            </button>
          </div>
        </>}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-700 pb-1 border-b border-gray-100">Service Information</h3>

          </div>
        </form>
      </Modal>
    </>
  )
}