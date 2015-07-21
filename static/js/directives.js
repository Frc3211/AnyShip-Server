app.directive('keyPress', ['$document', function($document){
    return {
        restrict: 'A',
        link: function(scope) {
            $document.bind('keydown', function(e){
                switch(e.which){
                    case 38:
                        if(scope.currRecordIndex > 0){
                            scope.$apply(function(){
                                scope.currRecordIndex--;
                            });
                        }
                        break;
                    case 40:
                        if(scope.currRecordIndex < scope.filteredRecords.length - 1){
                            scope.$apply(function(){
                                scope.currRecordIndex++;
                            });
                        }
                        break;
                }
            })
        }
    }
}])
