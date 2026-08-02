import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { Bar, Pie } from 'react-chartjs-2'
import { useRole } from '../../hooks/useRole'
import { useDashboardStats } from './useDashboardStats'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const PALETTE = [
  '#164a98',
  '#38a169',
  '#d69e2e',
  '#e53e3e',
  '#805ad5',
  '#dd6b20',
  '#319795',
  '#9cc8ff',
  '#718096',
  '#b83280',
]

const verticalBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
}

const horizontalBarOptions = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' as const } },
}

export function DashboardStats() {
  const { role } = useRole()
  const canView = role !== 'Estudiante'
  const { data, isLoading, isError } = useDashboardStats(canView)

  if (!canView) {
    return <div className="alert alert-info alert-custom">Este panel de indicadores no está disponible para tu rol.</div>
  }

  if (isLoading) {
    return (
      <div className="d-flex align-items-center gap-2 text-muted">
        <Spinner animation="border" size="sm" />
        Cargando indicadores...
      </div>
    )
  }

  if (isError || !data) {
    return <div className="alert alert-danger alert-custom">No se pudieron cargar los indicadores.</div>
  }

  const byYearChart = {
    labels: data.byYear.map((d) => String(d.year)),
    datasets: [{ label: 'Producciones', data: data.byYear.map((d) => d.total), backgroundColor: PALETTE[0] }],
  }

  const byMajorChart = {
    labels: data.byMajor.map((d) => d.name),
    datasets: [{ data: data.byMajor.map((d) => d.total), backgroundColor: PALETTE }],
  }

  const byAreaChart = {
    labels: data.byKnowledgeArea.map((d) => d.name),
    datasets: [{ label: 'Producciones', data: data.byKnowledgeArea.map((d) => d.total), backgroundColor: PALETTE[2] }],
  }

  const byLineaChart = {
    labels: data.byResearchLine.map((d) => d.name),
    datasets: [{ label: 'Producciones', data: data.byResearchLine.map((d) => d.total), backgroundColor: PALETTE[4] }],
  }

  const topTechChart = {
    labels: data.topTechnologies.map((d) => d.name),
    datasets: [{ label: 'Producciones', data: data.topTechnologies.map((d) => d.total), backgroundColor: PALETTE[6] }],
  }

  return (
    <div className="row g-4">
      <div className="col-lg-6">
        <Card className="card-custom h-100">
          <Card.Body>
            <h6 className="mb-3">
              <i className="bi bi-calendar3 me-2" />
              Producción académica por año
            </h6>
            <div style={{ height: 200 }}>
              <Bar data={byYearChart} options={verticalBarOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-6">
        <Card className="card-custom h-100">
          <Card.Body>
            <h6 className="mb-3">
              <i className="bi bi-building me-2" />
              Producción académica por carrera
            </h6>
            <div style={{ height: 200 }}>
              <Pie data={byMajorChart} options={pieOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-6">
        <Card className="card-custom h-100">
          <Card.Body>
            <h6 className="mb-3">
              <i className="bi bi-diagram-3 me-2" />
              Producción académica por área de conocimiento
            </h6>
            <div style={{ height: 200 }}>
              <Bar data={byAreaChart} options={horizontalBarOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col-lg-6">
        <Card className="card-custom h-100">
          <Card.Body>
            <h6 className="mb-3">
              <i className="bi bi-list-nested me-2" />
              Producción académica por línea de investigación
            </h6>
            <div style={{ height: 200 }}>
              <Bar data={byLineaChart} options={horizontalBarOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="col-12">
        <Card className="card-custom">
          <Card.Body>
            <h6 className="mb-3">
              <i className="bi bi-cpu me-2" />
              Tecnologías más utilizadas
            </h6>
            <div style={{ height: 220 }}>
              <Bar data={topTechChart} options={horizontalBarOptions} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
