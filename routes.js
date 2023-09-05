const routes=require('next-routes')();

routes
  .add('/home/:type','/home')
  .add('/category/:subcategory/:type','/category')
  .add('/about/:type','/about')
  .add('/feedback/:type','/feedback')
  .add('/publisher/new/:username','/publisher/new')
  .add('/publisher/profile/:address','/publisher/profile')
  .add('/publisher/:address/update','/publisher/update')
  .add('/publisher/:address/update/photo','/publisher/photo')
  .add('/publisher/:address/:type','/publisher/show')
  .add('/publisher/:address/article/new','/publisher/article/new')
  .add('/publisher/:address/article/:type','/publisher/article/index')
  .add('/publisher/:address/article/:contenthash/:photohash/confirm','/publisher/article/confirm')
  .add('/publisher/:address/article/:id/:type','publisher/article/view')
  .add('/publisher/:address/article/:id/:type/eventlog', '/publisher/article/eventlog');

module.exports=routes;
