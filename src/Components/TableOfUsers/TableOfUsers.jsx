import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { UserContext } from "../../Context/UserContext";
import { useHistory } from "react-router-dom";

export default function TableOfUsers() {
  const history = useHistory();
  const [rowss, setRowss] = useState([]);
  const [page, setPage] = useState(1);
  const [sortby, setSortBy] = useState(".dob.age");
  const { user, setUser } = useContext(UserContext);

  //sorting managing
  const compareStrings = (a, b) => {
    a = a.toString().toLowerCase();
    b = b.toString().toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  };

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?page=${page}&results=10&seed=abc`)
      .then((res) => {
        switch (sortby) {
          case ".email":
            res.data.results.sort((a, b) => compareStrings(a.email, b.email));
            break;
          case ".dob.age":
            res.data.results.sort((a, b) => compareStrings(a.dob.age, b.dob.age));
            break;
          case ".name.first":
            res.data.results.sort((a, b) => compareStrings(a.name.first, b.name.first));
            break;
          case ".gender":
            res.data.results.sort((a, b) => compareStrings(a.gender, b.gender));
            break;
          default:
            res.data.results.sort((a, b) => compareStrings(a.email, b.email));
        }
        setRowss(res.data.results);
      });
  }, [page, sortby]);
  const sortByAge = () => {
    setSortBy(".dob.age");
  };
  const sortByName = () => {
    setSortBy(".name.first");
  };
  const sortByMail = () => {
    setSortBy(".email");
  };
  const sortByGender = () => {
    setSortBy(".gender");
  };
//page managing and navigation to userDetails
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  const handleClick = (row) => {
    setUser(row);
    history.push(`${row.login.username}`);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell onClick={sortByName}>Full Name</TableCell>
              <TableCell align="right" onClick={sortByMail}>email</TableCell>
              <TableCell align="right" onClick={sortByGender}>gender</TableCell>
              <TableCell align="right" onClick={sortByAge}>age</TableCell>
              <TableCell align="left" >picture</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowss.map((row) => (
              <TableRow
                onClick={() => handleClick(row)}
                key={row.cell}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name.first[0]}.{row.name.last}
                </TableCell>

                <TableCell align="right">
                  <a href={"mailto:" + row.email}>{row.email}</a>
                </TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.dob.age}</TableCell>
                <TableCell align="right">
                  <Avatar alt="Remy Sharp" src={row.picture.medium} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={nextPage}>next</Button>
        <Button disabled={page <= 1} onClick={prevPage}>
          prev
        </Button>
      </ButtonGroup>
    </div>
  );
}
