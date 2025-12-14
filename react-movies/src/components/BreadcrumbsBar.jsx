import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function BreadcrumbsBar({ items = [] }) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ my: 2 }}>
      {items.slice(0, -1).map((it) => (
        <Link underline="hover" color="inherit" href={it.href} key={it.href}>
          {it.label}
        </Link>
      ))}
      <Typography color="text.primary">{items.at(-1)?.label}</Typography>
    </Breadcrumbs>
  );
}