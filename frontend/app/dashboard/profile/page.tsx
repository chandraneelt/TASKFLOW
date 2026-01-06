'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { User, Mail, Calendar } from 'lucide-react'

interface ProfileForm {
  name: string
  bio: string
  avatar: string
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    }
  })

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    try {
      await updateProfile(data)
    } catch (error) {
      // Error is handled in AuthContext
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-5 mb-6">
            <div className="flex-shrink-0">
              <div className="relative">
                {user?.avatar ? (
                  <img
                    className="h-16 w-16 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-600" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                {user?.email}
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
                Member since {new Date(user?.createdAt || '').toLocaleDateString()}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name cannot exceed 50 characters'
                    }
                  })}
                  type="text"
                  className="input-field"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  {...register('bio', {
                    maxLength: {
                      value: 500,
                      message: 'Bio cannot exceed 500 characters'
                    }
                  })}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about yourself..."
                />
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <div className="mt-1">
                <input
                  {...register('avatar', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid URL'
                    }
                  })}
                  type="url"
                  className="input-field"
                  placeholder="https://example.com/avatar.jpg"
                />
                {errors.avatar && (
                  <p className="mt-1 text-sm text-red-600">{errors.avatar.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Account Information */}
      <div className="mt-6 bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Account Information
          </h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Created</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(user?.updatedAt || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}