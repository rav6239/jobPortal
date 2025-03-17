const jobsData = require('../data');

module.exports = function handler(req, res) {
  try {
    const { method } = req;
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const job = jobsData.jobs.find(job => job.id === id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    switch (method) {
      case 'GET': {
        return res.status(200).json(job);
      }
      case 'PUT':
      case 'DELETE': {
        return res.status(405).json({ 
          message: 'This is a read-only API. Modifications are not supported in this version.' 
        });
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
} 