# 🧠 BrilliantMinds - Deployment Guide

A modern AI-powered chat application to converse with history's greatest minds.

## 🚀 Deploy to Vercel (Recommended)

### **Method 1: GitHub + Vercel (Automatic deployments)**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/brilliant-minds.git
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/in with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `GEMINI_API_KEY`: Your Google Gemini API key
   - Click "Deploy"

### **Method 2: Vercel CLI (Direct deployment)**

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Add environment variables:**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

4. **Redeploy with env vars:**
   ```bash
   vercel --prod
   ```

## 🌐 Alternative Free Deployment Options

### **Netlify**
1. Build the static site: `npm run build && npm run export`
2. Drag the `out` folder to [netlify.com/drop](https://netlify.com/drop)
3. Add environment variables in Netlify dashboard

### **Railway**
1. Connect your GitHub repo at [railway.app](https://railway.app)
2. Add `GEMINI_API_KEY` in environment variables
3. Deploy automatically

## 🔑 Environment Variables

You need to set up these environment variables:

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `GEMINI_API_KEY` | Google Gemini API key | [Google AI Studio](https://makersuite.google.com/app/apikey) |

## 📋 Pre-deployment Checklist

- [ ] Get your Gemini API key from Google AI Studio
- [ ] Test the app locally: `npm run dev`
- [ ] Build successfully: `npm run build`
- [ ] All images are in `/public/images/`
- [ ] Environment variables configured

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# Start development server
npm run dev
```

## 🎯 Production URLs

Once deployed, your app will be available at:
- **Vercel**: `https://your-app-name.vercel.app`
- **Netlify**: `https://your-app-name.netlify.app`
- **Railway**: `https://your-app-name.up.railway.app`

## 📱 Features

- ✅ Modern, responsive design
- ✅ Real-time AI conversations
- ✅ Historical figure personalities
- ✅ Mobile-optimized interface
- ✅ Professional UI/UX design

## 🤖 Available Minds

- **Albert Einstein** - Theoretical Physicist
- **Carl Sagan** - Astronomer & Science Communicator  
- **Alan Turing** - Computer Scientist
- **Steve Jobs** - Visionary Entrepreneur

---

Built with ❤️ using Next.js, Tailwind CSS, and Google Gemini AI 