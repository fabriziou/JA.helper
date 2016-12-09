var JA = (function(){
    var flag = false , handler , tick = 10;
    function process(){

        $.ajax({
            url : '/main/huodong/yearEndSecondKill.action',
            data : {prizeId:"93"},
            dataType:"json",
            method:'post',
            success:function(data){
                if(data){
                    console.log('['+new Date().toLocaleTimeString()+'] '+data.code+':'+data.message);
                    if( data.code == 2 || data.message.indexOf('已抢完') >= 0){
                        stop();
                        alert(data.message);
                        return;
                    }
                }

                if(flag)
                    handler = setTimeout( function(){
                        process();
                    } , tick);
            },
            error:function(){
                if(flag)
                    handler = setTimeout( function(){
                        process();
                    } , tick);
            }

        })
    }

    function start(t){
        handler && clearTimeout(handler);
        tick = t || 1;
        flag = true;
        process();
    }

    function stop(){
        handler && clearTimeout(handler);
        flag = false;
    }

    
    function task(s){
        s = s ? (new Date(s).getTime()) : 1481169600000;
        
        start(30 * 1000);

        var h = setInterval(function(){
            var n = Date.now();
            if(s - n < 60 * 1000){
                tick = 1;
                clearInterval(h);
                //start(t);
            }
        },1000);
    }

    return {
        start : start , 
        task : task,
        stop : stop
    }
}());

JA.task('2016-12-09 12:00:00');