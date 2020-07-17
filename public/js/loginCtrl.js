function validateEmail(sEmail) {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
  
    if(!sEmail.match(reEmail)) {
     
      return false;
    }
  
    return true;
  
  }
loginApp.controller('loginCtrl',['$scope','$http',($scope,$http) => {

    $scope.login= () =>
    {
        if($scope.email==="" || $scope.password===""){//check login fields before sending to server
            $scope.errorMessage = 'Please fill all required fields';
        }else if(validateEmail($scope.email) === false){
            $scope.errorMessage = 'Please check the email';
        }else{
        $http.post('/api/login', {email:$scope.email , password:$scope.password}).then(r => {
            $scope.user = r.data;
        }, e => {
            $scope.errorMessage = e.data.message;
        });
    }
    }
}]);
