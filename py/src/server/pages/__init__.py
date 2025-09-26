from fastapi import APIRouter
from fastapi.responses import HTMLResponse, RedirectResponse
from . import dashboard, login, settings

router = APIRouter()


# Root redirects to dashboard
@router.get("/")
async def root():
    return RedirectResponse(url="/dashboard", status_code=302)


# Main app routes (no more /app prefix)
router.add_api_route(
    "/dashboard", dashboard.handler, methods=["GET"], response_class=HTMLResponse
)
router.add_api_route(
    "/login", login.handler, methods=["GET"], response_class=HTMLResponse
)
router.add_api_route(
    "/settings", settings.handler, methods=["GET"], response_class=HTMLResponse
)
