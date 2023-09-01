interface IconPropsType {
  name: string;
  type?: string;
  color?: string;
}

const Icon = ({ name, type, color }: IconPropsType) => {
  return (
    <span
      className={
        type ? "material-symbols-" + type + " " + "icon" : "material-symbols-outlined icon"
      }
      style={{ color: (color ? color : "") }}
    >
      {name}
    </span>
  );
};

export default Icon;
