// src/App.jsx
import Header from './components/Header'
import EvaluatorPage from './pages/EvaluatorPage'
import './App.css' // استيراد الـ CSS المحدث هنا لتطبيقه على كل المكونات
import Body from './components/Body'
function App() {
  return (
    <>
      <Header />
      <Body/>
      <EvaluatorPage />
    </>
  )
}

export default App;