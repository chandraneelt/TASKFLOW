'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import Link from 'next/link'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Task {
  _id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  createdAt: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [searchTerm, statusFilter, priorityFilter])

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter) params.append('status', statusFilter)
      if (priorityFilter) params.append('priority', priorityFilter)
      params.append('limit', '50')

      const response = await api.get(`/tasks?${params.toString()}`)
      setTasks(response.data.tasks)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      toast.error('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const deleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      await api.delete(`/tasks/${taskId}`)
      setTasks(tasks.filter(task => task._id !== taskId))
      toast.success('Task deleted successfully')
    } catch (error) {
      console.error('Failed to delete task:', error)
      toast.error('Failed to delete task')
    }
  }

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, { status })
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data.task : task
      ))
      toast.success('Task status updated')
    } catch (error) {
      console.error('Failed to update task:', error)
      toast.error('Failed to update task')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tasks and track your progress
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/dashboard/tasks/new" className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input-field"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white shadow rounded-lg">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter || priorityFilter 
                ? 'Try adjusting your filters or search term.'
                : 'Get started by creating your first task.'
              }
            </p>
            <Link href="/dashboard/tasks/new" className="btn-primary">
              Create Task
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {task.title}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      {task.description && (
                        <p className="mt-1 text-sm text-gray-500 truncate">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                        <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                        {task.dueDate && (
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Status Update Dropdown */}
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                        className="text-sm border-gray-300 rounded-md"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <Link
                        href={`/dashboard/tasks/${task._id}/edit`}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}