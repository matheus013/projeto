import { SidebarContext } from "@/contexts/SidebarContext";
import { useSidebar } from "@/hooks/useSidebar";
import { useTheme } from "@/hooks/useTheme";

const Panel = ({ children }: any) => {
  const { currentTheme } = useTheme();
  const { page } = useSidebar();

  return (
    <div className="panel">
      {children.length > 1 ? children[page] : children}
    </div>
  );
};

export default Panel;
