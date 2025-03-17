import jobs from '../src/jobs.json';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const { _limit } = req.query;
      if (_limit) {
        const limitedJobs = jobs.slice(0, parseInt(_limit));
        res.status(200).json(limitedJobs);
      } else {
        res.status(200).json(jobs);
      }
      break;
    case 'POST':
      const newJob = req.body;
      jobs.push({ ...newJob, id: jobs.length + 1 });
      res.status(201).json(newJob);
      break;
    case 'PUT':
      const updatedJob = req.body;
      const index = jobs.findIndex(job => job.id === updatedJob.id);
      if (index !== -1) {
        jobs[index] = updatedJob;
        res.status(200).json(updatedJob);
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    case 'DELETE':
      const { id } = req.query;
      const jobIndex = jobs.findIndex(job => job.id === parseInt(id));
      if (jobIndex !== -1) {
        jobs.splice(jobIndex, 1);
        res.status(200).json({ message: 'Job deleted' });
      } else {
        res.status(404).json({ message: 'Job not found' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 