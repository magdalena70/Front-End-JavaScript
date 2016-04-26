<h1>Issue Tracking System – AngularJS Practical Project</h1>

1.Issue Tracker REST Services:
- Services base URL (in the Windows Azure cloud): http://softuni-issue-tracker.azurewebsites.net
- Services help page (online documentation): http://softuni-issue-tracker.azurewebsites.net/help 

2.Web Design: Bootstrap<br/>
3.SPA Application: AngularJS

4.Project Screens:

Public:
- Public nav-bar
- Login and Register User Screen: Route: '#/'

Authorized users only ( else redirect the user to the Login and Register screen ):
- Normal User nav-bar
- User Dashboard ( includes the user’s assigned issues and all the projects that user has an assigned issue or he is a project's leader): Route: '#/'
- Project's Details Page ( includes project's all issues for admin only and assigned issues for user ): Route: '#/projects/:id'
- Edit Project Page ( project's leader and admin only; project's leader can not change the leader ): Route: '#/projects/:id/edit'
- Add Issue in Current Project Page ( project’s leader and admin only ): Route: '#/projects/:id/add-issue'
- Issue's Details Page (includes issue’s comments ) 
	( assignee and admin can change status;
	if user have an issue assigned in the project or he is the project’s leader he can add comments ): Route: '#/issues/:id'
- Edit Issue Page ( project’s leader and admin only ): Route: '#/issues/:id/edit'
- Change My Password Page: Route: '#/profile/password'
- Logout: Route: '#/logout'

Administrator only:
- Admin nav-bar
- Administrator Dashboard ( same as normal user and includes add new project link ): Route: '#/'
- All Projects Page ( includes project's details link and leader info link ): Route: '#/projects'
- Add Project Page: Route: '#/projects/add'
- Edit Project Page ( only admin can  change the leader ): Route: '#/projects/:id/edit'
- Make Admin Page: Route: '#/admin/makeAdmin'
- All Users Page ( includes user info link ): Route: '#/admin/users/all'
- User Info Page ( includes user's projects and user's issues ): Route: '#/admin/users/:username/info'

