// A dirrective can be an element, attribute, class or comment.
var app = angular.module('app', []);

app.controller('MainController', function($scope) {
  $scope.photo = {
    url: 'photoURL',
    date: "October 3, 2012"
  };
});

app.directive('photo', function() {
  return {
    restrict: 'E',
    template: '<figure><img width="500px"/><figcation/></figure>',
    replace: true,
    // link is what is modifying the HTML. this is the data.
    // scope is the parent scope of the controller
    // instead of link there is also 'compile' this adds the functionality to ALL instances of photo directive
    link: function(scope, element, attrs) {
      // $observe watching attributes for a change.
      attrs.$observe('caption', function(value) {
        element.find('figcaption').text(value);
      });
      attrs.$observe('photoSrc', function(value){
        element.finc('img').attr('src', value);
      });
    }
  };
});
// the above way is not elegant. very jQuery way.

app.directive('photo', function() {
  return {
    // you can do AECM
    restrict: 'E',
    // better to use - templateUrl: 'photo.html'
    template: '<figure><img width="500px" ng-src"{{photoSrc}}"/><figcaption>{{caption}}<figcation/></figure>',
    replace: true,
    // link is what is modifying the HTML. this is the data.
    // when you use the scope this way, you are saying I dont want to inherit
    // the scope from my parent, and i dont want to share scope with any other directives photo.
    scope: {
      // this is the same as $scope.caption
      // this is isolate scope.
      // one way data binding with @. isn't bound to the parent scope. two way with =.
      // with = you won't need {{}} in the index.html around caption and photoSrc
      // &
      caption: '@',
      photoSrc: '@'
    }
  };
});

// using the compile function
app.directive('row', function() {
  return {
    restrict: 'E',
    compile: function(tElement, attrs) {
      var content = angular.element('<div class="row"></div>');
      content.append(tElement.contents());
      tElement.replaceWith(content);
    }
  };
});
app.directive('column', function() {
  return {
    restrict: 'E',
    compile: function(tElement, attrs) {
      var content = angular.element('<div class="col"></div>');
      content.append(tElement.contents());
      tElement.replaceWith(content);
    }
  };
});

//how do directives talk to each other?
app.directive('gunnerySergeant', function() {
  return {
    restrict: 'A',
    controller: function($scope) {
      $scope.soundoff = function() {
        console.log("Gunnery Sgt.");
      };
    },
    require: ["^soldier", "marines", "^?medalOfHonor"],
    //ctrls is the array of the controllers of the above siblings or parent of the directive.
    //? means this directive is optional
    //because the controllers are being passed on, we use this.soundoff for all of the other controllers.
    link: function(scope, element, attrs, ctrls) {
      scope.soundoff();
      angular.forEach(ctrls, function(ctrl) {
        if (!!ctrl) { ctrl.soundoff(); }
      });
    }
  };
});

app.directive('marines', function() {
  return {
    restrict: 'A',
    controller: function() {
      this.soundoff = function() {
        console.log("Marine Corps");
      };
    }
  };
});

// transcule:
app.directive('foo', function() {
  return {
    restrict: 'E',
    transclude: true,
    //translude div will include whatever is between the directive in the index file.
    template: '<div>This is the template content!<div ng-transclude></div></div> '
  };
});
