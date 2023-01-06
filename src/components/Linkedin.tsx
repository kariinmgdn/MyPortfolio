import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function linkedin() {

  return (
    <Card
      sx={{ maxWidth: 345, minWidth: 345 }}
      onClick={() => window.open("https://www.linkedin.com/in/karina-margarita-dzene/")}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={"https://images.pexels.com/photos/7135037/pexels-photo-7135037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            LinkedIn
          </Typography>
          <Typography variant="body2" color="text.secondary">
            My LinkedIn profile
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
