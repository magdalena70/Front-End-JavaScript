'use strict'

angular.module('videoSistemApp.videos', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/videos', {
			templateUrl: 'app/videos/all-videos.html',
			controller: 'VideosController'
		});
	}])
	.controller('VideosController', ['$scope', function VideosController($scope){
		
		$scope.videos = [
		{
			title: 'Course introduction',
			pictureUrl: 'http://www.nakov.com/wp-content/uploads/2014/05/SoftUni-Logo.png',
			length: '3:32',
			category: 'IT',
			subscribers: 3,
			date: new Date(2014, 12, 15),
			haveSubtitles: false,
			comments: [
				{
					username: 'Pesho Peshev',
					content: 'Congratulations Nakov',
					date: new Date(2014, 12, 15, 12, 30, 0),
					likes: 3,
					websiteUrl: 'http://pesho.com/'
				},
				{
					username: 'Maria Ivanova',
					content: 'Thanks for this video!...I\'m wаiting for the last one.',
					date: new Date(2014, 12, 21, 10, 20, 0),
					likes: 6,
					websiteUrl: 'http://mariaivanova.com'
				}	
			]
		},
		{
		title: 'Web Fundamentals',
		pictureUrl: 'http://image.slidesharecdn.com/slideshowofwebdesigning-150518054618-lva1-app6892/95/web-designiong-courses-in-chandigarh-2-638.jpg?cb=1431928035',
		length: '2:48',
		category: 'Web',
		subscribers: 2,
		date: new Date(2015, 12, 18),
		haveSubtitles: true,
		comments: [
			{
				username: 'Maria Petrova',
				content: 'I love this...;)',
				date: new Date(2015, 12, 18, 17, 28, 0),
				likes: 13,
				websiteUrl: 'http://maria_petrova.com'
			},
			{
				username: 'Ivan Ivanov',
				content: 'Thanks for this video!',
				date: new Date(2015, 12, 19, 10, 20, 0),
				likes: 12,
				websiteUrl: 'http://ivanov.com'
			}
		]
	}];
	
	$scope.videoSortOrder = '-date';
	$scope.commentSortOrder = '-date';
	$scope.counterVideos = $scope.videos.length;
	
	$scope.addVideo = function(videos) {	
		var newVideo = {
            title: videos.newTitle,
            pictureUrl: videos.newPictureUrl,
            length: videos.newLength || '0:00',
            category: videos.newCategory,
            subscribers: 0,
            date: new Date(),
            haveSubtitles: videos.haveSubtitles,
            comments: []
        };
		
		$scope.videos.push(newVideo);
		console.log($scope.videos);
		
		videos.newTitle = null;
        videos.newPictureUrl = null;
        videos.newCategory = null;
		videos.newLength = null;
		videos.haveSubtitles = null;
		$scope.counterVideos += 1;
	}
	
	$scope.addComment = function(video){
		var newComment = {
			username: video.newUsername,
			content: video.newContent,
			date: new Date(),
			likes: 0,
			websiteUrl: video.newWebsiteUrl
		};
		
		video.comments.push(newComment);
		video.newUsername = null;
		video.newContent = null;
		video.newWebsiteUrl = null;
	}
	
	$scope.upLikes = function(comment) {
			comment.likes += 1;
		}

	$scope.downLikes = function(comment) {
		comment.likes -= 1;
	}
	
	$scope.upSubscribers = function(video) {
			video.subscribers += 1;
		}

	$scope.downSubscribers = function(video) {
		if(video.subscribers > 0){
			video.subscribers -= 1;
		}
	}
	}]);