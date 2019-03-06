

var engine : ZE.Engine;

// the main entry point to hte application.
window.onload = function(){
    engine = new ZE.Engine();
    engine.start();

}

window.onresize = function(){
    engine.resize();
}
