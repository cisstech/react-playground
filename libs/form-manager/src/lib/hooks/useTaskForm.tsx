import moment, { Moment } from 'moment'
import { TaskModel } from '../models/task'
import { useFormManager } from './useFormManager'

// Mixing of all field in simple tasks and/or complex tasks
export type TaskFormModel = {
  // COMMON
  name: string
  description: string
  priority: number

  // SIMPLE TASK SPECIFIC
  assignedToUser?: string

  // COMPLEX TASK SPECIFIC
  assignedToTeam?: string[]
  projectManager?: string
  estimatedAt?: Moment | null
  teamMembers?: string[]
}

export type TaskFormManager = ReturnType<typeof useTaskFormManager>

export const useTaskFormManager = (task: TaskModel) => {
  return useFormManager({
    entity: task,
    props: {
      canEdit: task.permissions.edit,
    },
    adapter: (task) => {
      const formModel: TaskFormModel = {
        // COMMON
        name: task.name,
        description: task.description,
        priority: task.priority,

        // SIMPLE SPECIFIC
        ...(task.type === 'simple'
          ? {
              assignedToUser: task.assignedToUser,
            }
          : {}),

        // COMPLEX SPECIFIC
        ...(task.type === 'complex'
          ? {
              assignedToTeam: task.assignedToTeam,
              projectManager: task.projectManager,
              estimatedAt: task.estimatedAt ? moment(task.estimatedAt) : null,
              teamMembers: task.teamMembers,
            }
          : {}),
      }
      return formModel
    },
  })
}
