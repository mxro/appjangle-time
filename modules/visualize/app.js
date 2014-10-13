// <!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/stream/r/2014/10/13/sr3/n/r/2014/10/13/sr2/n/node_ge7 -->var state = {};

state.data = [
    {
    "x": "1:Sunday",
     "y": 0
    },
    {
    "x": "2:Monday",
     "y": 0
    },
    {
    "x": "3:Tuesday",
     "y": 0
    },
    {
    "x": "4:Wednesday",
     "y": 0
    },
    {
    "x": "5:Thursday",
     "y": 0
    },
    {
    "x": "6:Friday",
     "y": 0
    },
    {
    "x": "7:Saturday",
     "y": 0
    }
];

var c = {};
c.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var priv = {};

priv.createChartData = function() {
    return {
    "xScale": "ordinal",
     "yScale": "linear",
     "type": "bar",
     "main": [
         {
         "className": ".time",
          "data": state.data
         }
     ]
    };
};

Appjangle.require(lib_streamworker, function(ex, StreamWorker) {
    
    var sw = StreamWorker.create();
    
    sw.setNode(node);
    sw.setUser(container.getUser());
    // TODO enhance maximum!
    sw.setMaxItems(20);
    
    sw.setFilter(function(node, cb) {
        node.selectAll().get(function(nodelist) {
            if (!nodelist.contains(t_measurement)) {
                cb(false);
                return;
            }
            
            node.has(t_starttime).and(node.has(t_minutespassed)).get(function(hasTypes) {
                if (hasTypes.valueOf() === false) {
                    cb(false);
                    return;
                }
                
                cb(true);
                
            });
        });
        
    });
    
    
    var chart = new xChart('bar', priv.createChartData(), '.chart');
    
    
    sw.setOperation(function(node, cb) {
        
        var startTimeQry = node.select(t_starttime);
        var minutesQry = node.select(t_minutespassed);
        
        session.getAll(startTimeQry, minutesQry, function(startTime, minutes) {
            
            var day = startTime.value().getDay();
            
            var previousValue = state.data[day].y;
            
            state.data[day].y = previousValue + minutes.value();
            
            chart.setData(priv.createChartData());
            
            cb(null, "");
            
        });
        
    });
    
    
    sw.execute(function() {});
    
});


// <!-- one.end -->
