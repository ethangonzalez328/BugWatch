import atexit
from sqlitedict import SqliteDict
from src.modules.objects.issue import Issue
from src.modules.objects.user import User

db  = SqliteDict("data.sqlite", autocommit=True) # Database with autocommit on

def _get_issues() -> list:
    """
    Returns encoded list of issues from database, or if no database creates list
    @return[list]   List of stored issues
    """
    our_issues = db.get('issues') 
    if our_issues is None:
        db['issues'] = []
    else:
        temp_issues = []
        for encoded_issue in our_issues:
            issue = Issue(None)
            issue.update_from_db(encoded_issue)
            temp_issues.append(issue)
        return temp_issues
    return []

def _get_users() -> list:
    """
    Returns encoded list of users from database, or if no database creates list
    @return[list]   List of stored users
    """
    our_users = db.get('users') 
    if our_users is None:
        db['users'] = []
    else:
        our_users = []
        for encoded_user in db['users']:
            user = User()
            user.update_from_db(encoded_user)
            our_users.append(user)
        return our_users
    return []

def _save_issues() -> None:
    """
    Encodes issues into dictionary and updates database
    """
    encoded_issues = []
    for issue in issues:
        encoded_issues.append(issue.obj_to_dict())
    db['issues'] = encoded_issues
    print(f">> SAVED {len(db['issues'])} ISSUES")

def _save_users() -> None:
    """
    Encodes users into dictionary and updates database
    """
    encoded_users = []
    for user in users:
        encoded_users.append(user.obj_to_dict())
    db['users'] = encoded_users
    print(f">> SAVED {len(db['users'])} USERS")


issues = _get_issues()
users = _get_users()
def _setup_module():
    """
    Sets up module
    """
    atexit.register(_save_issues)
    atexit.register(_save_users)
    print(f">> GOT {len(issues)} ISSUES")
    print(f">> GOT {len(users)} USERS")    

_setup_module()