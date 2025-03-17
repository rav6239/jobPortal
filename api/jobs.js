import jobsData from '../../src/jobs.json';

export default function handler(req, res) {
  try {
    const { method } = req;

    switch (method) {
      case 'GET': {
        const { _limit } = req.query;
        const jobs = jobsData.jobs || [];
        
        if (_limit) {
          const limit = parseInt(_limit);
          return res.status(200).json(jobs.slice(0, limit));
        }
        
        return res.status(200).json(jobs);
      }
      case 'POST':
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