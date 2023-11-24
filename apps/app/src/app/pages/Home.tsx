import { Space, Table, Typography } from 'antd'
import Link from 'antd/es/typography/Link'
import { useNavigate } from 'react-router-dom'
const { Title, Paragraph } = Typography

const samples = [
  {
    name: 'Form Manager',
    description: 'Simplifying Heterogeneous Form Management in React Applications.',
    link: `${import.meta.env.BASE_URL}form-manager`,
  },
]

export const Home = () => {
  const navigate = useNavigate()

  return (
    <Space align="center" style={{ width: '100%', justifyContent: 'center' }}>
      <Typography>
        <Title>React Playground</Title>
        <Paragraph>
          This app contains multiple React samples. Each sample is a self-contained React application that demonstrates
          specific features, patterns, or concepts.
        </Paragraph>
        <Table
          dataSource={samples}
          onRow={(record) => {
            return {
              onClick: () => {
                navigate(record.link)
              },
            }
          }}
          columns={[
            {
              key: 'name',
              title: 'Sample',
              dataIndex: 'name',
            },
            {
              key: 'description',
              title: 'Description',
              dataIndex: 'description',
            },
            {
              key: 'link',
              title: 'Link',
              dataIndex: 'link',
              render: (link) => <Link href={link}>{link}</Link>,
            },
          ]}
        />
      </Typography>
    </Space>
  )
}
