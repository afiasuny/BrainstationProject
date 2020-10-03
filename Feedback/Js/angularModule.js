var myApp = angular.module('myApp', ['ngFileUpload', 'ngSanitize', 'ui.select', 'summernote'], ['ngRoute']);

myApp.run(function ($rootScope, $http, $sce) {

    $rootScope.libraryUrl = "http://localhost:81/";

    $rootScope.loading = false;

    $rootScope.globalCurrentSessionObject = Object.create(null);

    $rootScope.studentBasicInformation = Object.create(null);

    $rootScope.years = [];

    $rootScope.globalSuccessMessage = "";
    $rootScope.globalSuccessMessageHtml = "";
    $rootScope.globalErrorMessage = "";
    $rootScope.globalErrorMessageHtml = "";

    $rootScope.dismissGlobalError = function () {

        $("#globalerrormessageDiv").fadeOut("slow", function () {
            $("#globalerrormessageDiv p").html("");
            $("#globalerrormessageDiv").css("display", "none");
        });


    }

    $rootScope.dismissGlobalSuccess = function () {

        $("#globalsuccessmessageDiv").fadeOut("slow", function () {
            $("#globalsuccessmessageDiv p").html("");
            $("#globalsuccessmessageDiv").css("display", "none");
        });
    }

    $("#globalsuccessmessageDiv").css("display", "none");
    $("#globalerrormessageDiv").css("display", "none");

    $rootScope.displayGlobalSuccess = function (msg) {
        $("#globalsuccessmessageDiv").css("visibility", "none");
        $("#globalsuccessmessageDiv").css("display", "block");
        $("#globalsuccessmessageDiv p").html(msg);

        $("#globalsuccessmessageDiv").fadeIn("slow");

        setTimeout(function () {
            $rootScope.dismissGlobalSuccess();
        }, 5000);

    }


    $rootScope.displayGlobalError = function (msg) {
        $("#globalerrormessageDiv").css("visibility", "none");
        $("#globalerrormessageDiv").css("display", "block");
        $("#globalerrormessageDiv p").html(msg);
        $("#globalerrormessageDiv").fadeIn("slow");

        setTimeout(function () {
            $rootScope.dismissGlobalError();
        }, 10000);
    }

});

myApp.directive('trimfrontbackspaces', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var trimfrontbackspaces = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var newVal = inputValue.replace(/^\s+|\s+$/g, '');
                if (newVal !== inputValue) {
                    modelCtrl.$setViewValue(newVal);
                    modelCtrl.$render();
                }
                return newVal;
            }
            modelCtrl.$parsers.push(trimfrontbackspaces);
            trimfrontbackspaces(scope[attrs.ngModel]);
        }
    };
});

myApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

myApp.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});

myApp.directive("angulardatepicker", function () {

    function link(scope, element, attrs, controller) {

        // CALLING THE "datepicker()" METHOD USING THE "element" OBJECT
        element.datepicker({
            onSelect: function (val) {
                scope.$apply(function () {

                    // UPDATING THE VIEW VALUE WITH THE SELECTED DATE
                    controller.$setViewValue(val);
                });
            },
            dateFormat: "dd/mm/yy"
        });
    }

    return {
        require: 'ngModel',
        link: link
    };
});

myApp.directive('sortable', function ($timeout) {   
    return function (scope, element, attributes) {
        element.sortable({
            stop: function (event, ui) {
                scope.$apply(function () {
                    scope.syncOrder(element.sortable('toArray'));
                });
            }
        });
    };
});

//myApp.directive('angulardatepickerSSS', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModel) {
//            element.datepicker({
//                dateFormat: 'dd/mm/yy',
//                changeMonth: true,
//                changeYear: true,
//                onSelect: function (date) {
//                    scope.$apply(function () {
//                        ngModel.$setViewValue(date);
//                    });
//                },
//                showButtonPanel: true,
//                closeText: 'Clear',
//                onClose: function (dateText, obj) {
//                    if (jQuery(window.event.srcElement).hasClass('ui-datepicker-close')) {
//                        element.val('');
//                        scope.$apply(function () {
//                            ngModel.$setViewValue('');
//                        });
//                    }
//                }/*,
//                onChangeMonthYear: function (year, month, inst) {
//                    var currentDate = element.datepicker("getDate");
//                    if (currentDate != null && currentDate != undefined) {
//                        element.datepicker("setDate", new Date(year, month - 1, currentDate.getDate()));
//                        scope.$apply(function () {
//                            ngModelCtrl.$setViewValue(convertDateTimeToDatePickerFormatDDMMYYYY(currentDate));
//                        });
//                    }
//                }*/
//            });

