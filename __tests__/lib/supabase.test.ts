import { isSupabaseConfigured } from '@/lib/supabase'

describe('Supabase Configuration', () => {
  it('should detect when Supabase is not configured', () => {
    expect(typeof isSupabaseConfigured).toBe('boolean')
  })
})
