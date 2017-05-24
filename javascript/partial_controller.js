
var app = angular.module('kibClient', []);
app.controller('partialController', function($scope) {
    $scope.templates =
        [
            { name: 'profiel', url: 'includes/pages/profiel.html'},
            { name: 'behandelplan', url: 'includes/pages/behandelplan.html'},
            { name: 'responsible-teacher', url: 'includes/pages/responsible_teachers_page.html'},
            { name: 'notFound', url: 'includes/pages/not_found.html'}
        ];

    $scope.template = "";

    // Load a page in the main section
    $scope.loadPage = function(pageName, queryString) {
        for (var i = 0; i < $scope.templates.length; i++) {
            // Find the template with the given page name.
            if ($scope.templates[i].name === pageName) {
                var foundTemplate = $scope.templates[i];

                if(queryString !== undefined && queryString !== null) {
                    // Add the query's to the url.
                    foundTemplate.url += queryString;
                } else {
                    // Add to HTML 5 history stack the loaded page
                    // Only when there are no query params
                    var historyParams = {
                        pageName: foundTemplate.name
                    };

                    window.history.pushState(historyParams, "");
                }

                // Set the template with the founded template.
                $scope.template = foundTemplate;

                // Set the page to load active.
                $('li').removeClass('active');
                var selector = "#" + pageName;
                $(selector).addClass('active');

                return $scope.template;
            }
        }

        // When no template with given name is found, load the not found page.
        $scope.template = $scope.templates[$scope.templates.length - 1];

    };
});

/**
 * Load previous page when back button is clicked.
 * @param e the popped element.
 */
window.onpopstate = function(e){
    if(e.state){
        loadPageFromJS(e.state.pageName);
    }
};

/**
 * Load a dashboard from a javascript file.
 * @param dashboardName the name of the dasboard being displayed.
 */
function loadDashboardFromJS(dashboardName){
    executeOnScope(function ($scope) {
        for (var i = 0; i < $scope.templates.length; i++) {
            // Find the template with correct dashboard.
            if ($scope.templates[i].name === dashboardName) {
                // Set the default dashboard to the given dashboard.
                $scope.templates[0].url = $scope.templates[i].url;
                return $scope.loadPage('dashboard');
            }
        }
    });
}

/**
 * Load a page from a javascript file.
 * @param pageName the name of the page.
 * @param queryString the query string.
 */
function loadPageFromJS (pageName, queryString) {
    executeOnScope(function ($scope) {
        localStorage.params = queryString;
        return $scope.loadPage(pageName, queryString);
    })
}

/**
 * Retrieve the scope of the app to use it in the other JS files.
 * @param cb the callback function.
 */
function executeOnScope(cb) {
    var appElement = document.querySelector('[ng-app=OCClient]');
    var $scope = angular.element(appElement).scope();
    $scope = $scope.$$childHead; // add this and it will work
    $scope.$apply(function() {
        cb($scope)
    });
}

/**
 * Get the query parameters.
 * @returns {{}}
 */
function getQueryParams() {
    var queries = {};

    if (localStorage.params) {
        var url = localStorage.params;

        var src = url.substr(1).split("&");
        if (src.length == 1 && !src[0]) {
            return queries;
        }

        $.each(url.substr(1).split("&"), function (c, q) {
            var i = q.split("=");
            queries[i[0].toString()] = i[1].toString();
        });
    }

    return queries;
}