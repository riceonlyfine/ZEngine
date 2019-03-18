

var engine : ZE.Engine;

// the main entry point to hte application.
window.onload = function(){
    engine = new ZE.Engine(320, 480);

    let game = new ZE.TestGame();
    engine.start(game, "viewport");
}

window.onresize = function(){
    engine.resize();
}
