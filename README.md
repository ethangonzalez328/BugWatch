### BugWatch

# Steps to run:
1. Download and unzip the code
2. Download and install a recent version of Node.js if you don't have one already
3. Run the following commands in a terminal, with the directory set to the project folder
  - `npm install`
  - `npm install @material-ui/core`
4. In a separate terminal, run 
  - `npm install -g json-server`
  - `json-server --watch data/db.json --port 3001`
5. Run `npm run start` in the previous terminal
