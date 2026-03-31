import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout     from './components/Layout.jsx'
import Report     from './pages/Report.jsx'
import Sectors    from './pages/Sectors.jsx'
import SectorPage from './pages/SectorPage.jsx'
import Projects   from './pages/Projects.jsx'
import Revenue    from './pages/Revenue.jsx'
import OilMoney   from './pages/OilMoney.jsx'
import Corruption from './pages/Corruption.jsx'
import Research   from './pages/Research.jsx'
import Cabinet    from './pages/Cabinet.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index                        element={<Report />}     />
          <Route path="sectors"               element={<Sectors />}    />
          <Route path="sectors/:sectorId"     element={<SectorPage />} />
          <Route path="projects"              element={<Projects />}   />
          <Route path="revenue"               element={<Revenue />}    />
          <Route path="oil-money"             element={<OilMoney />}   />
          <Route path="corruption"            element={<Corruption />} />
          <Route path="research"              element={<Research />}   />
          <Route path="cabinet"               element={<Cabinet />}    />
        </Route>
      </Routes>
    </HashRouter>
  )
}
