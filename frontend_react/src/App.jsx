import Index from './pages/Index'
import { BrowserRouter  , Route , Routes} from 'react-router-dom'
import ProductComponent from './components/ProductComponent'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* http://localhost:3000 */}
        <Route path='/' element={<Index/>}></Route>

        {/* http://localhost:3000/add-product */}
        <Route path='/add-product' element={<ProductComponent/>}></Route>

        {/* http://localhost:3000/edit-product/1 */}
        <Route path='/edit-product/:id' element={<ProductComponent/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
