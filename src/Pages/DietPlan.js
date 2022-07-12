import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MealList from "./MealList";

const DietPlan = () => {
  const [mealData, setMealData] = useState({
    meals: [
      {
        id: 800043,
        imageType: "jpg",
        title: "Fried Green Tomato BLT Sandwich",
        readyInMinutes: 35,
        servings: 4,
      },
      {
        id: 414104,
        imageType: "jpg",
        title: "Steaks with Chipotle Sauce",
        readyInMinutes: 25,
        servings: 4,
        sourceUrl:
          "https://foxeslovelemons.com/wp-content/uploads/2022/03/Wonton-Nachos-4-728x486.jpg/",
      },
      {
        id: 875711,
        imageType: "jpg",
        title: "Banh Mi Nachos",
        readyInMinutes: 75,
        servings: 8,
        sourceUrl:
          "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps24375_WNC62337D65-3.jpg/",
      },
    ],
    nutrients: {
      calories: 2000.91,
      protein: 89.21,
      fat: 122.39,
      carbohydrates: 131.54,
    },
  });

  const [calories, setCalories] = useState(2000);

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=5a4878f434a64d9c8c6c00dd2c89df80&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  // useEffect(() => {
  //   startHandler();
  // }, []);

  // const startHandler = async () => {};

  return (
    <>
      <nav className="NutritionScreen-btn">
        <Link to="/" className="go-back-btn">
          <i className="fa-solid fa-chevron-left"></i>
        </Link>
      </nav>
      <h1 className="recipe-heading">Diet Plan</h1>
      <form
        className="nutrition-detail-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="nutrition-detail-form-div">
          <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange}
          />
          <i className="fa-solid fa-magnifying-glass" onClick={getMealData}></i>
        </div>
      </form>
      {mealData && <MealList mealData={mealData} />}
    </>
  );
};

export default DietPlan;
