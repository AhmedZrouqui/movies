import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { ROUTES } from './routes';
import Results from '../pages/Results';
import Preview from '../pages/Preview';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.RESULTS,
    element: <Results />,
  },
  {
    path: ROUTES.PREVIEW,
    element: <Preview />,
  },
]);

export default router;
