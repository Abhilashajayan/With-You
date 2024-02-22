import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";

interface Row {
  key: string;
  name: string;
  role: string;
  status: string;
}

interface Column {
  key: string;
  label: string;
}

const rows: Row[] = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns: Column[] = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];
function getStatusBadgeVariant(status: any): any {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "paused":
        return "secondary";
      case "vacation":
        return "destructive";
      default:
        return "default";
    }
  }
export default function Tables() {
  return (
    <Table  aria-label="Example table with dynamic content">
      <TableHeader  columns={columns}>
        {(column: Column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody  items={rows}>
        {(item: Row) => (
          <TableRow key={item.key}>
            {(columnKey: any) => (
              <TableCell>
                {columnKey === "status" ? (
                  <Badge variant={getStatusBadgeVariant(item.status)}>
                    {item[columnKey as keyof Row]}
                  </Badge>
                ) : (
                  item[columnKey as keyof Row]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}



