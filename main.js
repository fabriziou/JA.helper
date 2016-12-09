var JA = (function(){
    var flag = false , handler , tick = 10;
    function process(){

        $.ajax({
            url : '/main/huodong/yearEndSecondKill.action',
            data : {prizeId:"93"},
            dataType:"json",
            method:'post',
            success:function(data){
                //var state = data.message;
                if(data){
                    console.log('['+new Date().toLocaleTimeString()+'] '+data.code+':'+data.message);
                    if( 
                        data.code == 2 || 
                        data.message.indexOf('已抢完') >= 0 ||
                        data.message.indexOf('没有分享') >= 0
                    ) {
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
        tick = t || tick;
        flag = true;
        process();
    }

    function stop(){
        handler && clearTimeout(handler);
        flag = false;
    }

    
    function task(){
        
        var s = new Date( new Date().toLocaleDateString() ).setHours(12);
        var threshold = 60 * 1000;

        start(30 * 1000);

        var h = setInterval(function(){
            var n = Date.now();
            if(s - n < threshold){
                tick = 1;
                clearInterval(h);
            }
        },1000);
    }

    return {
        start : start , 
        task : task,
        stop : stop
    }
}());

JA.task();