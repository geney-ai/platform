from fastapi import Request, Depends
from src.server.handlers.page import PageResponse
from src.server.deps import app_state
from src.state import AppState

# Create page response helper - login uses minimal layout (no header)
page = PageResponse(
    template="pages/app/login.html",
    layout="layouts/minimal.html",
)


async def handler(request: Request, state: AppState = Depends(app_state)):
    """Login page handler

    Simple login page with SSO options

    Args:
        request: The incoming request
        state: Application state with config

    Returns:
        HTMLResponse with full layout or just content for HTMX
    """
    return page.render(request, {"marketing_site_url": state.config.marketing_site_url})
