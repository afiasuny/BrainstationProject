myApp.controller("PostController", function ($scope, $http, $sce, $rootScope, $window) {

    $scope.posts = function () {
        var post = angular.element('#post').val();
        var page = angular.element('#page').val();
        $http.get("/posts/getpost?post=" + post + "&page=" + page)
            .then(function (response) {
                $scope.data = response.data.Data;
                $scope.PageIndex = response.data.PageIndex;
                $scope.HasPreviousPage = response.data.HasPreviousPage ? "" : "disabled";
                $scope.HasNextPage = response.data.HasNextPage ? "" : "disabled";
                angular.forEach($scope.data, function (item, key) {
                    if (item.IsPost) {
                        item.class = 'post';
                    }
                    else {
                        item.class = 'comment';
                    }
                })
            })
    }
    $scope.posts();

    $scope.search = function () {
        var post = angular.element('#post').val();
        var page = 1;
        $http.get("/posts/getpost?post=" + post + "&page=" + page)
            .then(function (response) {
                $scope.data = response.data.Data;
                $scope.PageIndex = response.data.PageIndex;
                $scope.HasPreviousPage = response.data.HasPreviousPage ? "" : "disabled";
                $scope.HasNextPage = response.data.HasNextPage ? "" : "disabled";
                angular.forEach($scope.data, function (item, key) {
                    if (item.IsPost) {
                        item.class = 'post';
                    }
                    else {
                        item.class = 'comment';
                    }
                })
            })
    };

    $scope.getData() = function (next) {
        if (next > 0) {
            $scope.PageIndex = $scope.PageIndex + 1;
        } else {
            $scope.PageIndex = -1;
        }
        var post = '';
        var page = $scope.PageIndex;
        $http.get("/posts/getpost?post=" + post + "&page=" + page)
            .then(function (response) {
                $scope.data = response.data.Data;
                $scope.PageIndex = response.data.PageIndex;
                $scope.HasPreviousPage = response.data.HasPreviousPage ? "" : "disabled";
                $scope.HasNextPage = response.data.HasNextPage ? "" : "disabled";
                angular.forEach($scope.data, function (item, key) {
                    if (item.IsPost) {
                        item.class = 'post';
                    }
                    else {
                        item.class = 'comment';
                    }
                })
            })
    };
})

