'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Navbar from '@/components/layout/Navbar'
import { UserProfileUtils, UserProfile, SkillLevel, skillLevelDefinitions } from '@/lib/userProfile'
import { Settings, User, Bell, Moon, Sun, Globe, Target, Save, CheckCircle2 } from 'lucide-react'

export default function SettingsPage() {
  const locale = useLocale()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>('beginner')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const userProfile = UserProfileUtils.getProfile()
    setProfile(userProfile)
    if (userProfile) {
      setSelectedLevel(userProfile.skillLevel)
    }
  }, [])

  const handleSaveSkillLevel = () => {
    setIsSaving(true)
    
    UserProfileUtils.updateSkillLevel(selectedLevel)
    
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
      
      // Reload profile
      const updatedProfile = UserProfileUtils.getProfile()
      setProfile(updatedProfile)
      
      // Hide saved message after 2 seconds
      setTimeout(() => setSaved(false), 2000)
    }, 500)
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted">Loading settings...</p>
        </div>
      </div>
    )
  }

  const skillLevels: { id: SkillLevel; label: string; description: string }[] = [
    { id: 'beginner', label: 'Beginner', description: 'New to bioinformatics' },
    { id: 'intermediate', label: 'Intermediate', description: 'Some experience' },
    { id: 'advanced', label: 'Advanced', description: 'Experienced professional' },
    { id: 'expert', label: 'Expert', description: 'Research-level expertise' },
  ]

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--t1)' }}>
            {locale === 'ar' ? 'الإعدادات' : 'Settings'}
          </h1>
          <p className="text-muted">
            {locale === 'ar' ? 'إدارة تفضيلاتك وملفك الشخصي' : 'Manage your preferences and profile'}
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Skill Level Section */}
          <div className="card-glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: 'var(--t1)' }}>
                  {locale === 'ar' ? 'مستوى الخبرة' : 'Experience Level'}
                </h3>
                <p className="text-sm text-muted">
                  {locale === 'ar' ? 'اختر مستواك في المعلوماتية الحيوية' : 'Choose your bioinformatics skill level'}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {skillLevels.map((level) => {
                const isSelected = selectedLevel === level.id
                const content = skillLevelDefinitions[level.id]

                return (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`
                      card-glass p-4 text-left transition-all
                      hover:glass-strong
                      ${isSelected ? 'ring-2 ring-primary-500 glass-strong' : ''}
                    `}
                  >
                    {isSelected && (
                      <div className="flex justify-end mb-2">
                        <CheckCircle2 className="w-5 h-5 text-primary-400" />
                      </div>
                    )}
                    
                    <h4 className="font-semibold mb-1" style={{ color: 'var(--t1)' }}>
                      {level.label}
                    </h4>
                    <p className="text-xs text-muted mb-3">
                      {level.description}
                    </p>
                    
                    <div className="space-y-1">
                      {content.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted">
                          <div className="w-1 h-1 rounded-full bg-primary-400"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-theme">
              <p className="text-sm text-muted">
                {selectedLevel !== profile.skillLevel && (
                  <span className="text-yellow-400">
                    {locale === 'ar' ? 'لديك تغييرات غير محفوظة' : 'You have unsaved changes'}
                  </span>
                )}
              </p>
              
              <button
                onClick={handleSaveSkillLevel}
                disabled={selectedLevel === profile.skillLevel || isSaving}
                className={`
                  btn-glow px-6 py-2 text-sm flex items-center gap-2
                  ${selectedLevel === profile.skillLevel ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>{locale === 'ar' ? 'جاري الحفظ...' : 'Saving...'}</span>
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'تم الحفظ!' : 'Saved!'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="card-glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg" style={{ color: 'var(--t1)' }}>
                  {locale === 'ar' ? 'إحصائيات الملف الشخصي' : 'Profile Statistics'}
                </h3>
                <p className="text-sm text-muted">
                  {locale === 'ar' ? 'تقدمك وإنجازاتك' : 'Your progress and achievements'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-primary-500/10">
                <p className="text-2xl font-bold gradient-text">{profile.progress.xp}</p>
                <p className="text-xs text-muted mt-1">
                  {locale === 'ar' ? 'نقاط الخبرة' : 'Total XP'}
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-orange-500/10">
                <p className="text-2xl font-bold gradient-text">{profile.progress.streak}</p>
                <p className="text-xs text-muted mt-1">
                  {locale === 'ar' ? 'سلسلة الأيام' : 'Day Streak'}
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-purple-500/10">
                <p className="text-2xl font-bold gradient-text">
                  {profile.progress.completedTutorials.length}
                </p>
                <p className="text-xs text-muted mt-1">
                  {locale === 'ar' ? 'دروس مكتملة' : 'Completed'}
                </p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-green-500/10">
                <p className="text-2xl font-bold gradient-text">
                  {Math.round(
                    (profile.progress.completedTutorials.length / 
                    skillLevelDefinitions[profile.skillLevel].tutorials.length) * 100
                  )}%
                </p>
                <p className="text-xs text-muted mt-1">
                  {locale === 'ar' ? 'التقدم' : 'Progress'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
