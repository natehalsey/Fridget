import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { API_URL, getRecipeByIdURL } from "../../constants";
import Table from '../IngredientsTable';
import Divider from '@mui/material/Divider';

export default function RecipeView() {
    const path = window.location.pathname.split('/');
    const [recipeData, setRecipeData] = React.useState();

    React.useEffect(() => {
        var id = path[path.length - 1];
        console.log(getRecipe(id))
    },[]);

    const getRecipe = ( (id) => {
        axios.get(
            API_URL + getRecipeByIdURL, { params: { id: id }}
        ).then( (response) => {
            setRecipeData(response.data)
        })
        .catch( (error) => {
            console.log(error);
        });
    });

    return (

        <Card raised>
            <CardMedia
                component="img"
                alt="green iguana"
                height="200"
                image={recipeData?.image_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {recipeData?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {recipeData?.category?.name} | Cuisine: {recipeData?.area?.name}
                </Typography>
                <Table rows={recipeData?.ingredients_measurements} />
                
                <Divider />
                
                <Paper>
                    <Typography variant="body1" color="text.primary">
                        {recipeData?.instructions}
                    </Typography>
                </Paper>
            </CardContent>
        </Card>
    );
}