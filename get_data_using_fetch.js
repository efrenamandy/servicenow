/**
* Get server-side data from client script using native fetch API instead of GlideAjax
* Credits: https://glideguide.blog/2023/02/02/friends-dont-let-friends-use-glideajax.html
*/

var table = 'incident';
var params = [
  'sysparm_query=active=true^ORDERBYsys_created_on',
  'sysparm_fields=number,short_description,description',
  'sysparm_limit=10',
  // 'sysparm_display_value=all', // true for display values, all for both
];

var endpoint = '/api/now/table/' + table + '?' + params.join('&');

fetch(endpoint, { headers: { 'X-UserToken': g_ck } }) // user auth token
  .then(function (response) {
    if (!response.ok)
      throw 'HTTP status ' + response.status + ' on ' + endpoint;
      
    return response.json();
  })
  .then(function (response) {
    //do stuff here
    console.log(response);
  });
