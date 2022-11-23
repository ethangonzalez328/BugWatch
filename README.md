### BugWatch

# Steps to run:
1. Download and unzip the code
2. Download and install a recent version of Node.js if you don't have one already
3. Open 3 terminals, with the directory set to the project folder for each
4. Run the following commands in any terminal
  - `npm install`
  - `npm install @material-ui/core`
  - `npm install -g json-server`
5. In terminal 1, run `json-server --watch data/notes.json --port 3001`
6. In terminal 2, run `json-server --watch data/users.json --port 3002`
7. In terminal 3, run `npm run start`