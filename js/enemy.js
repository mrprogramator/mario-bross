var Enemy = function (figure) {
    this.figure = figure;

    this.figure.style['background-image'] = "url('img/mario-enemies.png')";

    this.figure.style['background-position'] = '-34px -228px';

    this.goForward();
}

Enemy.prototype = {
    goForward : function() {
        var scope = this;

        if(scope.figure.style['background-position'] == '-34px -228px'){
            scope.figure.style['background-position'] = '0px -228px';
        }
        else{
            scope.figure.style['background-position'] = '-34px -228px';
        }

        var currentPosition = parseInt(scope.figure.style.left);

        if(currentPosition < window.innerWidth - 200){
            scope.figure.style.left = (currentPosition + 20) + 'px';

            setTimeout(function (){
                scope.goForward();
            }, 100);
        }
        else{
            scope.goBack();
        }
    },

    goBack : function() {
        var scope = this;

        if(scope.figure.style['background-position'] == '-34px -188px'){
            scope.figure.style['background-position'] = '0px -188px';
        }
        else{
            scope.figure.style['background-position'] = '-34px -188px';
        }

        var currentPosition = parseInt(scope.figure.style.left);

        if(currentPosition > 200){
            scope.figure.style.left = (currentPosition - 20) + 'px';

            setTimeout(function (){
                scope.goBack();
            }, 100);
        }
        else{
            scope.goForward();
        }
    }
}