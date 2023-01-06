import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard(name: string, description: string) {

  return (
    <Card
      sx={{ maxWidth: 345, minWidth: 345 }}
      onClick={() => window.open("http://localhost:3000/" + name, "_self")}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={`https://raw.githubusercontent.com/kariinmgdn/${name}/main/src/portfolio/image-small.png`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}