// Supabase Client Configuration for BioNXA
// This handles authentication and database operations

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('⚠️ Supabase credentials not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

// Create Supabase client only if credentials are available
// Use dummy credentials for demo mode to prevent errors
export const supabase = createClient(
  supabaseUrl || 'https://demo.supabase.co',
  supabaseAnonKey || 'demo-anon-key-placeholder'
)

// Database Types (will match Supabase schema)
export interface UserProfile {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  country?: string
  institution?: string
  bio?: string
  created_at: string
  updated_at: string
}

export interface CourseProgress {
  id: string
  user_id: string
  course_id: string
  course_name: string
  progress_percentage: number
  completed: boolean
  started_at: string
  completed_at?: string
  time_spent_minutes: number
}

export interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  achievement_name: string
  description: string
  earned_at: string
  icon_url?: string
}

export interface Certificate {
  id: string
  user_id: string
  course_id: string
  course_name: string
  issued_at: string
  certificate_url: string
  verification_code: string
}

// Helper Functions for Auth
export async function signUpWithEmail(email: string, password: string, fullName: string) {
  if (!isSupabaseConfigured) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your Supabase credentials in .env.local' } 
    }
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })
  return { data, error }
}

export async function signInWithEmail(email: string, password: string) {
  if (!isSupabaseConfigured) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your Supabase credentials in .env.local' } 
    }
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signInWithOAuth(provider: 'google' | 'github' | 'apple') {
  if (!isSupabaseConfigured) {
    return { 
      data: null, 
      error: { message: 'Supabase is not configured. Please set up your Supabase credentials to enable OAuth sign-in.' } 
    }
  }
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Helper Functions for User Profile
export async function getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: any }> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Helper Functions for Course Progress
export async function getUserCourseProgress(userId: string): Promise<{ data: CourseProgress[] | null; error: any }> {
  const { data, error } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })
  
  return { data, error }
}

export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: Partial<CourseProgress>
) {
  const { data, error } = await supabase
    .from('course_progress')
    .upsert({
      user_id: userId,
      course_id: courseId,
      ...progress,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  return { data, error }
}

export async function completeCourse(userId: string, courseId: string) {
  const { data, error } = await supabase
    .from('course_progress')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
      progress_percentage: 100,
    })
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .select()
    .single()
  
  return { data, error }
}

// Helper Functions for Achievements
export async function getUserAchievements(userId: string): Promise<{ data: Achievement[] | null; error: any }> {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })
  
  return { data, error }
}

export async function awardAchievement(
  userId: string,
  achievementType: string,
  achievementName: string,
  description: string
) {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      achievement_type: achievementType,
      achievement_name: achievementName,
      description,
      earned_at: new Date().toISOString(),
    })
    .select()
    .single()
  
  return { data, error }
}

// Helper Functions for Certificates
export async function getUserCertificates(userId: string): Promise<{ data: Certificate[] | null; error: any }> {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId)
    .order('issued_at', { ascending: false })
  
  return { data, error }
}

export async function issueCertificate(
  userId: string,
  courseId: string,
  courseName: string,
  certificateUrl: string
) {
  const verificationCode = `BNX-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`
  
  const { data, error } = await supabase
    .from('certificates')
    .insert({
      user_id: userId,
      course_id: courseId,
      course_name: courseName,
      issued_at: new Date().toISOString(),
      certificate_url: certificateUrl,
      verification_code: verificationCode,
    })
    .select()
    .single()
  
  return { data, error }
}

// Real-time subscription for user data changes
export function subscribeToUserChanges(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`user-${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_profiles',
        filter: `id=eq.${userId}`,
      },
      callback
    )
    .subscribe()
}
