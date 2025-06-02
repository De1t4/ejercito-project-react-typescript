import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const redirect = useNavigate()
  return (
    <div className=" max-h-max flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle={
          <p >Sorry, the page you visited does not exist.</p>
        }
        extra={<Button onClick={() => redirect(-1)} type="primary">Back Home</Button>}
      />
    </div>
  )
}