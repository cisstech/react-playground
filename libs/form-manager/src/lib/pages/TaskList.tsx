import { HomeOutlined } from '@ant-design/icons'
import { Button, Drawer, Space } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useListTasks } from '../hooks/useTaskProvider'
import { TaskModel } from '../models/task'
import { TaskUpdate } from './TaskUpdate'
import { TaskTable } from './components/TaskTable'

export const TaskList: React.FC = () => {
  const { tasks, setTasks } = useListTasks()
  const [selection, setSelection] = useState<TaskModel | undefined>(undefined)
  const navigate = useNavigate()

  return (
    <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
      <Button onClick={() => navigate(-1)}>
        <HomeOutlined />
        Home
      </Button>
      <TaskTable tasks={tasks} onEdit={setSelection} />
      {selection && (
        <Drawer
          open={true}
          title={selection.name}
          width={'50%'}
          onClose={() => setSelection(undefined)}
          footer={<Space></Space>}
        >
          <TaskUpdate
            task={selection}
            onSubmit={(changes) => {
              let newTask = tasks.find((task) => task.id === selection.id)!
              if (!newTask) return Promise.reject('Task not found')

              newTask = {
                ...newTask,
                name: changes.name,
                description: changes.description,
                priority: changes.priority,

                ...(newTask.type === 'simple'
                  ? {
                      assignedToUser: changes.assignedToUser,
                    }
                  : {}),

                ...(newTask.type === 'complex'
                  ? {
                      assignedToTeam: changes.assignedToTeam,
                      projectManager: changes.projectManager,
                      estimatedAt: changes.estimatedAt?.toDate(),
                      teamMembers: changes.teamMembers,
                    }
                  : {}),
              }

              setSelection(newTask)

              setTasks((prev) => prev.map((oldTask) => (oldTask.id === selection.id ? newTask : oldTask)))
              return Promise.resolve()
            }}
          />
        </Drawer>
      )}
    </Space>
  )
}
