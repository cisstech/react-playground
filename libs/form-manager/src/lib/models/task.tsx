export type SimpleTaskModel = {
  id: number
  type: 'simple'

  name: string
  description: string
  priority: number

  assignedToUser?: string

  permissions: {
    edit: boolean
  }
}

export type ComplexTaskModel = {
  id: number
  type: 'complex'

  name: string
  description: string
  priority: number

  assignedToTeam?: string[]
  projectManager?: string
  estimatedAt?: Date
  teamMembers?: string[]

  permissions: {
    edit: boolean
  }
}

export type TaskModel = SimpleTaskModel | ComplexTaskModel
