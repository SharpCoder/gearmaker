module.exports = function configure(app) {
    
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
    
}