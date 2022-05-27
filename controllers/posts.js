const Post = require('../models/post');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3();

module.exports = {
    create,
    index,
    getEvent,
    search, 
    updateEvent,
    deleteEvent,
}

function create(req, res){
    // console.log(req.file, req.body, 'this is create method', req.user)
    try {
        const filePath = `${uuidv4()}/${req.file.originalname}`
        const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer};
        s3.upload(params, async function(err, data){
			console.log(err, ' from aws')
            const post = await Post.create({
                eventName: req.body.eventName, 
                admission: req.body.admission,
                time: req.body.time,
                date: req.body.date,
                requirements: req.body.requirements,
                description: req.body.description,
                address: req.body.address,
                user: req.user, 
                photoUrl: data.Location
            });
            // console.log(post)
			// make sure the post we're sending back has the user populated
			await post.populate('user');
		
            res.status(201).json({post: post})
        })


    } catch(err){
        console.log(err)
        res.json({data: err})
    }
}

async function deleteEvent(req, res) {
    try {
        const findEvent = await Post.deleteOne({_id: req.params._id}, {
            justOne: true,
        })
        res.status(200).send('deleted event')
    } catch (error) {
        console.log('delete event error', error)
        return res.status(500).send(error)
    }
}

async function getEvent(req, res) {
    try {
        const post = await Post.findById(req.params._id);
        res.status(200).json({post})
    } catch (error) {
        console.log('error grabbing specific event', error)
    }
}

async function search(req, res) {
    try {
        const searchEvents = await Post.find({"eventName": {$regex: req.params.keyword}});
        if (searchEvents) console.log('searches,', searchEvents);
        res.status(200).json(searchEvents);
    } catch(error) {
        console.log('error searching keyword', error)
    }
}

 function updateEvent(req, res) {
    console.log('updating event')
    console.log(req.body)
    Post.findOneAndUpdate({_id: req.params._id}, {
        $set: {
            'eventName': req.body.eventName,
            'address': req.body.address,
            'time': req.body.time,
            'date': req.body.date,
            'requirements': req.body.requirements,
            'description': req.body.description,
            'admission': req.body.admission,
            'user': req.body.user,
            // 'photo': req.body.photo,
        }
    }, (err, result) => {
        console.log('result', result)
        if (err) return console.log(err)
        result.save()
        console.log('successfully saved')
    });
    // return res.status(200).send('success')
}

async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}