require.config({
	baseUrl: 'scripts',
	paths: {
		factory: 'factory',
		container: 'container',
		section: 'section',
		item: 'item',
		errorMessage: 'errorMessage'
	}
});

// factory.js file to be loaded
require(['factory'], function(){});