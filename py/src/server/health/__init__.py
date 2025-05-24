from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from src.logger import Logger

from src.server.deps import logger, async_db

router = APIRouter()


@router.get("/healthz")
async def health(
    logger: Logger = Depends(logger),
    db: AsyncSession = Depends(async_db),
):
    try:
        await db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        logger.error(f"unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="health check failed")


# TODO: real readyz
@router.get("/readyz")
async def ready(
    logger: Logger = Depends(logger),
):
    return {"status": "ok"}
