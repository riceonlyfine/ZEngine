

var engine : ZE.Engine;

// the main entry point to hte application.
window.onload = function(){
    engine = new ZE.Engine(320, 480);
    engine.start("viewport");
}

window.onresize = function(){
    engine.resize();
}
