import { IconButton, Badge, ButtonGroup } from "@mui/material";
import { useSidebar } from "@/hooks/useSidebar";
import Icon from "../Icon";

const Header = ({ openRightBar }: any) => {
  const { setWidth } = useSidebar();

  return (
    <div className="header" style={{ backgroundColor: "white" }}>
      <div className="header__left">
        <IconButton>
          <Icon name="menu" type="rounded" />
        </IconButton>
      </div>
      <div className="header__right">
        <input type="text" className="search__input" />
        <div className="button-group">
          <IconButton>
            <Icon name="visibility" />
          </IconButton>
          <IconButton onClick={() => openRightBar()}>
            <Icon name="settings" />
          </IconButton>
          <IconButton>
            <Icon name="info" />
          </IconButton>
          <IconButton>
            <Badge badgeContent={100} color="secondary">
              <Icon name="mail" />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
