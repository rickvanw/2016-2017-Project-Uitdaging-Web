var app = angular.module('kibClient', []);
app.controller('partialController', function($scope) {
    $scope.templates =
        [
            { name: 'behandelplan', url: 'includes/pages/behandelplan.html'},
            { name: 'profiel', url: 'includes/pages/profiel.html'},
            { name: 'klachten', url: 'includes/pages/klachten.html'},
            { name: 'evaluatie', url: 'includes/pages/evaluatie.html'},
            { name: 'admin_exercise', url: 'includes/pages/admin_exercise.html'},
            { name: 'admin_add_admin', url: 'includes/pages/admin_add_admin.html'},
            { name: 'notFound', url: 'includes/pages/not_found.html'}
        ];

    $scope.template = $scope.templates[0];

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
        $scope.template = $scope.templates[1];

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
    var $scope = angular.element("#controller_div").scope();
    $scope = $scope.$$childHead; // add this and it will work
    $scope.$apply(function() {
        cb($scope)
    });
}
