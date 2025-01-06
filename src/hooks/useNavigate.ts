import { useStore } from '../store';

export function useNavigate() {
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  
  return (page: string) => {
    setCurrentPage(page);
  };
}