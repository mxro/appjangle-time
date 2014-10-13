// <!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/stream/r/2014/10/13/sr3/n/r/2014/10/13/sr/n/node_ge7 -->
var priv = {};

priv.calculateMinutesPassed = function() {
    var startTime = node.select(t_starttime).get();
    if (startTime === null) {
        return 0.0;
    }
    
    return (new Date().getTime() - startTime.value().getTime()) / (1000 * 60);
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
    
    $(".submitBtn", elem).click(function(evt) {
        evt.preventDefault();
        $("mainBtn", elem).attr('disabled', 'disabled');
        node.select(t_finalized).setValue(true);
        
        node.select(t_endtime).setValue(new Date());
        
        node.select(t_minutespassed).setValue(priv.calculateMinutesPassed());
        
        
        session.commit().get(function() {
            priv.updateForm(function(ex) {});
        });
        
    });
    
    $(".discardBtn", elem).click(function(evt) {
        evt.preventDefault();
        
        $("mainBtn", elem).attr('disabled', 'disabled');
        
        node.select(t_label).get(function(label) {
            label.setValue("Discarded: "+label.value()) ;
        });
        
        node.select(t_discarded).setValueSafe(true).get(function() {
            priv.updateForm(function(ex) {}); 
        });
        
    });
    
    priv.updateForm(cb);
    
};

priv.updateForm = function(cb) {
    node.select(t_starttime).get(function(startTime) {
        $(".startTimeIn", elem).val(startTime.value().toString()); 
    });
    
    var finalizedQry = node.select(t_finalized);
    
    var discardedQry = node.select(t_discarded);
    
    session.getAll(finalizedQry, discardedQry, function(isFinalized, isDiscarded) {
         $(".finalizedGroup", elem).hide();
            $(".finalizeGroup", elem).hide();
            $(".discardedGroup", elem).hidw();
        
        if (isDiscarded.value().valueOf() === true) {

            $(".discardedGroup", elem).show();
           
            cb();
            return;
        }
        if (isFinalized.value().valueOf() === false) {

            $(".minutesIn", elem).val(priv.calculateMinutesPassed().toString().substring(0, 5));
            cb();
            return;  
        } 
        $(".mainBtn", elem).attr('disabled', 'disabled');
        $(".finalizedGroup", elem).show();
        
        node.select(t_minutespassed).get(function(minutesPassed) {
             $(".minutesIn", elem).val(minutesPassed.value().toString().substring(0, 5));
        });
        
        node.select(t_endtime).get(function(endTime) {
            $(".endTimeIn", elem).val(endTime.value()); 
            cb();
        });
    });
    
    
};

priv.initForm(function(ex) {
    var autoUpdate = setInterval(function() {
        priv.updateForm(function(ex) {});
    }, 1000, 1000); 
    container.onClose(function(cb) {
       clearInterval(autoUpdate); 
        cb();
    });
});
// <!-- one.end -->
