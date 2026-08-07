"""Placeholder worker — no-op service to satisfy the stack shape."""

import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Worker started (no-op).")


if __name__ == "__main__":
    main()
