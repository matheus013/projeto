interface SGroup {
  name?: string; 
  children?: any;
}

const SGroup = ({ name, children } : SGroup) => {
  return (
    <nav className="sidebar__group">
      <span className="group__name">{ name }</span>
      { children }
    </nav>
  );
};

export default SGroup;