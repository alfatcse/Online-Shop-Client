import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Routers/Routers';
import toast, { Toaster } from 'react-hot-toast';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
function App() {
  return (
    <div className="bg-blue-300">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
      <Widget />
    </div>
  );
}

export default App;