//            ngModel.$render = function () {
//                element.datepicker('setDate', ngModel.$viewValue);
//            };
//        }
//    };
//});


myApp.directive('angulardatepickerwithyear', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '-75y:+32y',
                onSelect: function (date) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(date);
                    });
                },
                showButtonPanel: true,
                closeText: 'Clear',
                onClose: function (dateText, obj) {
                    if (jQuery(window.event.srcElement).hasClass('ui-datepicker-close')) {
                        element.val('');
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue('');
                        });
                    }
                }/*,
                onChangeMonthYear: function (year, month, inst) {
                    var currentDate = element.datepicker("getDate");
                    if (currentDate != null && currentDate != undefined) {
                        element.datepicker("setDate", new Date(year, month - 1, currentDate.getDate()));
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(convertDateTimeToDatePickerFormatDDMMYYYY(currentDate));
                        });
                    }
                }*/
            });

            ngModelCtrl.$render = function () {
                element.datepicker('setDate', ngModelCtrl.$viewValue);
            };
        }
    };
});

myApp.directive('angulardatepickeralt', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                changeMonth: true,
                changeYear: true,
                yearRange: '-10:+1',
                onSelect: function (date) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(date);
                    });
                },
                showButtonPanel: true,
                closeText: 'Clear',
                onClose: function (dateText, obj) {
                    if (jQuery(window.event.srcElement).hasClass('ui-datepicker-close')) {
                        element.val('');
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue('');
                        });
                    }
                }/*,
                onChangeMonthYear: function (year, month, inst) {
                    var currentDate = element.datepicker("getDate");
                    if (currentDate != null && currentDate != undefined) {
                        element.datepicker("setDate", new Date(year, month - 1, currentDate.getDate()));
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(convertDateTimeToDatePickerFormatDDMMYYYY(currentDate));
                        });
                    }
                }*/
            });

            ngModelCtrl.$render = function () {
                element.datepicker('setDate', ngModelCtrl.$viewValue);
            };
        }
    };
});

myApp.directive('bindHtmlCompile', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                return scope.$eval(attrs.bindHtmlCompile);
            }, function (value) {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
    };
}]);

myApp.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

myApp.directive("compileHtml", function ($parse, $sce, $compile) {
    return {
        restrict: "A",
        link: function (scope, element, attributes) {

            var expression = $sce.parseAsHtml(attributes.compileHtml);

            var getResult = function () {
                return expression(scope);
            };

            scope.$watch(getResult, function (newValue) {
                var linker = $compile(newValue);
                element.append(linker(scope));
            });
        }
    }
});

myApp.directive("starRating", function () {
    return {
        restrict: "A",
        template: "<ul class='rating'>" +
            "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
            "    <i class='fa fa-star'></i>" + //&#9EF9EB
            "  </li>" +
            "</ul>",
        scope: {
            ratingValue: "=",
            max: "=",
            onRatingSelected: "&"
        },
        link: function (scope, elem, attrs) {
            var updateStars = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            };
            scope.toggle = function (index) {
                scope.ratingValue = index + 1;
                scope.onRatingSelected({
                    rating: index + 1
                });
            };
            scope.$watch("ratingValue", function (oldVal, newVal) {
                if (newVal) { updateStars(); }
            });
        }
    };
});

myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl, entityId, entityType, fieldLabel, groupName) {

        var fd = new FormData();
        fd.append('file', file);
        fd.append('entityId', entityId);
        fd.append('entityType', entityType);
        fd.append('fieldLabel', fieldLabel);
        fd.append('groupName', groupName);

        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            return response;
        });

        //return $http.post(uploadUrl, fd, {
        //    transformRequest: angular.identity,
        //    headers: { 'Content-Type': undefined }
        //}).success(function () {
        //    return "success";
        //})
        //    .error(function () {
        //        return "error";
        //    });
    }
    this.uploadMultipleFilesToUrl = function (files, uploadUrl, entityId, entityType, fieldLabel, groupName) {
        var fd = new FormData();

        for (var y = 0; y < files.length; y++) {
            fd.append('file' + (y + 1), files[y]);
        }

        //fd.append('file', file);
        fd.append('entityId', entityId);
        fd.append('entityType', entityType);
        fd.append('fieldLabel', fieldLabel);
        fd.append('groupName', groupName);

        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function () {
            return "success";
        }).error(function () {
            return "error";
        });
    }
}]);

myApp.directive('convertToNumber', function () {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return val ? parseInt(val, 10) : null;
            });
            ngModel.$formatters.push(function (val) {
                return val ? '' + val : null;
            });
        }
    };
});

myApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});