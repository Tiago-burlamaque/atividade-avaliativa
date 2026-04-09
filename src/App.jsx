import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/cadastro'
import Login from './login'


function App() {
    return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
    )
}

export default App