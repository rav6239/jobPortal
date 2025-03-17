import jobsData from '../../src/jobs.json';

export default function handler(req, res) {
  const { method } = req;
  let response;

  switch (method) {
    case 'GET': {
      const { _limit } = req.query;
      if (_limit) {
        response = jobsData.jobs.slice(0, parseInt(_limit));
      } else {
        response = jobsData.jobs;
      }
      res.status(200).json(response);
      break;
    }
    case 'POST': {
      const newJob = req.body;
      jobsData.jobs.push({ ...newJob, id: String(jobsData.jobs.length + 1) });
      res.status(201).json(newJob);
      break;
    }
    case 'PUT': {
      const updatedJob = req.body;
      const index = jobsData.jobs.findIndex(job => job.id === updatedJob.id);
      if (index !== -1) {
        jobsData.jobs[index] = updatedJob;
        res.status(200).json(updatedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    }
    case 'DELETE': {
      const { id } = req.query;
      const jobIndex = jobsData.jobs.findIndex(job => job.id === id);
      if (jobIndex !== -1) {
        jobsData.jobs.splice(jobIndex, 1);
        res.status(200).json({ message: 'Job deleted' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 