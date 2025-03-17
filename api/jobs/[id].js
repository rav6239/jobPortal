import jobsData from '../../../src/jobs.json';

export default function handler(req, res) {
  try {
    const { method } = req;
    const { id } = req.query;

    const job = jobsData.jobs.find(job => job.id === id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    switch (method) {
      case 'GET': {
        return res.status(200).json(job);
      }
      case 'PUT': {
        const updatedJob = req.body;
        const index = jobsData.jobs.findIndex(j => j.id === id);
        if (index !== -1) {
          jobsData.jobs[index] = updatedJob;
          return res.status(200).json(updatedJob);
        }
        return res.status(404).json({ message: 'Job not found' });
      }
      case 'DELETE': {
        const jobIndex = jobsData.jobs.findIndex(j => j.id === id);
        if (jobIndex !== -1) {
          jobsData.jobs.splice(jobIndex, 1);
          return res.status(200).json({ message: 'Job deleted' });
        }
        return res.status(404).json({ message: 'Job not found' });
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
} 