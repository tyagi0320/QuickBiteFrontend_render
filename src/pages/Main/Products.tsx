import { useEffect, useState } from "react"
import { FoodService } from "../../services/FoodService";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FoodItems from './FoodItems';
import type {Food} from "../../interface/Food"

const Products = () => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const data: Food[] = await FoodService.foods();
    console.log(data)
    setFoodData(data)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2> All Food Items</h2>
      <Grid container>
        {foodData.map((food) =>
          <Grid size={4} key={food.id}>
            <FoodItems foodData={food} />
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default Products