"""Tests for the worker."""

import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from worker import main


class TestWorker:
    def test_main_runs_without_error(self):
        main()
