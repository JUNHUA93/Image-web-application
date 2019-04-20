const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const passport    = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local");
const flash        = require("connect-flash");
const User        = require("./models/user");
const Comment     = require("./models/comment");
const session = require("express-session");
const app = express();
const middleware = require("./middleware");
const indexRoutes = require("./routes/index");
const ObjectID = require('mongoose').mongo.ObjectId;
const mongoURI = 'mongodb://localhost:27017/430-Project';
const mongo = require('mongodb').MongoClient;
const nodemailer = require("nodemailer");

mongoose.connect(mongoURI, {useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Once again!",
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"))
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(cookieParser('secret'));
app.use("/", indexRoutes);
// Mongo URI

// Create mongo connection

const conn = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'};
        resolve(fileInfo);
      });
    });
  }
});


var newUser1 = new User({
  username: 'ericWill',
  firstName: 'Eric',
  lastName: 'William',
  email: 'ewilliam@gmail.com'});
var password1 = '430eric';
User.register(newUser1, password1, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser2 = new User({
  username: 'juliaRo',
  firstName: 'Julia',
  lastName: 'Robert',
  email: 'jrobert@gmail.com'});
var password2 = '430julia';
User.register(newUser2, password2, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser3 = new User({
  username: 'erinJohn',
  firstName: 'Erin',
  lastName: 'Johnson',
  email: 'ejohnson@gmail.com'});
var password3 = '430erin';
User.register(newUser3, password3, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser4 = new User({
  username: 'joePhil',
  firstName: 'Joe',
  lastName: 'Phillipson',
  email: 'jphillipson@gmail.com'});
var password4 = '430joe';
User.register(newUser4, password4, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser5 = new User({
  username: 'johnMark',
  firstName: 'John',
  lastName: 'Mark',
  email: 'jmark@gmail.com'});
var password5 = '430john';
User.register(newUser5, password5, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser6 = new User({
  username: 'philDavid',
  firstName: 'Phillip',
  lastName: 'David',
  email: 'pdavid@gmail.com'});
var password6 = '430phillip';
User.register(newUser6, password6, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser7 = new User({
  username: 'alexCar',
  firstName: 'Alex',
  lastName: 'Carlson',
  email: 'acarlson@gmail.com'});
var password7 = '430alex';
User.register(newUser7, password7, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser8 = new User({
  username: 'jenMarx',
  firstName: 'Marx',
  lastName: 'William',
  email: 'jMarx@gmail.com'});
var password8 = '430jennifer';
User.register(newUser8, password8, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser9 = new User({
  username: 'julioUtre',
  firstName: 'Julio',
  lastName: 'Utrera',
  email: 'jutrera@gmail.com'});
var password9 = '430julio';
User.register(newUser9, password9, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser10 = new User({
  username: 'erikaMed',
  firstName: 'Erika',
  lastName: 'Medina',
  email: 'emedina@gmail.com'});
var password10 = '430erika';
User.register(newUser10, password10, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser11 = new User({
  username: 'rahulPatel',
  firstName: 'Rahul',
  lastName: 'Patel',
  email: 'rpatel@gmail.com'});
var password11 = '430rahul';
User.register(newUser11, password11, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser12 = new User({
  username: 'ahmedKhan',
  firstName: 'Ahmed',
  lastName: 'Khan',
  email: 'aKhan@gmail.com'});
var password12 = '430ahemd';
User.register(newUser12, password12, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser13 = new User({
  username: 'ericWill',
  firstName: 'Eric',
  lastName: 'William',
  email: 'ewilliam@@gmail.com'});
var password13 = '430eric';
User.register(newUser13, password13, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser14 = new User({
  username: 'markKim',
  firstName: 'Mark',
  lastName: 'Kimmel',
  email: 'mkimmel@gmail.com'});
var password14 = '430mark';
User.register(newUser14, password14, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

var newUser15 = new User({
  username: 'joeSmith',
  firstName: 'Joe',
  lastName: 'Smith',
  email: 'jsmith@gmail.com'});
var password15 = '430smith';
User.register(newUser15, password15, function(err, user){
    if(err){
        console.log(err);
        return true;
    }
    passport.authenticate("local");
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/Register-new-user', (req, res) => {
  res.render('admin-register-user');
});

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/upload', (req, res) => {
  res.render('Upload');
});

app.get('/upload-many', (req, res) => {
  res.render('Upload-many');
});
// @route GET /
// @Get all Results
app.get('/Results', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('Results', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('Results', { files: files });
    }
  });
});

// @route POST /upload
// @desc  Uploads file to DB + add tag
app.post('/upload', middleware.isLoggedIn, upload.single('file'), (req, res) => {
  gfs.files.update(
    {_id: req.file.id},
    {$set : { metadata:
      { tags : req.body.tag.toLowerCase().split(','),
        author : req.user.username,
        description: req.body.description
     }
     }
    }
  );

  req.flash("success"," Image Upload Successfully");
  res.redirect('/');
});

//post many image
app.post('/upload-many', middleware.isLoggedIn, upload.any('file'), (req, res) => {

  req.files.map(file => {
    gfs.files.updateOne(
      {_id: file.id},
      {$set : { metadata:
        {
          tags: [req.body.tag],
          author : req.user.username
       }
       }
      });
  });

  req.flash("success"," Images Upload Successfully");
  res.redirect('/Results');
});
//edit tag
app.post('/files/:filename', middleware.isLoggedIn, (req, res) => {
  
  gfs.files.update(
    {filename: req.params.filename},
    { $addToSet: {
      'metadata.tags': {$each: [req.body.tag] }
    }
    }
  )
  
  req.flash("success"," New Tag added Successfully");
  res.redirect('/Results');
});
//
app.get('/Tag-Search',(req, res) => {
  res.render('Tag-search-form');
});

// search image by tag
app.post('/Tag-Result', upload.single("file"), (req, res) => {
  const enteredTags = req.body.tag.split(',');
  console.log({ enteredTags });
  gfs.files.find({ "metadata.tags": { $all: enteredTags }}).toArray((err, files) => {
    // Check if files
    console.log({err,files})
    if (!files || files.length === 0) {
      res.render('Tag-Results', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('Tag-Results', { files: files });
    }
  });

});
//Show User-info
app.get('/user-info/:userid', (req, res) => {
  conn.db.collection('users').find({_id: req.params.id}, (err, user) => {
    res.render('user-info', { user : user});
  });
});

//Show all user for admin
app.get('/user/All', (req, res) => {
  conn.db.collection('users').find().toArray((err, users) => {
    res.render('All-user-info', {users: users});
  });
});

//add new comment
app.post('/:filename/new-comments', middleware.isLoggedIn, (req, res) => {
  var newComment = new Comment({
    filename: req.params.filename,
    comment: req.body.comment,
    user: req.user.username,
    });
    Comment.create(newComment);
    req.flash('success', 'comment create successfully!');
    res.redirect('/Results');
});


//show more info
app.get('/image-info/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    conn.db.collection('comments').find({ filename: req.params.filename }).toArray((err, allcomments) => {
      res.render('image-info', {file: file , comments: allcomments});
    });
  });
});
//delete user by id
app.delete('/user/:id', middleware.isLoggedIn, (req, res) => {
  User.findByIdAndDelete({_id: req.params.id}, (err) => {
    if(err){
      console.log(err)
    }
    req.flash('success', 'User deleted successfully!');
    res.redirect('/user/All');
  })
});

//delete comment
app.delete('/comment/:id', middleware.isLoggedIn, (req, res) => {
  Comment.findByIdAndDelete({_id: req.params.id}, (err) => {
    if(err){
      console.log(err)
    }
    req.flash('success', 'comment deleted successfully!');
    res.redirect('/Results');
  })
});

// API
app.get('/API', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});


// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', middleware.isLoggedIn, (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    req.flash('success', 'Photo deleted successfully!');
    res.redirect('/Results');
  });
});
// delete all files
app.delete('/all', middleware.isLoggedIn, (req, res) => {
  gfs.files.remove({}, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    req.flash('success', 'All Photos deleted successfully!');
    res.redirect('/Results');
  });
});

//contect admin form
app.get('/admin-contect-form', (req, res) => {
  res.render('contect-admin');
})

app.post('/admin-contec/:email', (req, res, done) => {
  var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: req.params.email,
      pass: req.body.pass
    }
  });
  var mailOptions = {
    to: 'adproject430@gmail.com',
    from: req.params.email,
    subject: req.body.title,
    text: req.body.Message
  };
  smtpTransport.sendMail(mailOptions, function(err) {
    console.log('mail sent');
    req.flash('success', 'An e-mail has been sent to Admin.');
    res.redirect('/index');
    done(err, 'done');
  });
})

const port = 443;
const https = require('https');
const http = require('http');
const fs = require('fs')

app.get('/', (req, res) => {
  res.send('We are using HTTPS connection!')
})
https.createServer(
  {
   key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
 },
 app).listen(443, () => {
  console.log(`Web app Began Run on port ${port}!`)
}
)
