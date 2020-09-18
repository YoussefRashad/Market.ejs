

const express = require('express')
const app = express()
const path = require('path')
const Session = require('express-session')
const SessionStore = require('connect-mongodb-session')(Session)
const flash = require('connect-flash')


const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/market',
    collection:'sessions'
})

// Dynamic Files
app.set('view engine', 'ejs')
app.set('views', 'views')
// Static Files
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'images')))
app.use(flash())


app.use(Session({
    secret : 'abcd', // Key
    saveUninitialized : false,
    store : STORE
}))


const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const authRouter = require('./routes/auth.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')


app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)
app.use('/admin', adminRouter)



app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/notAdmin',(req,res,next)=>{
    res.render('notAdmin', {
        isUser: req.session.id,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Unautherization'
    })
})
app.use((req,res,next)=>{
    res.status(403)
    res.render('pageNotFound',{
        isUser: req.session.id,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Page Not Found'
    })
})

const PORT = process.env.PORT || 3500;

app.listen(PORT,()=>console.log('listening on port 3500'))

/*

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on("connection",(socket)=>{
    
    console.log('The ID of client is '+ socket.id);

    socket.on('sendMsg',()=>{
        console.log('send Msg Server');
        io.to('MyRoom').emit('newMsg');
    });

    socket.on('join', () => {
        console.log('Joining');
        socket.join('MyRoom');
    });

})

app.get('/',(req,res,next)=>{
    res.sendfile(path.join(__dirname, 'index.html'));
})

server.listen(3500,()=>console.log("server is connected on port 3500"));*/