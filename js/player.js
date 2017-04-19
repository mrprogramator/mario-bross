var Player = function (figure, imgURL, viewOrientation, forwardKeyCode, backKeyCode, jumpKeyCode, downKeyCode){
    this.figure = figure;

    this.figure.style['background-image'] = "url('" + imgURL + "')";
    
    this.view = viewOrientation;
    
    this.restore();

    this.setControls(this, forwardKeyCode, backKeyCode, jumpKeyCode, downKeyCode);
}

Player.prototype = {
    VIEWS : {
        FORWARD : 0,
        BACKWARD : 1
    },

    setControls : function (instance, forwardKeyCode, backKeyCode, jumpKeyCode, downKeyCode){
        window.addEventListener('keydown',function (evt){
            switch(evt.keyCode)
            {
                case forwardKeyCode:
                    instance.goForward();
                    break;

                case backKeyCode:
                    instance.goBack();
                    break;

                case jumpKeyCode:
                    instance.jump();
                    break;

                case downKeyCode:
                    instance.goDown();
                    break;
                
                default:
                    console.log(evt.keyCode);
            }
        }, false)

        window.addEventListener('keyup',function (evt){
            switch(evt.keyCode)
            {
                case downKeyCode:
                    instance.restore();
                    break;
            }
        }, false)
    },

    goForward : function (){
        var scope = this;
        var currentPosition = parseInt(scope.figure.style.left);

        if(currentPosition < window.innerWidth - 90){
            scope.figure.style.left = (currentPosition + 20) + 'px';
        }

        scope.figure.style['background-position'] = "0px 0px";

        scope.view = scope.VIEWS.FORWARD;

        setTimeout(function () {
            scope.restore();
        }, 100);
    },

    goBack : function () {
        var scope = this;
        var currentPosition = parseInt(scope.figure.style.left);

        if(currentPosition > -37){
            scope.figure.style.left = (currentPosition - 20) + 'px';
        }
        
        scope.view = scope.VIEWS.BACKWARD;

        scope.figure.style['background-position'] = "-81px -81px";
        
        setTimeout(function () {
            scope.restore();
        }, 100);
    },

    jumping : false,

    jump : function () {
        var scope = this;
        
        if(scope.jumping) return;

        var currentPosition = parseInt(scope.figure.style.bottom);
        scope.jumping = true;

        world.throwUp(scope.figure, 2000, null, function (){
            scope.restore();
            scope.jumping = false;
        });

        var currentBackgroundPosition = scope.figure.style['background-position'];

        if(scope.view == scope.VIEWS.FORWARD){
           scope.figure.style['background-position'] = '-561px -83px';
        }
        else{
           scope.figure.style['background-position'] = '-481px -83px';
        }
    },

    goDown : function () {
        var scope = this;
        
        if(scope.view == scope.VIEWS.FORWARD){
           scope.figure.style['background-position'] = '-161px 0px';
        }
        else{
           scope.figure.style['background-position'] = '-241px 0px';
        }
    },

    restore : function () {
        var scope = this;

         if(scope.view == scope.VIEWS.FORWARD){
           scope.figure.style['background-position'] = '-81px 0px';
        }
        else{
           scope.figure.style['background-position'] = '0px -81px';
        }
    }
}