from enum import IntEnum
from sqlitedict import SqliteDict
db = SqliteDict("users.sqlite")

class AdminLevel(IntEnum):
    USER = 1
    ADMIN = 2

class User(object):
    def check_user(self, username, password):
        if self.username != username:
            return False
        if self.password != password:
            return False
        return True

    def __init__(self) -> None:
        self.level: AdminLevel = None
        self.username: str = None
        self.password: str = None

users = []

levels = {
    "admin": 2,
    "user": 1
}

def _check_user_credentials(username: str, password: str) -> bool:
    for user in users:
        if user.check_user(username, password) is True:
            return True
    return False


def _create_user(username: str, password: str, level: str) -> bool:
    if not levels.get(level):
        return False

    new_user = User()
    new_user.level = levels.get(level)
    new_user.username = username
    new_user.password = password

    users.append(new_user)
    return True

def _setup_users() -> None:
    _create_user("test_admin", "test_password", "admin")
    _create_user("test_user", "test_password", "user")


def login_user(username: str, password: str) -> bool:
    return _check_user_credentials(username, password)

_setup_users()
print(users)