import { useState } from 'react'
import { TaskModel } from '../models/task'

export const useListTeams = () => {
  const [teams, setTeams] = useState<string[]>(['Team A', 'Team B', 'Team C'])

  return {
    teams,
    setTeams,
  }
}

export const useListUsers = () => {
  const [users, setUsers] = useState<string[]>(['Alice', 'Bob', 'John Doe'])

  return {
    users,
    setUsers,
  }
}

export const useListTasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([
    {
      id: 1,
      type: 'simple',
      name: 'Complete Task A',
      description: 'Finish the assigned task by the deadline.',
      priority: 2,
      assignedToUser: 'John Doe',
      permissions: {
        edit: true,
      },
    },
    {
      id: 2,
      type: 'complex',
      name: 'Project X',
      description: 'Manage and lead Project X to success.',
      priority: 1,
      assignedToTeam: ['Team A', 'Team B'],
      projectManager: 'Jane Doe',
      estimatedAt: new Date('2023-12-01'),
      teamMembers: ['Alice', 'Bob'],
      permissions: {
        edit: true,
      },
    },
    // Add more tasks as needed
  ])

  return {
    tasks,
    setTasks,
  }
}
