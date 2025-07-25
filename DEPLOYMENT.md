# Deploying Deliveroo Database to Render

## Prerequisites
- Render account (sign up at https://render.com)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step-by-Step Deployment

### Option 1: Using Render Dashboard (Recommended for beginners)

#### 1. Create PostgreSQL Database
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `deliveroo-db`
   - **Database**: `deliveroo_db`
   - **User**: `deliveroo_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free or Starter
4. Click "Create Database"
5. **Save the connection details** (Internal Database URL and External Database URL)

#### 2. Create Web Service
1. Click "New +" → "Web Service"
2. Connect your Git repository
3. Configure:
   - **Name**: `deliveroo-api`
   - **Region**: Same as database
   - **Branch**: `main` or `master`
   - **Root Directory**: `Backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `./start.sh`

#### 3. Set Environment Variables
In the web service settings, add these environment variables:
- `SQLALCHEMY_DATABASE_URL`: Use the Internal Database URL from step 1
- `JWT_SECURITY_KEY`: Generate a secure random string
- `ALGORITHM`: `HS256`
- `APP_NAME`: `Deliveroo API`

### Option 2: Using render.yaml (Infrastructure as Code)

1. Push the `render.yaml` file to your repository root
2. In Render Dashboard:
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically create both database and web service

## Important Notes

### Database Connection
- Use the **Internal Database URL** for connecting from your web service
- Format: `postgresql://user:password@host:port/database`
- The external URL is for connecting from outside Render

### Environment Variables
- Never commit your production `.env` file to Git
- Set environment variables directly in Render Dashboard
- Generate a new, secure JWT_SECURITY_KEY for production

### Migration and Seeding
- The `build.sh` script will run migrations automatically
- Modify the seed script if you don't want to seed data on every deployment

### Monitoring
- Check logs in Render Dashboard → Your Service → Logs
- Monitor database usage in PostgreSQL service dashboard

## Post-Deployment

1. **Test your API endpoints**:
   - Your API will be available at `https://your-service-name.onrender.com`

2. **Update your frontend**:
   - Update API base URL in your frontend configuration
   - Update CORS settings if needed

3. **Set up custom domain** (optional):
   - In service settings → Custom Domains

## Troubleshooting

### Common Issues:
1. **Build fails**: Check build logs, ensure all dependencies in requirements.txt
2. **Database connection fails**: Verify SQLALCHEMY_DATABASE_URL is correct
3. **Migrations fail**: Check if database schema conflicts exist

### Useful Commands for Local Testing:
```bash
# Test database connection
python -c "import app.database.database; print('Database connection successful')"

# Run migrations locally
alembic upgrade head

# Test the app locally
python main.py
```

## Security Checklist
- [ ] Generated new JWT_SECURITY_KEY for production
- [ ] Database password is secure
- [ ] Environment variables set in Render (not in code)
- [ ] Updated CORS settings for your domain
- [ ] SSL/HTTPS enabled (automatic on Render)

## Cost Optimization
- Free tier available for PostgreSQL (up to 1GB)
- Free tier available for web services (750 hours/month)
- Consider upgrading for production workloads
