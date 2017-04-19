var world = {
    gravity : 9.8,
    freq : 10,
    
    throwUp : function (element, v0, t, callback){
        if(!t){
            t = world.freq/1000; 
        }

        var y = v0*t + (world.gravity*t^2)/2;
        v0 = v0 - world.gravity*y;
        if(v0 > 0){
            element.style.bottom = (parseInt(element.style.bottom) + y) + 'px';
        
            setTimeout(function (){
                world.throwUp(element, v0, t + (world.freq/1000), callback);
            }, world.freq);
        }
        else{
            world.freeFall(element, null, callback);
        }
    },

    freeFall : function (element, t, callback){
        if(!t){
            t = 1; 
        }
        
        var y = -(world.gravity*t^2)/2;
        element.style.bottom = (parseInt(element.style.bottom) + y) + 'px';

        if(parseInt(element.style.bottom) > 168){
            setTimeout(function (){
                world.freeFall(element, t + (world.freq/1000), callback);
            }, world.freq);
        }
        else{
            callback();
        }
     }
}