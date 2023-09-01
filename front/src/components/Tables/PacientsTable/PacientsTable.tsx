import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  IconButton,
} from "@mui/material";
import Icon from "@/components/Icon";

const PacientsTable = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome do paciente</TableCell>
            <TableCell>Data da consulta</TableCell>
            <TableCell>Gênero</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Opções</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <img src="" />
                Ana Julia
              </div>
            </TableCell>
            <TableCell>20/09/2022</TableCell>
            <TableCell>Feminino</TableCell>
            <TableCell>26</TableCell>
            <TableCell>
              <div className="pacient__status">Confirmado</div>
            </TableCell>
            <TableCell>
              <IconButton>
                <Icon color="#0D69C6" name="edit" />
              </IconButton>
              <IconButton>
                <Icon color="#FF0000" name="delete" />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <img src="" />
                Ana Julia
              </div>
            </TableCell>
            <TableCell>20/09/2022</TableCell>
            <TableCell>Feminino</TableCell>
            <TableCell>26</TableCell>
            <TableCell>
              <div className="pacient__status">Confirmado</div>
            </TableCell>
            <TableCell>
              <IconButton>
                <Icon color="#0D69C6" name="edit" />
              </IconButton>
              <IconButton>
                <Icon color="#FF0000" name="delete" />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div>
                <img src="" />
                Ana Julia
              </div>
            </TableCell>
            <TableCell>20/09/2022</TableCell>
            <TableCell>Feminino</TableCell>
            <TableCell>26</TableCell>
            <TableCell>
              <div className="pacient__status">Confirmado</div>
            </TableCell>
            <TableCell>
              <IconButton>
                <Icon color="#0D69C6" name="edit" />
              </IconButton>
              <IconButton>
                <Icon color="#FF0000" name="delete" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PacientsTable;
