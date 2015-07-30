function initGame(key) {
    
    $('#content').load('game.html?v='+Math.random(), function() {
        $('.header').show();
        $('h2.header-title').text("(i)grasz?");
//        $(".back-button").addClass("link").data("link", "main")
        drawInfo('back-canvas');
        $(".back-button").addClass("link").data("link", "instructions")
        
        console.log('game');
        
        $("#game-msg").on('click', function(){
            $(this).toggleClass('hidden');
        });
        
        var game = $('#game');
        
        drawHistory(game.width());
        drawParameters($('#game').width());
        if(interval){
            clearInterval(interval);
        }
        interval = setInterval(function(){ 
            loopAnimationState = (loopAnimationState + 1)%loopAnimationDuration; 
            drawParameters($('#game').width());
            drawCounter();
            if(animationState > 0 && animationState < animationDuration){
                animationState++;
            }
        }, 30);
        
        if(buttons === undefined){
            buttons = {};
            buttons.first = randomDrug();
            buttons.second = randomDrug();
            buttons.third = randomDrug();
            buttons.waiting = randomDrug();
        }
        
        drawButtons(game.width());
        
        $('.button').on('click', function(){
            var btn = $(this).data('button');
            console.log("button clicked: "+btn);
            if(btn != 'waiting' && animationState == animationDuration){
                counter++;
                var drugTaken = buttons[btn];
                changeParamsByDrug(buttons[btn]);
                buttons[btn] = buttons.waiting;
                buttons.waiting = randomDrug();
                drawButtons(game.width());
                addToHistory(game.width(), drugTaken)
                animationState = 1;
            }
        });
        
                
    });
}

function addToHistory(size, drug){
    if(drugHistory.length>8){
        drugHistory.shift();
    }
    drugHistory.push(drug);
    
    drawHistory(size);
}

function drawHistory(size){
    var canvasId = 'game-history';
    var canvas = document.getElementById(canvasId);
    
    var width = $('#'+canvasId).width();
    canvas.width  = width;
    canvas.height = width / 9 * 1.15470053838;
    $('#'+canvasId).height(canvas.height+"px");
    
    var size = canvas.height;
    
    var ctx = canvas.getContext('2d');    
    var counter = 9 - drugHistory.length;
    for(var drug in drugHistory){
        drawHistoryDrug(ctx, size, counter++, drugHistory[drug], 0.1*counter);
    }
}

function changeParamsByDrug(drug){
    for(param in drugs[drug].params){
        var drug_params = drugs[drug].params;
        parameters[param].diff = drug_params[param];
        parameters[param].val += drug_params[param];
    }
}

function randomDrug(){
    var drug = '';
    do{
        var keys = Object.keys(drugs)
        drug = keys[ keys.length * Math.random() << 0];
    }
    while(buttons.first == drug || buttons.second == drug || buttons.third == drug || buttons.waiting == drug);
    return drug;
}

function drawButtons(size) {
    for(button in buttons){
        var drug = buttons[button];
        if(button=='waiting'){
            drawDrugButton('button-'+button, size/4.5, drug, true);
        }else{
            drawDrugButton('button-'+button, size/4.5, drug, false);
        }
//        $('#button-'+button+'-text').text(buttons[button].title);
        $('#button-'+button+'-text').text(drugs[drug].title);
    }
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
}

function drawParameters(size) {
    if(size == null){
        return;
    }
    var canvas = document.getElementById('game-parameters');
    var gap = 0.5;
    var height = 9;
    canvas.width = size;
    canvas.height = size * (Object.keys(parameters).length * height / 100 + (Object.keys(parameters).length - 1) * gap / 100 );
    
    var ctx = canvas.getContext('2d');
    
    ctx.save();
        
    var scale = size/100;
    var offset = 10 * scale * loopAnimationState / loopAnimationDuration;
    var animationProgress = animationState / animationDuration;
    
    var background_color = "#3e1435";
    var bar_color = "#f49b00";
    var upColor = "#d88900";
    var upColorBg = "#f49b00";
    var downColor = "#b20002";
    var downColorBg = "#ff0000";
    var font_color = "#fff";
    
    var patternUp = ctx.createPattern(createPattern(scale, upColor, upColorBg, offset), "repeat");
    var patternDown = ctx.createPattern(createPattern(scale, downColor, downColorBg, offset), "repeat");
        
    var i = 0;
    for (parKey in parameters) {
    
        //background
        drawBar(ctx, i, scale, height, gap, background_color, 0, 100);
        
        if(parameters[parKey].diff > 0){
            drawBar(ctx, i, scale, height, gap, bar_color, 0, parameters[parKey].val - parameters[parKey].diff);
            drawBar(ctx, i, scale, height, gap, patternUp, parameters[parKey].val - parameters[parKey].diff, parameters[parKey].diff * animationProgress);
        }else{
            drawBar(ctx, i, scale, height, gap, bar_color, 0, parameters[parKey].val - parameters[parKey].diff * (1 - animationProgress));
            drawBar(ctx, i, scale, height, gap, patternDown, parameters[parKey].val - parameters[parKey].diff * (1 - animationProgress), - parameters[parKey].diff * animationProgress);
        }
        
        //name
        ctx.beginPath();
        ctx.fillStyle = font_color;
        var fontSize = 4 * scale;
        ctx.font = fontSize + "px OpenSans";
        ctx.textAlign = "right";
        ctx.fillText(parameters[parKey].name, 95 * scale, ( i * ( height + gap) + 6 )  * scale);
        
        ctx.closePath();
        
        i++;
    }

    ctx.restore();
};

function drawBar(ctx, i, scale, height, gap, fillStyle, offset, value){
    ctx.beginPath();
    ctx.rect(offset * scale, i * ( height + gap) * scale, value * scale, height * scale);
    ctx.fillStyle = fillStyle; //bar_color;
    ctx.fill();
    ctx.closePath();
}

function drawCounter(){
    
    var canvasId = 'game-counter';
    var width = $('#'+canvasId).width();
    if(width == null){
        return;
    }
    
    var canvas = document.getElementById(canvasId);
    
    canvas.width  = width;
    canvas.height = $('#'+canvasId).height();
    
    var x = width / 2;
    var y = canvas.height / 2;
    
    var radius = 0.1 * width;
    var color = '#ffffff';
    var PI = 3.14;
    
    var ctx = canvas.getContext('2d');
    ctx.save();
    
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    
    ctx.beginPath();
    
    var text = counter;
    
    if(animationState > 0 && animationState < animationDuration){
        if(animationState < animationDuration / 2){
            var progress = animationState / animationDuration * 2;
            ctx.arc(x, y, radius, PI * 1.5 , PI * 1.5 + 2 * PI * progress, true);
            text = text - 1;
        }else{
            var progress = (animationState - animationDuration / 2) / animationDuration * 2;
            ctx.arc(x, y, radius, PI * 1.5, PI * 1.5 + 2 * PI * progress, false);
        }
    }else{
        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    }
    
    ctx.lineWidth = 3;
    ctx.stroke();
    
    ctx.font = radius * 0.8 + "px OpenSans";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y + 0.25 * radius);
    
    
    
}