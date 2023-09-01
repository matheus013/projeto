import { getFile } from "@/services/firebase/storage";
import { logOut } from "@/services/firebase/auth";
import { useSidebar } from "@/hooks/useSidebar";
import { useRouter } from "next/navigation";
import { Fragment, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, LogOut } from "./styled";
import { useState } from "react";
import SGroup from "./SGroup";
import SList from "./SList";

const Sidebar = () => {
  const { user, setUser } = useAuth();
  const { page, image, setImageBrand, width } = useSidebar();
  const router = useRouter();

  const [sidebarBrand, setSiderbarBrand] = useState<any>("");

  const signOut = () => {
    logOut()
      .then(() => {
        setUser(null);
        router.push("/auth/login");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    (async function () {
      const url = await getFile(`Stores/${user.storeUID}/logo`);
      setImageBrand(url);
    })();
  }, []);

  return (
    <Menu className="sidebar" style={{ width: width }}>
      <div className="sidebar__brand">
        {user.accountType === "admin" ? (
          <Fragment>
            {image ? (
              <img height={"86px"} src={image} />
            ) : (
              <Fragment>
                <img
                  width={width <= "70px" ? "70px" : "25%"}
                  src="/images/10.png"
                  alt=""
                />
                {width <= "70px" ? <h2>Black Bull Pay</h2> : ""}{" "}
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {image ? (
              <img height={"86px"} src={image} />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                  padding: 15,
                }}
              >
                <h2>{user.storeData.name}</h2>
              </div>
            )}
          </Fragment>
        )}
      </div>
      <SGroup>
        <SList
          icon="bar_chart_4_bars"
          name="Visão Geral"
          active={page === 0 ? true : false}
          value={0}
        />
        <SList
          icon="request_quote"
          name="Pedidos"
          active={page === 1 ? true : false}
          value={1}
        />
        <SList
          icon="shopping_cart"
          name="Carrinhos abandonados"
          active={page === 2 ? true : false}
          value={2}
        />
        <SList
          icon="laundry"
          name="Produtos"
          active={page === 3 ? true : false}
          value={3}
        />
        <SList
          icon="person"
          name="Clientes"
          active={page === 4 ? true : false}
          value={4}
        />
        <SList
          icon="campaign"
          name="Marketing"
          active={page === 5 ? true : false}
          value={5}
        />
        <SList
          icon="flag"
          name="Relatórios"
          active={page === 6 ? true : false}
          value={6}
        />
        <SList
          icon="receipt_long"
          name="Checkout"
          active={page === 7 ? true : false}
          value={7}
        />
        <SList
          icon="settings"
          name="Configurações"
          active={page === 8 ? true : false}
          value={8}
        />
      </SGroup>
      <LogOut className="log-out" onClick={signOut}>
        <span className="material-symbols-rounded">logout</span>Sair da conta
      </LogOut>
    </Menu>
  );
};

export default Sidebar;
