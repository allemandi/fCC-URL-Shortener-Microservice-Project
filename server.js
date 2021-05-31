require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');



// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//MongoDB setup
//currently, the MONGO_URI is a private environment variable linked to current db collection of this repl's owner (me).
// the Mongo URI can be easily replaced by string text following this convention: 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<db-name>?retryWrites=true&w=majority'
const MONGO_URI = process.env['MONGO_URI']

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose schema and model setup
const SCHEMA = mongoose.Schema;

// original url type is string, and should be unique to avoid duplicating documents with same url 
const URL_SCHEMA = new SCHEMA({
  original_url: {
    type: String,
    unique: true
  },
  short_url: Number
  })

//the db collection name is "Url"
const Url = mongoose.model("Url", URL_SCHEMA);

// parse the data coming from POST requests
// middleware to handle urlencoded data is returned by bodyParser.urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var numberlol2;
// var numberlol = Url.countDocuments({}, (err,count) => {
//   if(err) return console.log(err);
//   done(null, count)
//   return numberlol2 = count
// })

// console.log(numberlol2)

// Your first API endpoint
app.post('/api/shorturl', (req, res) => {

  //req.body.url returns the url contained in body json object
  let input = req.body['url'];


  //Regex that starts with either [https] or ], following [://] for valid format
  const validRex = /^(http|https)(:\/\/)/;

  // if failed, return "invalid url" 
  if (!validRex.test(input)) {
    return res.json({
      error: 'invalid url'
      })
    }

  //assuming having passed validRex
  //find if the original url exists in the db collection of Url
  Url.findOne({original_url: input}, (err, data) => {
    //if error, return error
    if (err) return console.log(err);

    //if the data found is null (meaning that it does not exist within record)
    if(data == null)
    {
      //count how many documents exist within the Url db collection

      Url.countDocuments({}, (err, countDoc) => {
        //if error, return error
        if(err) return console.log(err);

        const amount_documents = countDoc;

        //new record variable, new document for Url collection

        var newRecord = new Url({
          original_url: input,
          short_url: amount_documents + 1
        })

     

        // save the newRecord in Url
        newRecord.save((err, data) => {
          if (err) return console.error(err);

          //done callback due to asynch
          // done(null, data)
          })

          return res.json({
            original_url: input,
            short_url: amount_documents + 1
        })
      })

    }

    // , the data contains the document with existing short_url
    else if (data != null){
    return res.json({
        original_url: data['original_url'],
        short_url: data['short_url']
        })
    }
  })


});

// redirect to original url once short_url has been keyed according to the below format
app.get("/api/shorturl/:shorturlhere", (req, res) => {
  Url.findOne({short_url: req.params.shorturlhere}, (err, data) => {
    if(err) console.log(err);
    res.redirect(data['original_url'])
  })
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
