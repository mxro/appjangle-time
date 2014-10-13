// <!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/stream/r/2014/10/13/sr3/n/r/2014/10/13/sr/n/node_ge7 -->
var priv = {};

priv.calculateMinutesPassed = function() {
    var startTime = node.select(t_starttime).get();
    if (startTime === null) {
        return 0;
    }
    
    return (new Date().getTime() - startTime.getTime()) / (1000 * 60);
};

priv.initForm = function(cb) {
    Appjangle.require(lib_textinputlink, function(ex, TextInputLink) {
        var tl = TextInputLink.create();
        tl.setElement($(".activityIn", elem));
        tl.setNode(node.select(t_activity));
        tl.init(function(ex) { 
            container.onClose(function(cb) {
                tl.shutdown(cb); 
            });
        });
    });
    
    $(".finalizeBtn", elem).click(function() {
        $("mainBtn", elem).attr('disabled', 'disabled');
        node.select(t_finalized).setValue(true);
        
        node.select(t_endtime).setValue(new Date());
        
        node.select(t_minutespassed).setValue(priv.calculateMinutesPassed());
        
        session.commit().get(function() {
            priv.updateForm(function(ex) {});
        });
        
    });
    
    $(".discardBtn", elem).click(function() {
        
    });
    
    priv.updateForm(cb);
    
};

priv.updateForm = function(cb) {
    node.select(t_starttime).get(function(startTime) {
        $(".startTimeIn", elem).val(startTime.value().toString()); 
    });
    
    
    node.select(t_finalized).get(function(isFinalized) {
        if (!isFinalized.value()) {
            $(".finalizedGroup", elem).hide();
            
            $(".minutesIn", elem).val(priv.calculateMinutesPassed());
            
            return;  
        } 
        $("mainBtn", elem).attr('disabled', 'disabled');
        $(".finalizedGroup", elem).show();
        
        node.select(t_endtime).get(function(endTime) {
            $(".endTimeIn", elem).val(endTime.value()); 
        });
    });
    
    
};

priv.initForm(function(ex) {
    var autoUpdate = timer.setInterval(function() {
        priv.updateForm(function(ex) {});
    }, 1000); 
});
// <!-- one.end -->
