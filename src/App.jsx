import './App.css'
import conf from './conf/conf';
function App() {
  console.log(conf.appwriteUrl);
  console.log(conf.appwriteProjectId);
  return (
   <>
   <h1>Creating a blog site using appwrite as a backend</h1>
   </>
  )
}

export default App
