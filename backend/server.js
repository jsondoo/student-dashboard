const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
const readCSV = require('./readCSV')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

// Make API call to Canvas API here
canvasAPI.getSelf()
  .then(self => console.log(self))

// Make endpoint for getSelf here
app.get('/getself', async (req,res) => {
  const self = await canvasAPI.getSelf()
  res.json(self)
})

// Make endpoint for getDiscussions here
app.get('/getDiscussions/:id', async (req,res) => {
  const courseID = req.params.id
  const res2 = await getDiscussions(courseID)
  res.send(flattenTopicAndReplies(res2))
})

// step 5
app.get('/getCourses', async (req,res) => {
  // https://github.com/ubccapico/node-canvas-api/blob/master/src/getCoursesByUser.js
  const self = await canvasAPI.getSelf()
  const courses = await canvasAPI.getCoursesByUser(self.id) // hardcoded user id
  res.send(courses) // array of courses (some are restricted access by date)
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
