var reminder = angular.module('reminder',[]);
///////////////////////////////////////////////
reminder.directive('ngColorUl',[function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<ul class="cate-list"><div ng-transclude></div></ul>',
        link: function(scope,el) {
            $(el).on('mousedown',false);

            $(el).on('click','li', function () {
                $(el).find('.xuanzhong').removeClass('xuanzhong bianji');
                $(this).addClass('xuanzhong');
            });


            $(el).on('dblclick','li', function() {
                $(this).addClass('bianji');
                var input = $(this).find('input');
                input.val(input.val()).focus();
            });

            $(el).on('blur','li input', function () {
                $(this).removeClass('xuanzhong');
            });

            /***********delete*************/
            $(el).on('keyup',false);
            $(document).on('keyup', function (e) {
                //console.log(1);
                if (e.keyCode === 8) {
                    var id = parseInt($(el).find('.xuanzhong').attr('data-id'));
                    scope.$apply(function () {
                        scope.cates = scope.cates.filter(function (v) {
                            return v.id !== id;
                        })
                    })
                }
            })
        }
    }
}])
/////////////////////////////////
reminder.directive('myOption',[function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: '<div class="xuan"><div ng-transclude></div></div>',
        link: function (scope, el) {
            $('.xuanxiang').on('click', function () {
                $('.xuan').show();
                return false;
            })
            $(el).on('click',false);
            $(el).find('.opCancel').on('click', function () {
                $(el).hide();
            })
            $(el).find('.opDel').on('click', function () {
                $(el).hide();
            })
            $(el).find('.opDone').on('click', function () {
                $(el).hide();
            })
            $(document).on('click', function () {
                $(el).hide();
            })
        }
    }
}])

/////////////////////////////////////////////
reminder.controller('mainCtrl',['$scope',function($scope) {

    $scope.colorss = ['red','blue','green','orange','yellow','purple','brown'];

    $scope.cates = [
        {
            id: 1001,
            theme: 'red',
            title: '新列表1',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1002,
            theme: 'blue',
            title: '新列表2',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1003,
            theme: 'green',
            title: '新列表3',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1004,
            theme: 'orange',
            title: '新列表4',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1005,
            theme: 'yellow',
            title: '新列表5',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1006,
            theme: 'purple',
            title: '新列表6',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        },
        {
            id: 1007,
            theme: 'brown',
            title: '新列表7',
            todos: [
                {id: 1001, title: '阅读', state: 1},
                {id: 1002, title: '运动', state: 0},
            ]
        }
    ];

    $scope.current = $scope.cates[0];
    $scope.setcurrent = function (v) {
        $scope.current = v;
    }

    /*******delitem********/
    $scope.delitem = function(dd){
        var arr = [];
        for(var i = 0;i < $scope.cates.length; i ++){

            if(Number($scope.cates[i].id) !== dd){
                arr.push($scope.cates[i]);
            }
        }
        $scope.cates=arr;
        $scope.current=$scope.cates[0];


    }


    /********delete*********/
    $scope.delete = function (id) {
        $scope.current.todos = $scope.current.todos.filter(function (v,i) {
            return v.id !== id;
        })
    }

    /********addtodo********/
    $scope.addtodo = function (e) {
        if (e.keyCode ===13) {
            var max_id = -Infinity;
            $scope.current.todos.forEach( function (v,i) {
                if ( max_id < v.id ) {
                    max_id = v.id;
                }
            });
            var id = max_id + 1;
            var item = {
                id: id,
                title: $scope.item,
                state: 0
            }
            $scope.current.todos.push(item);
            $scope.item = '';
        }
    }

    /*********add***********/
    $scope.add = function () {
        //console.log(1);
        var colors = ['red','blue','green','orange','yellow','purple','brown'];
        var max_id = -Infinity;
        $scope.cates.forEach( function (v,i) {
            if ( max_id < v.id ) {
                max_id = v.id;
            }
        });
        var id = max_id + 1;
        var item = {
            id: id,
            theme: colors[$scope.cates.length % colors.length],
            title: '新列表' + ($scope.cates.length + 1)
        }
        $scope.cates.push(item);
    }
}])





////////////////////////////////
$(function () {
    //$('.right-bottom').on('click', 'li', function () {
    //    $('.right-bottom').find('.bg').removeClass('bg');
    //    $(this).addClass('bg');
    //})


    ///////////////////////////////
    //$('.yuan').on('click', function () {
    //    $('.yuan').find('.active').removeClass('active');
    //    $(this).find('.circle').addClass('active');
    //    return false;
    //})
    
})
