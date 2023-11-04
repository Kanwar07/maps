import React from "react";
import { Card, Typography } from "@mui/material";
import densitycardsstyle from "./DensityCard.module.css";

function DensityCard({ den, statename }) {
  return (
    <>
      <Card>
        <Typography className={densitycardsstyle.text1} sx={{ fontSize: 14 }}>
          US Population density
          <br />
          <span className={densitycardsstyle.textstate}>{statename}</span>
          <br />
          <span className={densitycardsstyle.textdensity}>{den}</span>
          <span className={densitycardsstyle.text2}>
            {" "}
            people per square mile
          </span>
        </Typography>
      </Card>
    </>
  );
}

export default DensityCard;
