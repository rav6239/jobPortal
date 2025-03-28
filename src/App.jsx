import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './Layouts.jsx/MainLayout';
import JobPage from './pages/JobPage';
import NotFound from './pages/NotFound';
import JobsPage,{jobLoader} from './pages/JobsPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


const App = () => {

const addJob = async(newJob) => {
  await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJob)
  });
  return;
}

const deleteJob = async(id) => {
  await fetch(`/api/jobs/${id}`, {
    method: 'DELETE'
  });
  return;
};

const updateJob = async(job) => {
  await fetch(`/api/jobs/${job.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(job)
  });
  return;
}

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>    
      <Route path='/jobs' element={<JobPage/>}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob}/>}/>
      <Route path='/jobs/:id' element={<JobsPage deleteJob = {deleteJob}/>} loader={jobLoader}/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path='*' element={<NotFound/>}/>
    </Route>
    )
  );

  return <RouterProvider router={router}/>
};


export default App 