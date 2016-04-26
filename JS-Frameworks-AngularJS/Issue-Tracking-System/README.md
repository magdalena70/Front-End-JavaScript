<h1>Issue Tracking System</h1>
<p>AngularJS Practical Project</p>

<h2>1.Issue Tracker REST Services:</h2>
- Services base URL (in the Windows Azure cloud): http://softuni-issue-tracker.azurewebsites.net
- Services help page (online documentation): http://softuni-issue-tracker.azurewebsites.net/help 

<h2>2.Web Design: Bootstrap</h2>
<h2>3.SPA Application: AngularJS</h2>

<h2>4.Project Screens:</h2>

<h3>Public:</h3>
- Public nav-bar
- Login and Register User Screen: Route: <strong>'#/'</strong>

<h3>Authorized users only ( else redirect the user to the Login and Register screen ):</h3>
- Normal User nav-bar
- User Dashboard ( includes the user’s assigned issues and all the projects that user has an assigned issue or he is a project's leader): Route: <strong>'#/'</strong>
- Project's Details Page ( includes project's all issues for admin only and assigned issues for user ): Route: <strong>'#/projects/:id'</strong>
- Edit Project Page ( project's leader and admin only; project's leader can not change the leader ): Route: <strong>'#/projects/:id/edit'</strong>
- Add Issue in Current Project Page ( project’s leader and admin only ): Route: <strong>'#/projects/:id/add-issue'</strong>
- Issue's Details Page (includes issue’s comments ) 
	( assignee and admin can change status;
	if user have an issue assigned in the project or he is the project’s leader he can add comments ): Route: <strong>'#/issues/:id'</strong>
- Edit Issue Page ( project’s leader and admin only ): Route: <strong>'#/issues/:id/edit'</strong>
- Change My Password Page: Route: <strong>'#/profile/password'</strong>
- Logout: Route: <strong>'#/logout'</strong>

<h3>Administrator only:</h3>
- Admin nav-bar
- Administrator Dashboard ( same as normal user and includes add new project link ): Route: <strong>'#/'</strong>
- All Projects Page ( includes project's details link and leader info link ): Route: <strong>'#/projects'</strong>
- Add Project Page: Route: <strong>'#/projects/add'</strong>
- Edit Project Page ( only admin can  change the leader ): Route: <strong>'#/projects/:id/edit'</strong>
- Make Admin Page: Route: <strong>'#/admin/makeAdmin'</strong>
- All Users Page ( includes user info link ): Route: <strong>'#/admin/users/all'</strong>
- User Info Page ( includes user's projects and user's issues ): Route: <strong>'#/admin/users/:username/info'</strong>

