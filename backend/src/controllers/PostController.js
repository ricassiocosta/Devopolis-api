const Post = require('../models/Post')
const Dev = require('../models/Dev')

module.exports = {
  async store (req, res) {
    const { filename } = req.file
    const { title, post } = req.body
    const { dev_id: devId } = req.headers

    const dev = await Dev.findById(devId)
    if (!dev) {
      return res.status(400).json({
        error: 'user does not exist'
      })
    }

    const publication = await Post.create({
      author: devId,
      thumbnail: filename,
      title,
      post
    })

    return res.json(publication)
  },
  async show (req, res) {
    const { dev_id: devId } = req.query

    const dev = Dev.findOne({ _id: devId })

    const posts = await Post.find({
      author: dev._id
    })

    return res.json(posts)
  }
}
