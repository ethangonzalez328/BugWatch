import time
from sqlitedict import SqliteDict
db = SqliteDict("issues.sqlite")

class Issue(object):
    def issue_obj(self) -> list:
        return {
            "title": self.title,
            "info": self.info,
            "timestamp": self.timestamp,
            "tags": self.tags,
            "priority": self.priority,
            "archived": self.archived,
            "id": self.id
        }

    def __init__(self) -> None:
        self.timestamp = time.time()
        self.id = len(issues)
        self.title = None
        self.info = None
        self.priority = None
        self.tags = []
        self.archived = False
        issues.append(self)

issues = []

def _return_issue_from_id(id: str) -> Issue:
    for issue in issues:
        if issue.id == id:
            return issue
    return None

def change_property(issue_id: str, prop: str, new_val: str):
    issue = _return_issue_from_id(issue_id)
    if prop == "title":
        issue.title = new_val
    elif prop == "info":
        issue.info = new_val
    elif prop == "archive":
        issue.archived = bool(new_val)
    elif prop == "priority":
        issue.priority = int(new_val)

def add_tag(issue_id: str, tag: str) -> bool:
    issue = _return_issue_from_id(issue_id)
    issue.tags.append(tag)

def remove_tag(issue_id: str, tag: str) -> bool:
    issue = _return_issue_from_id(issue_id)
    issue.tags.remove(tag)

def create_issue(title: str, info: str) -> str:
    issue = Issue()
    issue.title = title
    issue.info = info
    issues.priority = 3
    return issue.id

def return_issues() -> list:
    active_issues = []
    archived_issues = []
    for issue in issues:
        if issue.archived is False:
            active_issues.append(issue.issue_obj())
        else:
            archived_issues.append(issue.issue_obj())
    
    return{
        "active": active_issues, 
        "archived": archived_issues
    }

create_issue("wooo", "weee")
print(return_issues())