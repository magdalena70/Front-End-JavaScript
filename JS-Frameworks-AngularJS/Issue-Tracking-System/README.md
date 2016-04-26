Issue Tracking System – AngularJS Practical Project

1.Issue Tracker REST Services:
- Services base URL (in the Windows Azure cloud): http://softuni-issue-tracker.azurewebsites.net
- Services help page (online documentation): http://softuni-issue-tracker.azurewebsites.net/help 

2.Web Design: Bootstrap<br/>
3.SPA Application: AngularJS

4.Project Screens:

Public:
- Login and Register User Screen: Route: '#/'

Authorized users only ( else redirect the user to the Login and Register screen ):
- User Dashboard: Route: '#/'
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
- Administrator Dashboard ( includes add new project link ): Route: '#/'
- All Projects Page: Route: '#/projects'
- Add Project Page: Route: '#/projects/add'
- Edit Project Page ( only admin can  change the leader ): Route: '#/projects/:id/edit'
- Make Admin Page: Route: '#/admin/makeAdmin'
- All Users Page: Route: '#/admin/users/all'
- User Info Page ( includes user's projects and user's issues ): Route: '#/admin/users/:username/info'

