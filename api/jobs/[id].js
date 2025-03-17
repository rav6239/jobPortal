import jobsData from '../../../src/jobs.json';

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  const job = jobsData.jobs.find(job => job.id === id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  switch (method) {
    case 'GET': {
      res.status(200).json(job);
      break;
    }
    case 'PUT': {
      const updatedJob = req.body;
      const index = jobsData.jobs.findIndex(j => j.id === id);
      if (index !== -1) {
        jobsData.jobs[index] = updatedJob;
        res.status(200).json(updatedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    }
    case 'DELETE': {
      const jobIndex = jobsData.jobs.findIndex(j => j.id === id);
      if (jobIndex !== -1) {
        jobsData.jobs.splice(jobIndex, 1);
        res.status(200).json({ message: 'Job deleted' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 