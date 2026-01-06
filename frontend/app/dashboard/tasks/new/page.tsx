'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface TaskForm {
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
}

export default function NewTaskPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TaskForm>({
    defaultValues: {
      status: 'pending',
      priority: 'medium'
    }
  })

  const onSubmit = async (data: TaskForm) => {
    setIsLoading(true)
    try {
      const taskData = {
        ...data,
        dueDate: data.dueDate || undefined
      }
      
      await api.post('/tasks', taskData)
      toast.success('Task created successfully!')
      router.push('/dashboard/tasks')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create task'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/tasks"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tasks
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a new task to track your progress and stay organized.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Task Title *
              </label>
              <div className="mt-1">
                <input
                  {...register('title', {
                    required: 'Task title is required',
                    minLength: {
                      value: 1,
                      message: 'Title must be at least 1 character'
                    },
                    maxLength: {
                      value: 100,
                      message: 'Title cannot exceed 100 characters'
                    }
                  })}
                  type="text"
                  className="input-field"
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  {...register('description', {
                    maxLength: {
                      value: 500,
                      message: 'Description cannot exceed 500 characters'
                    }
                  })}
                  rows={4}
                  className="input-field"
                  placeholder="Describe your task (optional)"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <select {...register('status')} className="input-field">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-1">
                  <select {...register('priority')} className="input-field">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                Due Date (Optional)
              </label>
              <div className="mt-1">
                <input
                  {...register('dueDate')}
                  type="date"
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href="/dashboard/tasks"
                className="btn-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}