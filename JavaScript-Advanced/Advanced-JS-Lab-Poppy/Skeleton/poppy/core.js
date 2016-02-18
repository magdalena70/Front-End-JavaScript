var poppy = poppy || {};

(function(scope){
	var FADE_IN_INTERVAL = 10, FADE_OUT_INTERVAL = 40,
	AUTO_HIDE_OPACITY_COUNT = 0.01, CLOSE_BTN_OPACITY_COUNT = 0.03, FADE_IN_OPACITY_COUNT = 0.02;
		
	function pop(type, title, message, callback) {
		var popup;
		switch (type) {
			// Implement various popup types
			case 'success': popup = new scope._poppy.Success(title, message);
			break;
			case 'info': popup = new scope._poppy.Info(title, message);
			break;
			case 'error': popup = new scope._poppy.Error(title, message);
			break;
			case 'warning': popup = new scope._poppy.Warning(title, message, callback);
			break;
			default: break;
		}
		
		// generate view from view factory
		var view = scope._viewFactory.createPopupView(popup);
		processPopup(view, popup._popupData);
	}

	function processPopup(domView, popupData) {
		// Implement popup logic
		if (popupData.closeButton) {
            domView.getElementsByClassName('poppy-close-button')[0]
                .addEventListener('click', function() {
                    fadeOut(domView, FADE_OUT_INTERVAL, CLOSE_BTN_OPACITY_COUNT);
                });
        }
		
		if (popupData.autoHide) {
            setTimeout(function() {
                fadeOut(domView, FADE_OUT_INTERVAL, AUTO_HIDE_OPACITY_COUNT);
            }, popupData.timeout);
        }
		
		if (popupData.callback) {
			domView.addEventListener('click', function() {
				window.location = popupData.callback;
			});
		}

        domView.style.opacity = 0;
        document.body.appendChild(domView);
        fadeIn(domView, FADE_IN_INTERVAL, FADE_IN_OPACITY_COUNT);
	}
	
	function fadeOut(element, interval, opacityCount) {
        var opacity = 1,
        hideInterval = setInterval(hide, interval);
		
		function hide(){
            if (opacity <= 0) {
                clearInterval(hideInterval);
            } else{				
				opacity -= opacityCount;
				element.style.opacity = opacity;
			}
		}
    }


    function fadeIn(element, interval, opacityCount) {
        var opacity = 0,
        showInterval = setInterval(show, interval);
		
		function show(){
            if (opacity >= 1) {
                clearInterval(showInterval);
            } else{				
				opacity += opacityCount;
				element.style.opacity = opacity;
			}
		}
    }
	
	scope.pop = pop;
}(poppy));