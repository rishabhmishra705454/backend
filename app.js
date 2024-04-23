const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bodyParser = require('body-parser');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { JWT_SECRET } = require('./config');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors()); 
// Middleware to parse JSON request bodies
app.use(express.json());

// Passport JWT Strategy
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), taskRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://Rm765182:Rm765182@cluster0.xqtqlpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  
 
}).then(() => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.error('Error connecting to MongoDB:', err));
