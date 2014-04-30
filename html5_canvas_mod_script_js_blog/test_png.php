<html lang="en">
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    <script type="text/javascript" src="jsmanipulate.min.js"></script>
    <script type="text/javascript" src="base64.js"></script>
    <script type="text/javascript" src="canvas2image.js"></script>
    
    <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>JSManipulate</title>
    
</head>
<body>
    <div id="wrapper">
        <canvas id="cnv" width="200" height="200"></canvas>
        <br /><br />
        <div id="tb"><button onclick="testing()">Test</button></div>
    </div>
    
    <script>
    
    // setup
    var canvas = document.getElementById('cnv');
    
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        // simple drawing on canvas
        context.beginPath();
        context.moveTo(75,25);
        context.quadraticCurveTo(25,25,25,62.5);
        context.quadraticCurveTo(25,100,50,100);
        context.quadraticCurveTo(50,120,30,125);
        context.quadraticCurveTo(60,120,65,100);
        context.quadraticCurveTo(125,100,125,62.5);
        context.quadraticCurveTo(125,25,75,25);
        context.stroke();
    } else {
        alert('Error in canvas context loading. Which browser do you have?');
    }
    
    // handler
    function testing() {
        
        // save data as png "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACt..."
        var strDataPng = canvas.toDataURL();
        // alert(strDataPng);
        
        var my_url = "processor_png.php";
        
        $.ajax({
            type: "POST",
            url: my_url,
            data: { filecode: strDataPng }
        }).done(function(msg) {
            alert("PNG file saved!");
        });
        
        // prompt the user to save the image as PNG
        // Canvas2Image.saveAsPNG(canvas);
        // -> then we can simply change extension of this file from .part to .png
    }
    
    // of course we can put this code into src of the img tag, as I did below
</script>

<br /><br />
Demo from code:<br />
<img src="data:image/png;base64,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" />

</body>
</html>
