# Web-Vite Authentication Integration

This Vite React app integrates with the TypeScript API for authentication.

## Architecture

```
┌─────────────────┐           ┌─────────────────┐
│                 │           │                 │
│   Web-Vite      │  <----->  │    API Server   │
│  (Port 5173)    │   CORS    │   (Port 3001)   │
│                 │           │                 │
└─────────────────┘           └─────────────────┘
        │                             │
        │                             │
        └──────── Cookies ────────────┘
              (HTTP-only JWT)
```

## Setup

1. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env to set VITE_API_URL if needed
   ```

2. **Start Both Services**

   ```bash
   # Terminal 1: Start API with auth
   cd ../api
   ./bin/dev.sh

   # Terminal 2: Start Vite app
   cd ../web-vite
   pnpm dev
   ```

## Authentication Flow

1. **User visits Vite app** → Checks for auth via `/api/v0/auth/whoami`
2. **Not authenticated** → Redirected to `/login` page
3. **Click "Login with Google"** → Redirected to API's `/auth/google/login`
4. **API handles OAuth** → Creates JWT cookie, redirects back to Vite app
5. **Vite app receives cookie** → User is authenticated

## Key Components

### `useAuth` Hook

Provides authentication state and methods:

```typescript
const { user, loading, login, logout } = useAuth();
```

### `ProtectedRoute` Component

Wraps routes that require authentication:

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

### API Client

Handles all API communication with credentials:

```typescript
// Always includes cookies
fetch(url, { credentials: "include" });
```

## Routes

### Public Routes

- `/` - Home page
- `/login` - Login page

### Protected Routes

- `/dashboard` - User dashboard (requires auth)

## Security

- **HTTP-only cookies**: JWT tokens can't be accessed by JavaScript
- **CORS configured**: Only allows requests from Vite dev server
- **Secure in production**: Cookies use `secure` flag when not in dev mode
- **SameSite protection**: Prevents CSRF attacks

## Development Features

- **Mock login**: Available in dev mode without Google credentials
- **Hot reload**: Both API and Vite support hot module replacement
- **Type safety**: Full TypeScript support across both apps

## Environment Variables

| Variable       | Description    | Default                 |
| -------------- | -------------- | ----------------------- |
| `VITE_API_URL` | API server URL | `http://localhost:3001` |

## Troubleshooting

### "Unauthorized" errors

- Ensure API server is running
- Check CORS configuration allows your Vite URL
- Verify cookies are being sent (check DevTools)

### Login redirect loops

- Clear cookies in browser
- Ensure `AUTH_REDIRECT_URI` in API matches actual callback URL

### Can't see user info

- Check `/api/v0/auth/whoami` response
- Verify JWT token is valid
- Ensure `SERVICE_SECRET` matches between sessions
