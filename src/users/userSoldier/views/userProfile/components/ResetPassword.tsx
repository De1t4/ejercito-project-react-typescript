import { Modal } from "antd";
import { useState } from "react";

export default function ResetPassword() {
  const [modal1Open, setModal1Open] = useState(false);

  return (
    <>
      <Modal
        title={<h5 className="h5-style">Services Assigned</h5>}
        centered
        open={modal1Open}
        style={{ content: "#000" }}
        onOk={() => setModal1Open(false)}
        footer={null}
        onCancel={() => setModal1Open(false)}
      >
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Current Password</label>
            <input placeholder="Current Password" className=" bg-beige-color shadow-sm h-10 px-4" type="password" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">New Password</label>
            <input placeholder="New Password" className=" bg-beige-color shadow-sm h-10 px-4" type="password" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Confirm Password</label>
            <input placeholder="Confirm Password" className=" bg-beige-color shadow-sm h-10 px-4" type="password" />
          </div>
          <button type="button" className=" w-full bg-primary-color h-10 text-white-color font-medium rounded-md mt-2">Update Password</button>
        </form>
      </Modal>
      <button onClick={() => setModal1Open(true)} type="button" className="btn-green">Change Password</button>
    </>
  )
}