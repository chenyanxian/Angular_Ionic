/**
 * Created by mac on 15/12/9.
 */

module.exports = function(app) {
    //设置路由
    app.use('/api/users',require('./api/users'));
    app.use('/api/article',require('./api/article'));
}
