# 🚀 DEPLOY TO VERCEL - STEP-BY-STEP GUIDE

**Project**: BioNXA Learning Platform  
**Target URL**: bionxa.vercel.app  
**Status**: Ready to deploy ✅

---

## 📋 **DEPLOYMENT STEPS (5 MINUTES)**

### **STEP 1: Go to Vercel** (1 minute)

1. Open browser and go to: **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"** (easiest!)
4. Authorize Vercel to access your GitHub account

---

### **STEP 2: Import Your Repository** (2 minutes)

1. After login, click **"Add New..."** → **"Project"**
2. You'll see "Import Git Repository"
3. Find: **`mf2022-dev/nextflow`** in the list
4. Click **"Import"** next to it

---

### **STEP 3: Configure Project** (2 minutes)

You'll see a configuration screen:

#### **Project Name:**
```
bionxa
```
(This will make your URL: `bionxa.vercel.app`)

#### **Framework Preset:**
- Should auto-detect: **Next.js** ✅

#### **Root Directory:**
- Set to: `training-platform`

#### **Build Settings:**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

---

### **STEP 4: Add Environment Variables** (CRITICAL!)

Click **"Environment Variables"** section and add these:

**Variable 1:**
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://lmlkjcsyvbgglsuovmik.supabase.co
```

**Variable 2:**
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtbGtqY3N5dmJnZ2xzdW92bWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzE2NDAsImV4cCI6MjA4NTk0NzY0MH0.MzmgBnumvJFsithR6pEMk2jPvYuiEhu53pb87HRCTEA
```

**How to add them:**
1. Click "Add" for each variable
2. Type the Name
3. Paste the Value
4. Select: **Production, Preview, Development** (all three)
5. Click "Add"

---

### **STEP 5: Deploy!** (1 minute)

1. Click the big **"Deploy"** button
2. Wait 2-3 minutes (you'll see build logs)
3. When done, you'll see: **"Congratulations! 🎉"**

---

## 🌐 **YOUR LIVE URLS**

After deployment, your site will be live at:

**Production URL:**
```
https://bionxa.vercel.app
```

**With routes:**
- Homepage: `https://bionxa.vercel.app/en`
- Arabic: `https://bionxa.vercel.app/ar`
- Auth: `https://bionxa.vercel.app/en/auth`
- Pricing: `https://bionxa.vercel.app/en/pricing`
- Privacy: `https://bionxa.vercel.app/en/privacy`
- Terms: `https://bionxa.vercel.app/en/terms`

---

## ✅ **VERIFICATION CHECKLIST**

After deployment, test these:

- [ ] Visit `https://bionxa.vercel.app/en`
- [ ] Check homepage loads
- [ ] Switch to Arabic (`/ar`)
- [ ] Test auth page (`/en/auth`)
- [ ] Verify no Supabase credential warnings in browser console

---

## 🔧 **TROUBLESHOOTING**

### Problem: Build Failed

**Solution:**
1. Check build logs for errors
2. Make sure Root Directory is set to `training-platform`
3. Verify environment variables are added

### Problem: "Supabase not configured" warning

**Solution:**
1. Go to Vercel project → Settings → Environment Variables
2. Verify both variables are added
3. Redeploy: Deployments → Click "..." → Redeploy

### Problem: 404 on homepage

**Solution:**
- Go to `/en` not just `/`
- Root redirects to `/en` automatically

---

## 📞 **NEED HELP?**

If you get stuck:
1. Take a screenshot of the error
2. Tell me what step you're on
3. I'll guide you through it!

---

## 🎯 **AFTER DEPLOYMENT**

Once live, you can:
1. ✅ Share the URL with users
2. ✅ Add custom domain (like `bionxa.com`)
3. ✅ Configure OAuth providers in Supabase
4. ✅ Run SQL schema for full authentication

---

## 🔄 **AUTOMATIC DEPLOYMENTS**

**Good news!** Every time you push to GitHub:
- Vercel will automatically rebuild
- Changes go live in 2-3 minutes
- No manual deployment needed!

---

## 📊 **VERCEL DASHBOARD**

After deployment, you'll have access to:
- 📈 Analytics (visitor stats)
- 🔍 Logs (error tracking)
- ⚙️ Settings (environment variables)
- 🌐 Domains (custom domain setup)

---

**Ready to deploy? Follow the steps above!** 🚀

**Tell me when you've finished or if you need help with any step!**
