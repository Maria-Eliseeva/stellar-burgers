import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { selectIngredientById } from '../../services/ingredients/slice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const ingredientData = id ? useSelector(selectIngredientById)(id) : null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
