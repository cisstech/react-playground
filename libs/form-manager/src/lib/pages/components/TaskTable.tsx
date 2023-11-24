import { Table } from 'antd'
import { TaskModel } from '../../models/task'

type Props = {
  tasks: TaskModel[]
  onEdit: (task: TaskModel) => void
}

export const TaskTable: React.FC<Props> = ({ tasks, onEdit }) => {
  return (
    <Table
      onRow={(record) => ({
        onClick: () => onEdit(record),
      })}
      dataSource={tasks}
      columns={[
        {
          key: 'name',
          title: 'Name',
          dataIndex: 'name',
        },
        {
          key: 'description',
          title: 'Description',
          dataIndex: 'description',
        },
        {
          key: 'priority',
          title: 'Priority',
          dataIndex: 'priority',
        },
        {
          key: 'type',
          title: 'Type',
          dataIndex: 'type',
        },
      ]}
    />
  )
}
