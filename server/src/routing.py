#!/usr/bin/env python
# Module handling routing of requests from Flask app

from typing import Dict
from flask import current_app as app
from src.modules.users import login_user
from src.modules.issues import return_issues

def _default_index() -> str:
    """
    Default index
    """
    return "Hi"

def _check_user(username: str, password: str) -> bool:
    return login_user(username, password)

def _read_issues() -> list:
    return return_issues()

routes: Dict = {
    "/": _default_index,
    "/api/login/<username>/<password>": _check_user,
    "/api/get/issues": _read_issues
}

def create_routes():
    """
    Create url rules and add to app
    """
    for page_name in routes:
        with app.app_context():
            app.add_url_rule(page_name, view_func=routes[page_name])