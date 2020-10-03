(function () {
	var getPosts = function ($http) {

		var postsList = function (post, page) {
			$http.get("/posts/getpost?post=" + post + "&page=" + page)
				.then(function (response) {
					return response.data.Data;					
				})

		};  

		return {
			posts:postsList
		};

	};

	var module = angular.module("myapp");
	module.factory("getPosts", getPosts);

}());