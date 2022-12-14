import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

/**
 * It takes in an array of objects, and returns a table with two columns, one for the ingredient and
 * one for the measurement
 * @returns A table with the ingredients and measurements of the recipe.
 */
export default function BasicTable({ rows }) {
  return (
    <TableContainer component={Paper} size="small">
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Measurement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ? rows?.map((row) => (
                <TableRow
                  key={row.ingredient}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.ingredient}
                  </TableCell>
                  <TableCell align="right">{row.measurement}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
