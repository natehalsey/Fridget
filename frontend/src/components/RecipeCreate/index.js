import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
//import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IngredientsForm from "./ingredients";
import Instructions from "./instructions";
import Review from "./review";
import axios from "axios";
import { API_URL, createRecipeURL, loginURL } from "../../constants";
import Grid from "@mui/material/Grid";

const steps = ["Enter Details", "Enter Instructions", "Review"];

/**
 * This function is a React component that renders a form for creating a recipe
 * @returns A React component
 */
export default function RecipeCreate() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recipe, setRecipe] = React.useState({
    name: "",
    category: "",
    area: "",
    instructions: "",
    ingredients_measurements: [
      {
        ingredient: "",
        measurement: "",
      },
    ],
    image_url: "",
    source: "",
  });

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <IngredientsForm recipe={recipe} change={setRecipe} />;
      case 1:
        return <Instructions recipe={recipe} change={setRecipe} />;
      case 2:
        return <Review recipe={recipe} change={setRecipe} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = async () => {
    if (recipe.name === "" || recipe.category == "" || recipe.area === "") {
      alert("Please fill in all fields");
    } else {
      setActiveStep(activeStep + 1);
    }

    if (activeStep === steps.length - 1) {
      axios({
        method: "post",
        url: API_URL + createRecipeURL,
        headers: { "Content-Type": "application/json" },
        data: {
          name: recipe.name,
          ingredients_measurements: recipe.ingredients_measurements,
          area: { name: recipe.area },
          category: { name: recipe.category },
          image_url: recipe.image_url,
          instructions: recipe.instructions,
        },
      }).catch((err) => {
        console.log(err);
        localStorage.setItem("auth", false);
      });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" xs={12} sm={4} md={3} lg={3}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Create Your Recipe
        </Typography>
        <Stepper activeStep={activeStep} xs={2} sm={2} md={12} lg={12}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Your Recipe Has Been Saved. <br />
              Thank You.
            </Typography>
          </>
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}
