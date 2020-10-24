const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.static('uploads'));

//start app 
const port = process.env.PORT || 3000;

app.listen(port, () => 
  console.log(`Listening on port ${port}.`)
);

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: 500,
                message: 'Must upload a photo'
            });
        } else {
            //retrieve the uploaded img
            let img = req.files.img;
            
            //Use the mv() method to place the file in upload directory (i.e. "images")
            img.mv('./images/' + img.name);

            //send response
            res.send({
                status: 200,
                message: 'Image has been saved successfully.',
                data: {
                    name: img.name,
                    mimetype: img.mimetype,
                    size: img.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});