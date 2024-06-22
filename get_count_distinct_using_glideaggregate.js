/*
* Sample usage of COUNT DISTINCT using GlideAggregate
* For each state in the incident table, print the count of unique categories
* e.g
* New - 6
* In Progress - 6
* On Hold - 3
* Resolved - 2
* Closed - 6
* Cancelled - 2
*/

var ga = new GlideAggregate('incident');
ga.groupBy('state');
ga.addAggregate('COUNT(DISTINCT', 'category');
ga.query();
while(ga.next()){
    gs.info(ga.state.getDisplayValue() + ' - ' + ga.getAggregate('COUNT(DISTINCT', 'category'));
}
