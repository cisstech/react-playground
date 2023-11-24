import { Button, Col, Descriptions, Form, Row, Space, message } from 'antd'
import { TaskFormModel, useTaskFormManager } from '../hooks/useTaskForm'
import { TaskFormElements, useTaskFormElements } from '../hooks/useTaskFormElements'
import { TaskModel } from '../models/task'

// These layout are just for demo purposes and not following any design guidelines

const SimpleLayout = (elements: TaskFormElements) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <strong>Name:</strong> {elements.name}
          </div>
          <div>
            <strong>Description:</strong> {elements.description}
          </div>
          <div>
            <strong>Priority:</strong> {elements.priority}
          </div>
          <div>
            <strong>Assigned To User:</strong> {elements.assignedToUser}
          </div>
        </Space>
      </Col>
    </Row>
  )
}

const ComplexLayout = (elements: TaskFormElements) => {
  return (
    <Descriptions column={2} bordered>
      <Descriptions.Item span={2} label="Name">
        {elements.name}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Description">
        {elements.description}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Priority">
        {elements.priority}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Assigned To Team">
        {elements.assignedToTeam}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Project Manager">
        {elements.projectManager}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Estimated At">
        {elements.estimatedAt}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Team Members">
        {elements.teamMembers}
      </Descriptions.Item>
    </Descriptions>
  )
}

type Props = {
  task: TaskModel
  onSubmit: (form: TaskFormModel) => Promise<void>
}

export const TaskUpdate: React.FC<Props> = ({ task, onSubmit }) => {
  const form = useTaskFormManager(task)
  const elements = useTaskFormElements(form, task)

  return (
    <Form<TaskFormModel>
      form={form.instance}
      initialValues={form.value}
      onFinish={(values) => {
        onSubmit(values)
          .then(() => {
            form.setEditing(false)
            message.success('Task updated successfully')
          })
          .catch(() => {
            message.error('Error updating task')
          })
      }}
      onValuesChange={(_, values) => form.patch(values)}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {task.type === 'simple' && SimpleLayout(elements)}
        {task.type === 'complex' && ComplexLayout(elements)}
        <Space>
          {!form.editing && form.canEdit && (
            <Button type="primary" onClick={() => form.setEditing(true)}>
              Edit
            </Button>
          )}
          {form.editing && <Button onClick={() => form.cancelEditing()}>Cancel</Button>}

          {form.editing && (
            <Button type="primary" onClick={() => form.submit()}>
              Save
            </Button>
          )}
        </Space>
      </Space>
    </Form>
  )
}
