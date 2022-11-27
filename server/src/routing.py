#!/usr/bin/env python
# Module handling routing of requests from Flask app

import json
from typing import Dict
from flask import current_app as app
from flask import request
from src.modules.users import check_user_credentials, create_user
from src.modules.issues import return_issues, create_issue, change_property

def _check_user() -> str: # /api/login/
    """
    GET
    Checks if a user can login, returns admin level or false
    Body {username, password}
    """
    body = request.json
    username = body['username']
    password = body['password']
    return str(check_user_credentials(username, password))

def _create_user() -> str: 
    """
    POST
    Creates a user
    Body {username, password, admin_level}
    """
    body = request.json
    username = body['username']
    password = body['password']
    admin_level = body['admin_level'] # Either "user" or "admin"
    return str(create_user(username, password, admin_level))

def _create_issue() -> str:
    """
    POST
    Creates an issue
    Body {title, info}
    """
    body = request.json
    title = body['title']
    info = body['info']
    return create_issue(title, info)

def _edit_issue() -> str:
    """
    POST
    Edits an issue
    Body {issue_id, prop, new_val}
    """
    body = request.json
    issue_id = body['issue_id']
    prop = body['prop']
    new_val = body['new_val']
    return change_property(issue_id, prop, new_val)

def _read_issues() -> str:
    """
    GET
    Reads and returns current issues
    """
    return return_issues()

routes: Dict = {
    #"/": [_default_index, 'GET'],
    "/api/user/login": [_check_user, 'GET'],
    "/api/user/create": [_create_user, 'POST'],
    "/api/issue/get": [_read_issues, 'GET'],
    "/api/issue/create": [_create_issue, 'POST'],
    "/api/issue/edit": [_edit_issue, 'POST']
}

def create_routes():
    """
    Create url rules and add to app
    """
    gets_text = "<b>GET METHODS</b>\n"
    posts_test = "<b>POST METHODS</b>\n"

    for name, value in routes.items():
        if value[1] == 'GET':
            gets_text += (name + "\n")
        else:
            posts_test += (name + "\n")

    final_text = gets_text + "\n\n" + posts_test
    for page_name in routes:
        with app.app_context():
            @app.errorhandler(404)
            def _error_endpoint(error):
                return f"{error}\n\n{final_text}"
            app.add_url_rule(page_name, view_func=routes[page_name][0], methods=[routes[page_name][1]])