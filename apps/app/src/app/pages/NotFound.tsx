import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate(import.meta.env.BASE_URL)}>
          Back Home
        </Button>
      }
    />
  )
}
