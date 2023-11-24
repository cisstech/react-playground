// useTaskFormElements.js
import { DatePicker, Form, Input, InputNumber, Select } from 'antd'
import { FormElements } from '../models/elements'
import { TaskModel } from '../models/task'
import { TaskFormManager } from './useTaskForm'
import { useListTeams, useListUsers } from './useTaskProvider'

const FormItem = Form.Item

type SimpleElements = FormElements<'assignedToUser'>
type CommonElements = FormElements<'name' | 'description' | 'priority'>
type ComplexElements = FormElements<'assignedToTeam' | 'projectManager' | 'estimatedAt' | 'teamMembers'>

export type TaskFormElements = CommonElements & SimpleElements & ComplexElements

export const useTaskFormElements = (form: TaskFormManager, task: TaskModel): TaskFormElements => {
  const { teams } = useListTeams()
  const { users } = useListUsers()

  const commonElements: CommonElements = {
    name: form.editing ? (
      <FormItem name="name" rules={[{ required: true, type: 'string', min: 3 }]}>
        <Input />
      </FormItem>
    ) : (
      task.name
    ),
    description: form.editing ? (
      <FormItem name="description" rules={[{ required: true, type: 'string', min: 3 }]}>
        <Input.TextArea />
      </FormItem>
    ) : (
      task.description
    ),
    priority: form.editing ? (
      <FormItem name="priority" rules={[{ required: true, type: 'number' }]}>
        <InputNumber />
      </FormItem>
    ) : (
      task.priority
    ),
  }

  let simpleElements = {} as SimpleElements
  if (task.type === 'simple') {
    simpleElements = {
      assignedToUser: form.editing ? (
        <FormItem name="assignedToUser">
          <Input />
        </FormItem>
      ) : (
        task.assignedToUser
      ),
    }
  }

  let complexElements = {} as ComplexElements
  if (task.type === 'complex') {
    complexElements = {
      assignedToTeam: form.editing ? (
        <FormItem name="assignedToTeam">
          <Select mode="multiple" placeholder="Please select users...">
            {teams.map((team) => (
              <Select.Option key={team}>{team}</Select.Option>
            ))}
          </Select>
        </FormItem>
      ) : (
        task.assignedToTeam?.join(', ')
      ),
      projectManager: form.editing ? (
        <FormItem name="projectManager">
          <Select placeholder="Please select an user...">
            {users.map((user) => (
              <Select.Option key={user}>{user}</Select.Option>
            ))}
          </Select>
        </FormItem>
      ) : (
        task.projectManager
      ),
      estimatedAt: form.editing ? (
        <FormItem name="estimatedAt">
          <DatePicker />
        </FormItem>
      ) : (
        task.estimatedAt?.toString()
      ),
      teamMembers: form.editing ? (
        <FormItem name="teamMembers">
          <Select mode="multiple" placeholder={''}>
            {users.map((user) => (
              <Select.Option key={user}>{user}</Select.Option>
            ))}
          </Select>
        </FormItem>
      ) : (
        task.teamMembers?.join(', ')
      ),
    }
  }

  return {
    ...commonElements,
    ...simpleElements,
    ...complexElements,
  }
}
