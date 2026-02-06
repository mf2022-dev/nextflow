'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, BookOpen, Award, Settings, LogOut, Mail, MapPin, Building, 
  TrendingUp, Clock, CheckCircle, Trophy, Star, Zap, Brain, Code,
  Edit, Camera, Save, X
} from 'lucide-react'
import { getCurrentUser, getUserProfile, getUserCourseProgress, getUserAchievements, getUserCertificates, signOut, updateUserProfile } from '@/lib/supabase'
import type { UserProfile, CourseProgress, Achievement, Certificate } from '@/lib/supabase'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [progress, setProgress] = useState<CourseProgress[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'achievements' | 'certificates' | 'settings'>('overview')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({})

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      // Get current user
      const { user: currentUser, error: userError } = await getCurrentUser()
      if (userError || !currentUser) {
        router.push('/auth')
        return
      }

      setUser(currentUser)

      // Load user profile
      const { data: profileData, error: profileError } = await getUserProfile(currentUser.id)
      if (profileData) {
        setProfile(profileData)
        setEditedProfile(profileData)
      }

      // Load course progress
      const { data: progressData } = await getUserCourseProgress(currentUser.id)
      if (progressData) setProgress(progressData)

      // Load achievements
      const { data: achievementsData } = await getUserAchievements(currentUser.id)
      if (achievementsData) setAchievements(achievementsData)

      // Load certificates
      const { data: certificatesData } = await getUserCertificates(currentUser.id)
      if (certificatesData) setCertificates(certificatesData)

    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const handleSaveProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await updateUserProfile(user.id, editedProfile)
      if (error) throw error

      setProfile(data)
      setIsEditingProfile(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const stats = {
    coursesStarted: progress.length,
    coursesCompleted: progress.filter(p => p.completed).length,
    totalMinutes: progress.reduce((acc, p) => acc + p.time_spent_minutes, 0),
    achievementsEarned: achievements.length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-display font-bold gradient-text">
              BioNXA Academy
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-strong rounded-2xl p-6 sticky top-6">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-bold mb-1">{profile?.full_name || 'User'}</h2>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'overview' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'progress' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>My Progress</span>
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'achievements' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </button>
                <button
                  onClick={() => setActiveTab('certificates')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'certificates' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                  <span>Certificates</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings' ? 'bg-primary-500/20 text-primary-400' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-display font-bold mb-2">
                    Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
                  </h1>
                  <p className="text-gray-400">Here's your learning progress at a glance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="glass-strong rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="w-8 h-8 text-primary-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.coursesStarted}</p>
                    <p className="text-sm text-gray-400">Courses Started</p>
                  </div>
                  <div className="glass-strong rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.coursesCompleted}</p>
                    <p className="text-sm text-gray-400">Completed</p>
                  </div>
                  <div className="glass-strong rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="w-8 h-8 text-secondary-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{Math.floor(stats.totalMinutes / 60)}h</p>
                    <p className="text-sm text-gray-400">Learning Time</p>
                  </div>
                  <div className="glass-strong rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Trophy className="w-8 h-8 text-amber-400" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stats.achievementsEarned}</p>
                    <p className="text-sm text-gray-400">Achievements</p>
                  </div>
                </div>

                {/* Recent Progress */}
                <div className="glass-strong rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-400" />
                    Continue Learning
                  </h2>
                  {progress.length > 0 ? (
                    <div className="space-y-4">
                      {progress.slice(0, 3).map((course) => (
                        <div key={course.id} className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{course.course_name}</h3>
                            <span className="text-sm text-gray-400">{course.progress_percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress_percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {course.time_spent_minutes} minutes spent
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">You haven't started any courses yet</p>
                      <Link
                        href="/tutorials"
                        className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Browse Tutorials
                      </Link>
                    </div>
                  )}
                </div>

                {/* Recent Achievements */}
                {achievements.length > 0 && (
                  <div className="glass-strong rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Star className="w-6 h-6 mr-2 text-amber-400" />
                      Recent Achievements
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                      {achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-lg p-4 text-center">
                          <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                          <h3 className="font-semibold mb-1">{achievement.achievement_name}</h3>
                          <p className="text-xs text-gray-400">{achievement.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-display font-bold">My Learning Progress</h1>
                <div className="space-y-4">
                  {progress.length > 0 ? (
                    progress.map((course) => (
                      <div key={course.id} className="glass-strong rounded-xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{course.course_name}</h3>
                            <p className="text-sm text-gray-400">
                              Started {new Date(course.started_at).toLocaleDateString()}
                            </p>
                          </div>
                          {course.completed && (
                            <div className="bg-green-900/20 border border-green-700/30 rounded-full px-3 py-1 flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                              <span className="text-xs text-green-300">Completed</span>
                            </div>
                          )}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all"
                            style={{ width: `${course.progress_percentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{course.progress_percentage}% complete</span>
                          <span>{course.time_spent_minutes} minutes</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass-strong rounded-xl p-12 text-center">
                      <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No courses started yet</h3>
                      <p className="text-gray-400 mb-6">Start your learning journey today!</p>
                      <Link
                        href="/tutorials"
                        className="inline-flex items-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                      >
                        Browse Tutorials
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-display font-bold">My Achievements</h1>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.length > 0 ? (
                    achievements.map((achievement) => (
                      <div key={achievement.id} className="glass-strong rounded-xl p-6">
                        <div className="flex items-start">
                          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                            <Trophy className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1">{achievement.achievement_name}</h3>
                            <p className="text-sm text-gray-400 mb-2">{achievement.description}</p>
                            <p className="text-xs text-gray-500">
                              Earned {new Date(achievement.earned_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 glass-strong rounded-xl p-12 text-center">
                      <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No achievements yet</h3>
                      <p className="text-gray-400">Complete courses and challenges to earn achievements!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-display font-bold">My Certificates</h1>
                <div className="grid md:grid-cols-2 gap-4">
                  {certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <div key={cert.id} className="glass-strong rounded-xl p-6">
                        <div className="bg-gradient-to-br from-primary-900/20 to-secondary-900/20 border border-primary-700/30 rounded-lg p-4 mb-4">
                          <Trophy className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                          <h3 className="text-center font-semibold">{cert.course_name}</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          Issued {new Date(cert.issued_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Verification: {cert.verification_code}
                        </p>
                        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition">
                          Download Certificate
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 glass-strong rounded-xl p-12 text-center">
                      <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No certificates earned yet</h3>
                      <p className="text-gray-400">Complete courses to earn certificates!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-display font-bold">Account Settings</h1>
                
                <div className="glass-strong rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    {!isEditingProfile ? (
                      <button
                        onClick={() => setIsEditingProfile(true)}
                        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingProfile(false)
                            setEditedProfile(profile || {})
                          }}
                          className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={isEditingProfile ? editedProfile.full_name || '' : profile?.full_name || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, full_name: e.target.value })}
                        disabled={!isEditingProfile}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white opacity-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Country
                      </label>
                      <input
                        type="text"
                        value={isEditingProfile ? editedProfile.country || '' : profile?.country || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, country: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="e.g., Saudi Arabia"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Institution
                      </label>
                      <input
                        type="text"
                        value={isEditingProfile ? editedProfile.institution || '' : profile?.institution || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, institution: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="e.g., King Saud University"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={isEditingProfile ? editedProfile.bio || '' : profile?.bio || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                        disabled={!isEditingProfile}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass-strong rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
                  <button className="bg-red-900/20 border border-red-700/30 hover:bg-red-900/30 text-red-400 font-semibold px-6 py-3 rounded-lg transition">
                    Delete Account
                  </button>
                  <p className="text-xs text-gray-500 mt-2">This action cannot be undone</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
