// <!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/stream/r/2014/10/13/sr3/n/r/2014/10/13/sr/n/node_ge7 -->
var priv = {};


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
        
    });
    
    $(".discardBtn", elem).click(function() {
        
    });
    
    cb();
    
};

priv.updateForm = function(cb) {
    node.select(t_starttime).get(function(startTime) {
        $(".startTimeIn", elem).val(startTime.value().toString()); 
    });
    
    
    node.select(t_finalized).get(function(isFinalized) {
        if (!isFinalized.value()) {
            $(".finalizedGroup", elem).hide();
            
            return;  
        } 
        $(".finalizedGroup", elem).show();
        
        node.select(t_endtime).get(function(endTime) {
            $(".endTimeIn", elem).val(endTime.value()); 
        });
    });
    
    
};








node.append(t_measurement);

node.append(new Date()).append(t_starttime);

node.append(0).append(t_minutespassed);

node.append("").append(t_activity);

node.append("").append(t_endtime);
// <!-- one.end -->
