// <!-- one.download http://slicnet.com/mxrogm/mxrogm/apps/stream/r/2014/10/13/sr3/n/r/2014/10/13/sr/n/Unnamed15/node_se4 -->
node.append(t_measurement);

var now = new Date();

node.append(now).append(t_starttime);

node.append(0).append(t_minutespassed);

node.append("").append(t_activity);

node.append("").append(t_endtime);

node.append(false).append(t_finalized);

var label = now.getYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes();

node.append(label).append(t_label);

node.append("https://dpg7tdol7ltjn.cloudfront.net/356d/img/20141013/Clock.png").append(t_icon);
// <!-- one.end -->
