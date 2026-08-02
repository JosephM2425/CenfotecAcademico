import { useEffect, useRef, useState } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { AppToastContainer } from '../components/AppToastContainer'
import { Sidebar } from '../components/Sidebar'
import { TopNavbar } from '../components/TopNavbar'

interface RouteHandle {
  title?: string | ((params: Record<string, string | undefined>) => string)
}

function useCurrentTitle(): string {
  const matches = useMatches()
  const match = [...matches].reverse().find((m) => (m.handle as RouteHandle | undefined)?.title)
  const title = (match?.handle as RouteHandle | undefined)?.title
  if (!title) return 'CenfoAcadémico'
  return typeof title === 'function' ? title(match!.params) : title
}

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)
  const title = useCurrentTitle()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!sidebarOpen) return
      const target = event.target as HTMLElement
      if (target.closest('.sidebar-toggle')) return
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [sidebarOpen])

  return (
    <>
      <Sidebar ref={sidebarRef} open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="main-content">
        <TopNavbar title={title} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <AppToastContainer />
    </>
  )
}
