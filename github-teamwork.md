# Team Taiwan

## IMPORTANT: TEAM COLLABORATION
- Add **comments** so that others can read your code more easily

- Be sure to **commit your change** every now and then so that others can track changes/debug more easily

    **How to commit your change**

    * Add the file(s) you have modified to the staging area using:

      `$ git add .`
      `$ git add <filename>`

    * Commit and write what changes you have made in the commit message using:

      `$ git commit -m "<TASK>"`

      Message should be concise but clear enough for others to understand, "Add css code to style the buttons" for example.

- **Make a new branch to work on each of your tasks**, and then push it to GitHub and create a **pull request** once you have it done. The purpose of using branches is to avoid messing up with the master branch.

    **How to use branch to collaborate**

    * Update your master branch using:

      `$ git pull origin master`

    * Create a new branch using:

      `$ git branch <TASK NAME>`

      Again, name your branch something that is understandable, `$ git branch anndo-homepage-responsiveness` for example.

    * Switch to the branch you just created using:

      `$ git checkout <BRANCH NAME>`


    * After you complete the task, switch to your master branch using:

      `$ git checkout master`

    * Push your branch using:

      `$ git push origin <BRANCH NAME>`


    * Go to GitHub and create a pull request. Wait for the tech lead to review and merge the branch to master.
