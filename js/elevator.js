angular.module("elevator", []).
controller("ElevatorCtrl", ["$scope", "$interval", function($scope, $interval) {
    // Object representing the car
    var car = $scope.car = {
        active: function(n) {
            return this.floor == n;
        },
        state: function() {
            var r = this.occupied ? "Occpd " : "Empty ";
            switch (this.dir) {
                case -1:
                    r += "↑↑↑↑";
                    break;
                case 1:
                    r += "↓↓↓↓";
                    break;
                case 0:
                    r += this.open ? "OPEN" : "STOP";
            }
            return r;
        },
        canOpen: function(n) {
            // TODO
            return false;
        },
        stepIn: function() {
            this.occupied = true
        },
        stepOut: function() {
            this.occupied = false
        },
        dir: 0,
        floor: 3,
        open: false,
        occupied: false
    };

    // Object representing the control panel in the car
    $scope.panel = {
        btnClass: function(n) {
            // This can be used to emulate a LED light near or inside the button
            // to give feedback to the user.
            return null;
        },
        press: function(n) {
            if (n == "G") {
                n = 0;
            }
            $scope.car.dir = 0;
            $scope.car.open = false;
            if ($scope.car.floor < n) {
                Go = $interval(function() {
                    var stage = $scope.floors.length - $scope.car.floor;
                    $scope.car.dir = -1;
                    $scope.car.floor++;
                }, 1000, [n - $scope.car.floor]);

            } else {
                Go = $interval(function() {
                    var stage = $scope.floors.length - $scope.car.floor;
                    $scope.car.dir = 1;
                    $scope.car.floor--;
                }, 1000, [$scope.car.floor - n]);
            }
            Go.then(function() {
                $scope.car.dir = 0;
                $scope.car.open = false;
            });
        },
        stop: function() {
            $scope.car.dir = 0;
        }
    };

    // Floors
    var floors = $scope.floors = [];
    for (var i = 10; i > 0; i--) floors.push({
        title: i
    });
    floors.push({
        title: "G"
    });

    // Let's have them know their indices. Zero-indexed, from top to bottom.
    // Also let's initialize them.
    floors.forEach(function(floor, n) {
        floor.n = n;
        floor.open = false;
        floor.light = null;
    });

    $interval(function() {
        // TODO: Move the car if necessary
    }, 1000);
}]);
