# Supabase Setup Guide for BioNXA

This guide will help you set up Supabase for BioNXA's backend authentication and database.

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)

## 🚀 Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project Name**: `bionxa-academy`
   - **Database Password**: Generate a strong password (save it securely!)
   - **Region**: Choose closest to Saudi Arabia (e.g., "Southeast Asia (Singapore)" or "West Asia (Mumbai)")
   - **Pricing Plan**: Free tier is sufficient for development

4. Wait 2-3 minutes for project creation

## 🔧 Step 2: Configure Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" to execute the schema creation

This will create:
- `user_profiles` table
- `course_progress` table
- `achievements` table
- `certificates` table
- `learning_sessions` table
- `user_settings` table
- All necessary indexes, policies, and triggers

## 🔐 Step 3: Get API Keys

1. In Supabase dashboard, go to **Settings > API**
2. Copy the following values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1...` (long string)

## 📝 Step 4: Configure Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **IMPORTANT**: Add `.env.local` to `.gitignore` (already done)

## 🔑 Step 5: Configure Authentication Providers

### Email/Password Authentication (Default)

1. Go to **Authentication > Providers**
2. Ensure **Email** is enabled
3. Configure email templates:
   - Go to **Authentication > Email Templates**
   - Customize "Confirm signup", "Magic Link", "Reset Password" templates
   - Add your branding and BioNXA logo

### Google OAuth

1. Create a Google Cloud Project at https://console.cloud.google.com
2. Enable **Google+ API**
3. Create OAuth 2.0 credentials:
   - **Application type**: Web application
   - **Authorized redirect URIs**: 
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
4. Copy **Client ID** and **Client Secret**
5. In Supabase:
   - Go to **Authentication > Providers**
   - Enable **Google**
   - Paste Client ID and Client Secret
   - Click "Save"

### Apple Sign-In

1. Go to Apple Developer Account (https://developer.apple.com)
2. Register a new **Services ID**
3. Configure **Sign In with Apple**:
   - **Return URLs**: 
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
4. Create a **Key** for Apple Sign In
5. In Supabase:
   - Go to **Authentication > Providers**
   - Enable **Apple**
   - Add Services ID, Team ID, and Key
   - Upload your `.p8` key file

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: BioNXA Academy
   - **Homepage URL**: https://bionxa.com
   - **Authorization callback URL**:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
4. Copy **Client ID** and **Client Secret**
5. In Supabase:
   - Go to **Authentication > Providers**
   - Enable **GitHub**
   - Paste Client ID and Client Secret

## 🌐 Step 6: Configure URLs

1. Go to **Authentication > URL Configuration**
2. Add **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3005/auth/callback
   https://bionxa.com/auth/callback
   https://www.bionxa.com/auth/callback
   ```
3. Set **Site URL**: `https://bionxa.com` (or your production domain)

## 📦 Step 7: Install Supabase Client

The Supabase client is already included in `package.json`. If not, install it:

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

## ✅ Step 8: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/auth

3. Try signing up with:
   - Email/password
   - Google Sign-In
   - Apple Sign-In
   - GitHub Sign-In

4. Check Supabase dashboard:
   - Go to **Authentication > Users** to see new users
   - Go to **Table Editor > user_profiles** to see auto-created profiles

## 🔧 Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Restart your dev server after changing `.env.local`

### OAuth providers not working
- Verify redirect URLs match exactly in both provider (Google/Apple/GitHub) and Supabase
- Check that OAuth credentials are correctly entered in Supabase dashboard
- Ensure your domain is verified (for production)

### Row Level Security errors
- RLS policies are automatically created by the schema
- If you get permission errors, run the schema.sql again
- Check that `auth.uid()` is working in SQL Editor

### Email not sending
- Supabase free tier has email rate limits (3 emails/hour for free tier)
- For production, configure a custom SMTP server in **Settings > Auth**
- Recommended: Use SendGrid or Amazon SES for production emails

## 📊 Monitoring & Analytics

1. **Database Performance**:
   - Go to **Database > Query Performance** to monitor slow queries

2. **Authentication Logs**:
   - Go to **Authentication > Logs** to see signup/signin events

3. **API Usage**:
   - Go to **Settings > Usage** to monitor API calls and database size

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to Git (already in `.gitignore`)
2. **Use service_role key only on backend** (never expose to frontend)
3. **Enable MFA** for admin Supabase account
4. **Set up database backups** in production (Settings > Database > Backups)
5. **Monitor authentication logs** for suspicious activity
6. **Rotate API keys** periodically (Settings > API > Reset keys)

## 🚀 Production Deployment

Before deploying to production:

1. **Enable database backups** (Settings > Database > Backups)
2. **Configure custom domain** (Settings > General > Custom Domain)
3. **Set up SMTP** for reliable emails (Settings > Auth > SMTP Settings)
4. **Enable Postgres connection pooling** for better performance
5. **Set up monitoring** with Datadog or Sentry
6. **Configure rate limiting** in Supabase Edge Functions
7. **Add IP restrictions** if needed (Settings > API > Restrictions)

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## 🆘 Support

- Supabase Discord: https://discord.supabase.com
- Supabase GitHub Discussions: https://github.com/supabase/supabase/discussions
- BioNXA Support: support@bionxa.com

---

**🎉 Congratulations!** Your Supabase backend is now configured for BioNXA Academy.
